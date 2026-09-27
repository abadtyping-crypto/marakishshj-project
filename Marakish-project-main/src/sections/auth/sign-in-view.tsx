import { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';

import { Iconify } from 'src/components/iconify';

import { useAuth } from 'src/auth/auth-context';

// ----------------------------------------------------------------------

export function SignInView() {
  const { t } = useTranslation();
  const { loginWithGoogle, error: authError } = useAuth();


  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGoogleSignIn = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      await loginWithGoogle();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [loginWithGoogle]);

  return (
    <>

      <Box
        sx={{
          gap: 1.5,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          mb: 5,
        }}
      >
        <Typography variant="h5">{t('auth.signIn')}</Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {t('auth.welcomeBack')}
        </Typography>
      </Box>

      {authError && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {authError}
        </Alert>
      )}

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}


      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <LoadingButton
          fullWidth
          size="large"
          color="inherit"
          variant="outlined"
          startIcon={<Iconify icon={'flat-color-icons:google' as any} />}
          onClick={handleGoogleSignIn}
          loading={loading}
          sx={{
            py: 1.5,
            fontSize: '1rem',
            fontWeight: 'bold',
            borderColor: 'divider',
            '&:hover': {
              bgcolor: 'action.hover',
              borderColor: 'text.primary',
            },
          }}
        >
          {t('auth.signInWithGoogle')}
        </LoadingButton>

      </Box>
    </>
  );
}
