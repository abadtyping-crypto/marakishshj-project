import { GOOGLE_DRIVE_CONFIG } from 'src/config/google-drive-config';

// Extract configuration
const {
  clientId: GOOGLE_CLIENT_ID,
  scope: SCOPES,
  parentFolderId: PARENT_FOLDER_ID,
} = GOOGLE_DRIVE_CONFIG;

let accessToken: string | null = null;

/**
 * Initialize Google Sign-In using Google Identity Services (new method)
 */
export const initGoogleDriveApi = async (): Promise<boolean> => new Promise((resolve) => {
  // Check if already signed in
  if (accessToken) {
    resolve(true);
    return;
  }

  // Load Google Identity Services
  const script = document.createElement('script');
  script.src = 'https://accounts.google.com/gsi/client';
  script.onload = () => {
    console.log('Google Identity Services loaded');
    resolve(false);
  };
  script.onerror = () => {
    console.error('Failed to load Google Identity Services');
    resolve(false);
  };
  document.head.appendChild(script);
});

/**
 * Sign in to Google Drive using OAuth 2.0
 */
export const signInToGoogleDrive = async (): Promise<boolean> => true;

/**
 * Create a folder in Google Drive using REST API
 */
const createFolder = async (folderName: string, parentFolderId: string): Promise<string> => {
  try {
    if (!accessToken) {
      throw new Error('Not authenticated. Please sign in first.');
    }

    console.log(`📁 Creating folder "${folderName}" in parent "${parentFolderId}"`);

    const metadata = {
      name: folderName,
      mimeType: 'application/vnd.google-apps.folder',
      parents: [parentFolderId],
    };

    const response = await fetch('https://www.googleapis.com/drive/v3/files?fields=id,webViewLink', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(metadata),
    });

    if (!response.ok) {
      const errorText = await response.text();
      let errorMessage = `Google Drive API Error (${response.status}): ${response.statusText}`;

      try {
        const errorJson = JSON.parse(errorText);
        if (errorJson.error) {
          errorMessage = `${errorMessage}\nDetails: ${errorJson.error.message || errorText}`;

          // Provide helpful hints based on error type
          if (response.status === 403) {
            errorMessage += '\n\n💡 Possible fixes:\n- Check if Google Drive API is enabled in Google Cloud Console\n- Verify the OAuth scope includes drive access\n- Ensure the parent folder ID is correct and accessible';
          } else if (response.status === 401) {
            errorMessage += '\n\n💡 Token may have expired. Try signing in again.';
          } else if (response.status === 404) {
            errorMessage += '\n\n💡 Parent folder not found. Check the parentFolderId in google-drive-config.ts';
          }
        }
      } catch {
        errorMessage += `\nRaw error: ${errorText}`;
      }

      console.error(`❌ Failed to create folder "${folderName}":`, errorMessage);
      throw new Error(errorMessage);
    }

    const result = await response.json();
    console.log(`✅ Folder "${folderName}" created successfully. ID: ${result.id}`);
    return result.id;
  } catch (error: any) {
    console.error(`❌ Error creating folder "${folderName}":`, error);
    throw error; // Re-throw to propagate the error up
  }
};

/**
 * Generate Google Drive folder URL from folder ID
 */
const getFolderUrl = (folderId: string): string =>
  `https://drive.google.com/drive/folders/${folderId}`;

/**
 * Create vehicle folder structure in Google Drive
 */
export const createVehicleFolders = async (
  serialNumber: string,
  manufacturer: string,
  model: string,
  year: number
): Promise<{ picsUrl: string; docsUrl: string }> => ({ picsUrl: '', docsUrl: '' });

/**
 * Check if user is signed in to Google Drive
 */
export const isUserSignedIn = (): boolean => !!accessToken;

/**
 * Sign out from Google Drive
 */
export const signOutFromGoogleDrive = async (): Promise<void> => {
  try {
    if (accessToken) {
      // Revoke the token
      await fetch(`https://oauth2.googleapis.com/revoke?token=${accessToken}`, {
        method: 'POST',
      });
      accessToken = null;
      console.log('Signed out successfully');
    }
  } catch (error) {
    console.error('Error signing out from Google Drive:', error);
  }
};
