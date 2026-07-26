import React from "react";
import { Box } from "@mui/material";

const BackgroundEffects = () => {
  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: -1,
        bgcolor: "#030712",
        overflow: "hidden",
        pointerEvents: "none",
        "&::before": {
          content: '""',
          position: "absolute",
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(99, 102, 241, 0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(99, 102, 241, 0.04) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
          maskImage: "radial-gradient(ellipse at 50% 50%, black 60%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse at 50% 50%, black 60%, transparent 100%)",
        },
      }}
    >
      {/* Glow Orbs */}
      <Box
        sx={{
          position: "absolute",
          top: "10%",
          left: "15%",
          width: "450px",
          height: "450px",
          borderRadius: "50%",
          bgcolor: "rgba(6, 182, 212, 0.15)",
          filter: "blur(140px)",
          animation: "floatOrb1 25s infinite alternate ease-in-out",
          "@keyframes floatOrb1": {
            "0%": { transform: "translate(0, 0) scale(1)" },
            "100%": { transform: "translate(80px, 50px) scale(1.1)" },
          },
        }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: "15%",
          right: "10%",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          bgcolor: "rgba(139, 92, 246, 0.12)",
          filter: "blur(160px)",
          animation: "floatOrb2 30s infinite alternate ease-in-out",
          "@keyframes floatOrb2": {
            "0%": { transform: "translate(0, 0) scale(1)" },
            "100%": { transform: "translate(-100px, -60px) scale(0.9)" },
          },
        }}
      />
      <Box
        sx={{
          position: "absolute",
          top: "40%",
          right: "25%",
          width: "380px",
          height: "380px",
          borderRadius: "50%",
          bgcolor: "rgba(37, 99, 235, 0.1)",
          filter: "blur(130px)",
          animation: "floatOrb3 20s infinite alternate ease-in-out",
          "@keyframes floatOrb3": {
            "0%": { transform: "translate(0, 0) scale(1)" },
            "100%": { transform: "translate(50px, -80px) scale(1.15)" },
          },
        }}
      />

      {/* Electric Flow Lines */}
      <svg
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          opacity: 0.15,
        }}
      >
        <path
          d="M -100 200 Q 300 150 700 400 T 1600 300"
          fill="none"
          stroke="#06B6D4"
          strokeWidth="1.5"
          strokeDasharray="15 150"
          style={{
            animation: "flow1 12s infinite linear",
          }}
        />
        <path
          d="M -100 600 Q 400 700 800 500 T 1700 700"
          fill="none"
          stroke="#8B5CF6"
          strokeWidth="1.5"
          strokeDasharray="20 180"
          style={{
            animation: "flow2 16s infinite linear",
          }}
        />
        <path
          d="M 200 -100 Q 500 400 300 800 T 800 1200"
          fill="none"
          stroke="#3B82F6"
          strokeWidth="1"
          strokeDasharray="10 120"
          style={{
            animation: "flow1 10s infinite linear",
          }}
        />
      </svg>

      {/* Floating Particles */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          "& .particle": {
            position: "absolute",
            width: "3px",
            height: "3px",
            borderRadius: "50%",
            bgcolor: "#38BDF8",
            opacity: 0.3,
            animation: "floatParticle 8s infinite linear",
          },
          "@keyframes floatParticle": {
            "0%": { transform: "translateY(100vh) scale(0)", opacity: 0 },
            "50%": { opacity: 0.5 },
            "100%": { transform: "translateY(-10vh) scale(1)", opacity: 0 },
          },
        }}
      >
        <div className="particle" style={{ left: "10%", animationDelay: "0s", animationDuration: "12s" }} />
        <div className="particle" style={{ left: "25%", animationDelay: "3s", animationDuration: "15s" }} />
        <div className="particle" style={{ left: "45%", animationDelay: "1s", animationDuration: "9s" }} />
        <div className="particle" style={{ left: "65%", animationDelay: "5s", animationDuration: "14s" }} />
        <div className="particle" style={{ left: "85%", animationDelay: "2s", animationDuration: "11s" }} />
      </Box>

      {/* Embedded CSS Animations for svg stroke flow */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes flow1 {
            0% { stroke-dashoffset: 500; }
            100% { stroke-dashoffset: 0; }
          }
          @keyframes flow2 {
            0% { stroke-dashoffset: -600; }
            100% { stroke-dashoffset: 0; }
          }
        `
      }} />
    </Box>
  );
};

export default BackgroundEffects;
