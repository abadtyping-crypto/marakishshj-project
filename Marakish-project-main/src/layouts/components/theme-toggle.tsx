import type { IconButtonProps } from '@mui/material/IconButton';

import { useCallback } from 'react';

import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import { alpha, useColorScheme } from '@mui/material/styles';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

export type ThemeToggleProps = IconButtonProps;

export function ThemeToggle({ sx, ...other }: ThemeToggleProps) {
  const { mode, setMode } = useColorScheme();

  const isDark = mode === 'dark';

  const handleToggle = useCallback(() => {
    setMode(isDark ? 'light' : 'dark');
  }, [isDark, setMode]);

  return (
    <IconButton
      onClick={handleToggle}
      sx={{
        width: 40,
        height: 40,
        borderRadius: '50%',
        position: 'relative',
        overflow: 'hidden',
        background: (theme) =>
          isDark
            ? `linear-gradient(135deg, ${alpha(theme.palette.warning.main, 0.2)} 0%, ${alpha(
                theme.palette.warning.dark,
                0.3
              )} 100%)`
            : `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)} 0%, ${alpha(
                theme.palette.info.main,
                0.2
              )} 100%)`,
        border: (theme) =>
          isDark
            ? `2px solid ${alpha(theme.palette.warning.main, 0.3)}`
            : `2px solid ${alpha(theme.palette.primary.main, 0.3)}`,
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        '&:hover': {
          background: (theme) =>
            isDark
              ? `linear-gradient(135deg, ${alpha(theme.palette.warning.main, 0.3)} 0%, ${alpha(
                  theme.palette.warning.dark,
                  0.4
                )} 100%)`
              : `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.2)} 0%, ${alpha(
                  theme.palette.info.main,
                  0.3
                )} 100%)`,
          transform: 'scale(1.05) rotate(15deg)',
        },
        '&:active': {
          transform: 'scale(0.95)',
        },
        ...sx,
      }}
      {...other}
    >
      {/* Icon Container with rotation animation */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
          position: 'relative',
          transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
          transform: isDark ? 'rotate(180deg)' : 'rotate(0deg)',
        }}
      >
        {isDark ? (
          <Iconify
            icon={'solar:moon-bold-duotone' as any}
            width={24}
            sx={{
              color: 'warning.main',
              filter: (theme) => `drop-shadow(0 2px 8px ${alpha(theme.palette.warning.main, 0.5)})`,
              animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
              '@keyframes pulse': {
                '0%, 100%': {
                  opacity: 1,
                },
                '50%': {
                  opacity: 0.8,
                },
              },
            }}
          />
        ) : (
          <Iconify
            icon={'solar:sun-bold-duotone' as any}
            width={24}
            sx={{
              color: 'warning.main',
              filter: (theme) => `drop-shadow(0 2px 8px ${alpha(theme.palette.warning.main, 0.5)})`,
              animation: 'spin 20s linear infinite',
              '@keyframes spin': {
                '0%': {
                  transform: 'rotate(0deg)',
                },
                '100%': {
                  transform: 'rotate(360deg)',
                },
              },
            }}
          />
        )}
      </Box>

      {/* Glowing ring effect */}
      <Box
        sx={{
          position: 'absolute',
          top: -2,
          left: -2,
          right: -2,
          bottom: -2,
          borderRadius: '50%',
          opacity: 0,
          transition: 'opacity 0.3s',
          pointerEvents: 'none',
          background: (theme) =>
            `radial-gradient(circle, ${alpha(
              isDark ? theme.palette.warning.main : theme.palette.info.main,
              0.4
            )} 0%, transparent 70%)`,
          '.MuiIconButton-root:hover &': {
            opacity: 1,
          },
        }}
      />
    </IconButton>
  );
}
