import type { IconButtonProps } from '@mui/material/IconButton';

import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import Box from '@mui/material/Box';
import { alpha } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

export type LanguageToggleProps = IconButtonProps;

export function LanguageToggle({ sx, ...other }: LanguageToggleProps) {
  const { i18n } = useTranslation();

  const isArabic = i18n.language === 'ar';

  const handleToggle = useCallback(() => {
    const newLang = isArabic ? 'en' : 'ar';
    i18n.changeLanguage(newLang);
    document.dir = newLang === 'ar' ? 'rtl' : 'ltr';
  }, [i18n, isArabic]);

  return (
    <IconButton
      onClick={handleToggle}
      sx={{
        width: 80,
        height: 40,
        borderRadius: 5,
        position: 'relative',
        overflow: 'hidden',
        background: (theme) =>
          `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)} 0%, ${alpha(
            theme.palette.primary.main,
            0.2
          )} 100%)`,
        border: (theme) => `2px solid ${alpha(theme.palette.primary.main, 0.3)}`,
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        '&:hover': {
          background: (theme) =>
            `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.2)} 0%, ${alpha(
              theme.palette.primary.main,
              0.3
            )} 100%)`,
          border: (theme) => `2px solid ${alpha(theme.palette.primary.main, 0.5)}`,
          transform: 'scale(1.05)',
        },
        '&:active': {
          transform: 'scale(0.95)',
        },
        ...sx,
      }}
      {...other}
    >
      {/* Background sliding indicator */}
      <Box
        sx={{
          position: 'absolute',
          top: 4,
          left: isArabic ? 'calc(50% + 2px)' : 4,
          width: 'calc(50% - 6px)',
          height: 'calc(100% - 8px)',
          borderRadius: 4,
          background: (theme) =>
            `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
          transition: 'left 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          boxShadow: (theme) => `0 2px 8px ${alpha(theme.palette.primary.main, 0.4)}`,
        }}
      />

      {/* Flags Container */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          height: '100%',
          position: 'relative',
          zIndex: 1,
          px: 0.5,
        }}
      >
        {/* US Flag (English) */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 24,
            height: 24,
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            transform: !isArabic ? 'scale(1.2)' : 'scale(0.9)',
            opacity: !isArabic ? 1 : 0.6,
            filter: !isArabic ? 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))' : 'none',
          }}
        >
          <Iconify icon={"circle-flags:us" as any} width={24} sx={{ borderRadius: '50%' }} />
        </Box>

        {/* UAE Flag (Arabic) */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 24,
            height: 24,
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            transform: isArabic ? 'scale(1.2)' : 'scale(0.9)',
            opacity: isArabic ? 1 : 0.6,
            filter: isArabic ? 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))' : 'none',
          }}
        >
          <Iconify icon={"circle-flags:ae" as any} width={24} sx={{ borderRadius: '50%' }} />
        </Box>
      </Box>

      {/* Ripple effect on click */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          pointerEvents: 'none',
          '&::after': {
            content: '""',
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: 0,
            height: 0,
            borderRadius: '50%',
            background: (theme) => alpha(theme.palette.common.white, 0.3),
            transform: 'translate(-50%, -50%)',
            transition: 'width 0.6s, height 0.6s',
          },
        }}
      />
    </IconButton>
  );
}
