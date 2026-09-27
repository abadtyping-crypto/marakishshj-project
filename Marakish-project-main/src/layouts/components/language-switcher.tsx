import type { IconButtonProps } from '@mui/material/IconButton';

import { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import Box from '@mui/material/Box';
import Popover from '@mui/material/Popover';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuItem, { menuItemClasses } from '@mui/material/MenuItem';

// ----------------------------------------------------------------------

const LANGUAGES = [
  { value: 'en', label: 'English', icon: '🇬🇧' },
  { value: 'ar', label: 'العربية', icon: '🇦🇪' },
];

export type LanguagePopoverProps = IconButtonProps;

export function LanguagePopover({ sx, ...other }: LanguagePopoverProps) {
  const { i18n } = useTranslation();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleOpen = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  }, []);

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const handleChangeLang = useCallback(
    (newLang: string) => {
      i18n.changeLanguage(newLang);
      document.dir = newLang === 'ar' ? 'rtl' : 'ltr';
      handleClose();
    },
    [i18n, handleClose]
  );

  const currentLang = LANGUAGES.find((lang) => lang.value === i18n.language) || LANGUAGES[0];
  const open = Boolean(anchorEl);

  return (
    <>
      <IconButton
        onClick={handleOpen}
        sx={{
          width: 40,
          height: 40,
          ...(open && { bgcolor: 'action.selected' }),
          ...sx,
        }}
        {...other}
      >
        <Typography variant="h5">{currentLang.icon}</Typography>
      </IconButton>

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        slotProps={{
          paper: {
            sx: { width: 200, p: 1 },
          },
        }}
      >
        {LANGUAGES.map((option) => (
          <MenuItem
            key={option.value}
            selected={option.value === i18n.language}
            onClick={() => handleChangeLang(option.value)}
            sx={{
              borderRadius: 0.75,
              [`&.${menuItemClasses.selected}`]: {
                bgcolor: 'action.selected',
                fontWeight: 'fontWeightSemiBold',
              },
            }}
          >
            <Box component="span" sx={{ mr: 1 }}>
              {option.icon}
            </Box>
            {option.label}
          </MenuItem>
        ))}
      </Popover>
    </>
  );
}
