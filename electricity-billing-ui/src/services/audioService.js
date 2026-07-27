class AudioService {
  constructor() {
    this.currentAudio = null;
    this.listeners = [];
    this.muted = localStorage.getItem('audio_muted') === 'true';
    this.welcomePlayedKey = 'welcome_audio_played_session';
  }

  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  notify() {
    this.listeners.forEach(l => {
      try {
        l(this.muted);
      } catch (err) {
        console.error('Error in audio subscriber listener:', err);
      }
    });
  }

  isMuted() {
    return this.muted;
  }

  setMuted(muted) {
    this.muted = muted;
    localStorage.setItem('audio_muted', muted ? 'true' : 'false');
    if (muted) {
      this.stop();
    }
    this.notify();
  }

  stop() {
    if (this.currentAudio) {
      try {
        this.currentAudio.pause();
        this.currentAudio.currentTime = 0;
      } catch (e) {
        console.warn('Error stopping current audio:', e);
      }
      this.currentAudio = null;
    }
  }

  play(fileName) {
    this.stop();
    if (this.muted) return;

    const path = `/audio/${fileName}`;
    try {
      const audio = new Audio(path);
      this.currentAudio = audio;

      // Handle loading errors or missing files gracefully
      audio.onerror = (e) => {
        console.warn(`Failed to load audio file: ${path}`, e);
        if (this.currentAudio === audio) {
          this.currentAudio = null;
        }
      };

      audio.play().catch(err => {
        console.warn(`Could not play audio ${fileName}:`, err);
        if (this.currentAudio === audio) {
          this.currentAudio = null;
        }
      });
    } catch (e) {
      console.warn(`Failed to initialize audio for ${fileName}:`, e);
    }
  }

  playWelcome() {
    const sessionPlayed = sessionStorage.getItem(this.welcomePlayedKey);
    if (sessionPlayed || this.muted) {
      return null;
    }

    const audioPath = '/audio/welcome.mp3';
    let audio;
    try {
      audio = new Audio(audioPath);
    } catch (err) {
      console.warn("Failed to initialize welcome audio object:", err);
      return null;
    }

    const startAudio = () => {
      this.stop();
      this.currentAudio = audio;
      audio.onerror = (e) => {
        console.warn("Error loading welcome audio file during interaction trigger", e);
        cleanup();
      };
      audio.play()
        .then(() => {
          sessionStorage.setItem(this.welcomePlayedKey, 'true');
          cleanup();
        })
        .catch(err => {
          console.warn("Welcome audio play failed on user interaction:", err);
        });
    };

    const cleanup = () => {
      document.removeEventListener('click', startAudio);
      document.removeEventListener('keydown', startAudio);
    };

    // Try playing immediately
    this.currentAudio = audio;
    audio.onerror = (e) => {
      console.warn("Error loading welcome audio file on mount", e);
    };
    audio.play()
      .then(() => {
        sessionStorage.setItem(this.welcomePlayedKey, 'true');
      })
      .catch(() => {
        // Autoplay restricted: wait for user interaction
        document.addEventListener('click', startAudio);
        document.addEventListener('keydown', startAudio);
      });

    return cleanup;
  }
}

const audioService = new AudioService();
export default audioService;
