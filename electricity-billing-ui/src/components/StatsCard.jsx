import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { motion } from 'framer-motion';


const AnimatedValue = ({ value }) => {
  const [displayValue, setDisplayValue] = useState('0');

  useEffect(() => {
    const str = String(value);
    const match = str.match(/^([^0-9.-]*)([0-9,.-]+)([^0-9.-]*)$/);
    if (!match) {
      setDisplayValue(str);
      return;
    }

    const prefix = match[1];
    const numStr = match[2].replace(/,/g, '');
    const suffix = match[3];

    const targetNumber = parseFloat(numStr);
    if (isNaN(targetNumber)) {
      setDisplayValue(str);
      return;
    }

    const isDecimal = numStr.includes('.');
    const decimalPlaces = isDecimal ? numStr.split('.')[1].length : 0;

    let start = 0;
    const duration = 1000;
    const startTime = performance.now();

    const animate = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      const easeProgress = progress * (2 - progress);
      const currentVal = start + easeProgress * (targetNumber - start);
      
      let formattedVal = '';
      if (isDecimal) {
        formattedVal = currentVal.toFixed(decimalPlaces);
      } else {
        formattedVal = Math.round(currentVal).toString();
      }

      const parts = formattedVal.split('.');
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      const finalVal = parts.join('.');

      setDisplayValue(`${prefix}${finalVal}${suffix}`);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [value]);

  return <span>{displayValue}</span>;
};

/**
 * Enterprise Light Stat Card Component
 */
const StatsCard = ({ title, value, icon: Icon, color = '#2563EB', trend }) => {
  const isPositive = trend >= 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      style={{ height: '100%' }}
    >
      <Card 
        sx={{ 
          height: '100%', 
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          p: 1,
          bgcolor: 'rgba(15, 23, 42, 0.35)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: '12px',
          boxShadow: 'none',
          backgroundImage: 'none',
          transition: 'all 0.15s ease-in-out',
          '&:hover': {
            bgcolor: 'rgba(255, 255, 255, 0.02)',
            borderColor: 'rgba(6, 182, 212, 0.3)',
          }
        }}
      >
        <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
          
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
            <Typography 
              variant="subtitle2" 
              sx={{ 
                color: '#94A3B8', 
                fontWeight: 600,
                fontSize: '0.75rem',
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
              }}
            >
              {title}
            </Typography>

            {Icon && (
              <Box 
                sx={{ 
                  color: '#94A3B8',
                  display: 'flex',
                  alignItems: 'center',
                  opacity: 0.7
                }}
              >
                <Icon size={18} />
              </Box>
            )}
          </Box>

          
          <Typography 
            variant="h4" 
            sx={{ 
              fontWeight: 700, 
              letterSpacing: '-0.025em', 
              color: '#FFFFFF',
              mb: 1.5,
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <AnimatedValue value={value} />
          </Typography>

          
          {trend !== undefined && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Box 
                sx={{ 
                  display: 'inline-flex',
                  alignItems: 'center',
                  fontWeight: 600,
                  fontSize: '0.75rem',
                  color: isPositive ? '#22C55E' : '#EF4444',
                }}
              >
                {isPositive ? '↑' : '↓'} {Math.abs(trend)}%
              </Box>
              <Typography 
                variant="caption" 
                sx={{ 
                  color: '#64748B', 
                  fontSize: '0.75rem',
                  fontWeight: 500
                }}
              >
                vs last month
              </Typography>
            </Box>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default StatsCard;