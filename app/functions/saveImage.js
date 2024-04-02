import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';

const saveImage = async (imageUri) => {
    console.log('imageUri', imageUri);
    try {
        // Download the image to the cache directory
        const downloadResult = await FileSystem.downloadAsync(
            imageUri,
            FileSystem.cacheDirectory + 'image.jpg'
        );

        if (downloadResult.status !== 200) {
            throw new Error('Failed to download image');
        }

        // Create asset from the downloaded image file URI
        const asset = await MediaLibrary.createAssetAsync(downloadResult.uri);

        // Prompt user to select where to save the image
        await MediaLibrary.saveToLibraryAsync(asset);

        // Optionally, you can display a message indicating success
        alert('Image saved successfully!');
    } catch (error) {
        console.error('Error saving image: ', error);
        // Optionally, you can display an error message
        alert('Error saving image. Please try again.');
    }
};

export default saveImage;
