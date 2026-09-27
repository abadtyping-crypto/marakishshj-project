import type { StackProps } from '@mui/material/Stack';

import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

import { useAuth } from 'src/auth/auth-context';

// ----------------------------------------------------------------------

export function NavUser({ sx, ...other }: StackProps) {
  const { user, displayName, role, photoURL } = useAuth();

  const displayUser = {
    displayName: displayName || user?.displayName || 'User',
    role: role || 'Staff',
    photoURL: photoURL || user?.photoURL || '',
  };

  return (
    <Box
      sx={[
        {
          p: 2,
          my: 2,
          gap: 1.5,
          display: 'flex',
          alignItems: 'center',
          borderRadius: 1.5,
          bgcolor: (theme) => theme.vars.palette.action.selected,
          transition: (theme) => theme.transitions.create('all'),
          '&:hover': {
            bgcolor: (theme) => theme.vars.palette.action.hover,
          },
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >
      <Avatar
        src={displayUser.photoURL}
        alt={displayUser.displayName}
        sx={{
          width: 48,
          height: 48,
          border: (theme) => `solid 2px ${theme.vars.palette.background.default}`,
        }}
      >
        {displayUser.displayName.charAt(0).toUpperCase()}
      </Avatar>
      <Box sx={{ minWidth: 0 }}>
        <Typography variant="subtitle2" noWrap sx={{ color: 'text.primary' }}>
          {displayUser.displayName}
        </Typography>
        <Typography variant="caption" noWrap sx={{ color: 'text.secondary', display: 'block' }}>
          {displayUser.role}
        </Typography>
      </Box>
    </Box>
  );
}
