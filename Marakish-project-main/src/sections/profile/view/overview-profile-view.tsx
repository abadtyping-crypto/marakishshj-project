import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { updateProfile, linkWithPopup } from 'firebase/auth';
import { ref, getStorage, uploadBytes, getDownloadURL } from 'firebase/storage';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import MuiAlert from '@mui/material/Alert';
import Divider from '@mui/material/Divider';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';

import { googleProvider } from 'src/firebase';
import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';

import { useAuth } from 'src/auth/auth-context';

import { ProfileImageCropDialog } from '../profile-image-crop-dialog';

export function OverviewProfileView() {
    const { t } = useTranslation();
    const { user, forgotPassword } = useAuth();
    const [profileImage, setProfileImage] = useState<string | null>(user?.photoURL || null);
    const [uploading, setUploading] = useState(false);
    const [resetting, setResetting] = useState(false);
    const [linking, setLinking] = useState(false);
    const [cropDialogOpen, setCropDialogOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: 'success' | 'error' | 'warning' | 'info' }>({ open: false, message: '', severity: 'info' });

    const isGoogleLinked = user?.providerData.some((p) => p.providerId === 'google.com');

    const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        // Create a preview URL for the selected image
        const reader = new FileReader();
        reader.onload = () => {
            setSelectedImage(reader.result as string);
            setCropDialogOpen(true);
        };
        reader.readAsDataURL(file);

        // Reset the input value so the same file can be selected again
        event.target.value = '';
    };

    const handleCropComplete = async (croppedImageBlob: Blob) => {
        if (!user) return;

        console.log('Starting upload process...');
        console.log('Blob size:', (croppedImageBlob.size / 1024).toFixed(2), 'KB');

        setCropDialogOpen(false);
        setUploading(true);

        try {
            console.log('Initializing Firebase Storage...');
            const storage = getStorage();
            const timestamp = Date.now();
            const storageRef = ref(storage, `profiles/${user.uid}/profile_${timestamp}.jpg`);

            console.log('Uploading to Firebase Storage...');
            // Upload the optimized cropped image
            await uploadBytes(storageRef, croppedImageBlob, {
                contentType: 'image/jpeg',
            });

            console.log('Getting download URL...');
            const url = await getDownloadURL(storageRef);
            console.log('Download URL obtained:', url);

            console.log('Updating user profile...');
            await updateProfile(user, { photoURL: url });
            setProfileImage(url);

            console.log('Upload complete!');
            setSnackbar({ open: true, message: t('common.success'), severity: 'success' });
        } catch (error) {
            console.error('Error uploading image:', error);
            console.error('Error details:', JSON.stringify(error, null, 2));
            setSnackbar({ open: true, message: `${t('common.error')}: ${error instanceof Error ? error.message : 'Unknown error'}`, severity: 'error' });
        } finally {
            setUploading(false);
            setSelectedImage(null);
        }
    };

    const handleCropDialogClose = () => {
        setCropDialogOpen(false);
        setSelectedImage(null);
    };

    const handleResetPassword = async () => {
        if (!user?.email) return;
        setResetting(true);
        try {
            await forgotPassword(user.email);
            setSnackbar({ open: true, message: t('auth.passwordResetSent'), severity: 'success' });
        } catch (error) {
            console.error('Reset error:', error);
            setSnackbar({ open: true, message: t('common.error'), severity: 'error' });
        } finally {
            setResetting(false);
        }
    };

    const handleLinkGoogle = async () => {
        if (!user) return;
        setLinking(true);
        try {
            await linkWithPopup(user, googleProvider);
            setSnackbar({ open: true, message: t('common.success'), severity: 'success' });
            window.location.reload();
        } catch (error: any) {
            console.error('Linking error:', error);
            setSnackbar({ open: true, message: t('common.error'), severity: 'error' });
        } finally {
            setLinking(false);
        }
    };

    return (
        <DashboardContent>
            <Typography variant="h4" sx={{ mb: 3 }}>
                {t('profile.profile')}
            </Typography>

            <Card sx={{ maxWidth: 400, mx: 'auto', py: 5, px: 3, textAlign: 'center' }}>
                <Box sx={{ mb: 3, position: 'relative', display: 'inline-block' }}>
                    <Avatar
                        src={profileImage || undefined}
                        alt={user?.displayName || 'User'}
                        sx={{ width: 128, height: 128, fontSize: 64 }}
                    >
                        {user?.displayName?.charAt(0).toUpperCase()}
                    </Avatar>
                    <IconButton
                        component="label"
                        disabled={uploading}
                        sx={{
                            position: 'absolute',
                            bottom: 0,
                            right: 0,
                            bgcolor: 'common.white',
                            boxShadow: 1,
                            '&:hover': { bgcolor: 'grey.200' },
                        }}
                    >
                        {uploading ? (
                            <CircularProgress size={24} />
                        ) : (
                            <Iconify icon={'solar:camera-add-bold' as any} />
                        )}
                        <input hidden type="file" accept="image/*" onChange={handleImageSelect} />
                    </IconButton>
                </Box>

                <Typography variant="h6">{user?.displayName || 'Admin User'}</Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3 }}>
                    {user?.email}
                </Typography>

                <Stack spacing={2}>
                    <Button
                        variant="outlined"
                        component="label"
                        startIcon={
                            <Iconify
                                icon={(uploading ? 'eos-icons:loading' : 'solar:upload-minimalistic-bold') as any}
                            />
                        }
                        disabled={uploading}
                        fullWidth
                    >
                        {uploading ? t('profile.uploading') : t('profile.updatePicture')}
                        <input hidden type="file" accept="image/*" onChange={handleImageSelect} />
                    </Button>

                    <Divider />

                    <Button
                        variant="outlined"
                        color="primary"
                        startIcon={<Iconify icon={"solar:key-minimalistic-bold-duotone" as any} />}
                        onClick={handleResetPassword}
                        disabled={resetting}
                        fullWidth
                    >
                        {resetting ? t('profile.sending') : t('profile.resetPassword')}
                    </Button>

                    {!isGoogleLinked ? (
                        <Button
                            variant="contained"
                            color="info"
                            startIcon={<Iconify icon={"logos:google-icon" as any} />}
                            onClick={handleLinkGoogle}
                            disabled={linking}
                            fullWidth
                        >
                            {linking ? t('profile.linking') : t('profile.linkWithGoogle')}
                        </Button>
                    ) : (
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, color: 'success.main', mt: 1 }}>
                            <Iconify icon={"solar:check-circle-bold" as any} />
                            <Typography variant="subtitle2">{t('profile.googleLinked')}</Typography>
                        </Box>
                    )}
                </Stack>
            </Card>

            {/* Image Crop Dialog */}
            {selectedImage && (
                <ProfileImageCropDialog
                    open={cropDialogOpen}
                    imageSrc={selectedImage}
                    onClose={handleCropDialogClose}
                    onCropComplete={handleCropComplete}
                />
            )}

            <Snackbar
                open={snackbar.open}
                autoHideDuration={6000}
                onClose={() => setSnackbar({ ...snackbar, open: false })}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <MuiAlert
                    onClose={() => setSnackbar({ ...snackbar, open: false })}
                    severity={snackbar.severity}
                    sx={{ width: '100%' }}
                    variant="filled"
                >
                    {snackbar.message}
                </MuiAlert>
            </Snackbar>
        </DashboardContent>
    );
}
