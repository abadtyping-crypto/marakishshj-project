import Cropper from 'react-easy-crop';
import { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Slider from '@mui/material/Slider';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import { Iconify } from 'src/components/iconify';

// Types
interface Area {
    x: number;
    y: number;
    width: number;
    height: number;
}

interface CroppedAreaPixels extends Area { }

interface ProfileImageCropDialogProps {
    open: boolean;
    imageSrc: string;
    onClose: () => void;
    onCropComplete: (croppedImage: Blob) => void;
}

// Helper function to create image
const createImage = (url: string): Promise<HTMLImageElement> =>
    new Promise((resolve, reject) => {
        const image = new Image();
        image.addEventListener('load', () => resolve(image));
        image.addEventListener('error', (error) => reject(error));
        image.setAttribute('crossOrigin', 'anonymous');
        image.src = url;
    });

// Helper function to get cropped image with rotation and size optimization
async function getCroppedImg(
    imageSrc: string,
    pixelCrop: CroppedAreaPixels,
    rotation: number = 0
): Promise<Blob> {
    const image = await createImage(imageSrc);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    if (!ctx) {
        throw new Error('No 2d context');
    }

    const maxSize = 512; // Maximum dimension for profile picture

    // Calculate the bounding box of the rotated image
    const rotRad = (rotation * Math.PI) / 180;
    const { width: bBoxWidth, height: bBoxHeight } = rotateSize(
        pixelCrop.width,
        pixelCrop.height,
        rotation
    );

    // Set canvas size to the cropped area
    canvas.width = bBoxWidth;
    canvas.height = bBoxHeight;

    // Translate canvas context to a central location to allow rotating around the center
    ctx.translate(bBoxWidth / 2, bBoxHeight / 2);
    ctx.rotate(rotRad);
    ctx.translate(-pixelCrop.width / 2, -pixelCrop.height / 2);

    // Draw the cropped image
    ctx.drawImage(
        image,
        pixelCrop.x,
        pixelCrop.y,
        pixelCrop.width,
        pixelCrop.height,
        0,
        0,
        pixelCrop.width,
        pixelCrop.height
    );

    // Resize if needed
    if (bBoxWidth > maxSize || bBoxHeight > maxSize) {
        const scale = Math.min(maxSize / bBoxWidth, maxSize / bBoxHeight);
        const resizedCanvas = document.createElement('canvas');
        const resizedCtx = resizedCanvas.getContext('2d');

        if (!resizedCtx) {
            throw new Error('No 2d context for resize');
        }

        resizedCanvas.width = bBoxWidth * scale;
        resizedCanvas.height = bBoxHeight * scale;
        resizedCtx.drawImage(canvas, 0, 0, bBoxWidth * scale, bBoxHeight * scale);

        // Convert resized canvas to blob with aggressive compression
        return new Promise((resolve, reject) => {
            resizedCanvas.toBlob(
                (blob) => {
                    if (blob) {
                        resolve(blob);
                    } else {
                        reject(new Error('Canvas is empty'));
                    }
                },
                'image/jpeg',
                0.7 // More aggressive compression to prevent buffering
            );
        });
    }

    // Convert to blob with optimization
    return new Promise((resolve, reject) => {
        canvas.toBlob(
            (blob) => {
                if (blob) {
                    resolve(blob);
                } else {
                    reject(new Error('Canvas is empty'));
                }
            },
            'image/jpeg',
            0.7 // More aggressive compression to prevent buffering
        );
    });
}

// Helper function to calculate rotated size
function rotateSize(width: number, height: number, rotation: number) {
    const rotRad = (rotation * Math.PI) / 180;
    return {
        width: Math.abs(Math.cos(rotRad) * width) + Math.abs(Math.sin(rotRad) * height),
        height: Math.abs(Math.sin(rotRad) * width) + Math.abs(Math.cos(rotRad) * height),
    };
}

export function ProfileImageCropDialog({
    open,
    imageSrc,
    onClose,
    onCropComplete,
}: ProfileImageCropDialogProps) {
    const { t } = useTranslation();
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [rotation, setRotation] = useState(0);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<CroppedAreaPixels | null>(null);

    const onCropChange = useCallback((newCrop: { x: number; y: number }) => {
        setCrop(newCrop);
    }, []);

    const onZoomChange = useCallback((newZoom: number) => {
        setZoom(newZoom);
    }, []);

    const onRotationChange = useCallback((newRotation: number) => {
        setRotation(newRotation);
    }, []);

    const onCropCompleteCallback = useCallback(
        (_croppedArea: Area, croppedAreaPx: CroppedAreaPixels) => {
            setCroppedAreaPixels(croppedAreaPx);
        },
        []
    );

    const handleSave = useCallback(async () => {
        try {
            if (!croppedAreaPixels) return;

            const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels, rotation);
            onCropComplete(croppedImage);
        } catch (e) {
            console.error('Error cropping image:', e);
        }
    }, [croppedAreaPixels, imageSrc, rotation, onCropComplete]);

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="md"
            fullWidth
            PaperProps={{
                sx: {
                    height: '80vh',
                },
            }}
        >
            <DialogTitle>
                <Stack direction="row" alignItems="center" spacing={1}>
                    <Iconify icon={"solar:crop-minimalistic-bold-duotone" as any} width={24} />
                    <Typography variant="h6">{t('profile.cropImage')}</Typography>
                </Stack>
            </DialogTitle>

            <DialogContent sx={{ position: 'relative', p: 0 }}>
                <Box
                    sx={{
                        position: 'relative',
                        width: '100%',
                        height: 'calc(100% - 120px)',
                        bgcolor: 'background.neutral',
                    }}
                >
                    <Cropper
                        image={imageSrc}
                        crop={crop}
                        zoom={zoom}
                        rotation={rotation}
                        aspect={1}
                        cropShape="round"
                        showGrid={false}
                        onCropChange={onCropChange}
                        onZoomChange={onZoomChange}
                        onCropComplete={onCropCompleteCallback}
                    />
                </Box>

                <Box sx={{ p: 3 }}>
                    <Stack spacing={3}>
                        {/* Zoom Control */}
                        <Box>
                            <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 1 }}>
                                <Iconify icon={"solar:magnifer-zoom-out-bold" as any} width={20} />
                                <Typography variant="body2" sx={{ minWidth: 60 }}>
                                    {t('profile.zoom')}
                                </Typography>
                                <Slider
                                    value={zoom}
                                    min={1}
                                    max={3}
                                    step={0.1}
                                    onChange={(_, value) => onZoomChange(value as number)}
                                    sx={{ flex: 1 }}
                                />
                                <Iconify icon={"solar:magnifer-zoom-in-bold" as any} width={20} />
                            </Stack>
                        </Box>

                        {/* Rotation Control */}
                        <Box>
                            <Stack direction="row" alignItems="center" spacing={2}>
                                <Iconify icon={"solar:refresh-bold" as any} width={20} />
                                <Typography variant="body2" sx={{ minWidth: 60 }}>
                                    {t('profile.rotation')}
                                </Typography>
                                <Slider
                                    value={rotation}
                                    min={0}
                                    max={360}
                                    step={1}
                                    onChange={(_, value) => onRotationChange(value as number)}
                                    sx={{ flex: 1 }}
                                />
                                <Typography variant="caption" sx={{ minWidth: 40, textAlign: 'right' }}>
                                    {rotation}°
                                </Typography>
                            </Stack>
                        </Box>
                    </Stack>
                </Box>
            </DialogContent>

            <DialogActions sx={{ px: 3, pb: 3 }}>
                <Button onClick={onClose} variant="outlined" color="inherit">
                    {t('common.cancel')}
                </Button>
                <Button
                    onClick={handleSave}
                    variant="contained"
                    color="primary"
                    startIcon={<Iconify icon={"solar:check-circle-bold" as any} />}
                >
                    {t('common.save')}
                </Button>
            </DialogActions>
        </Dialog>
    );
}
