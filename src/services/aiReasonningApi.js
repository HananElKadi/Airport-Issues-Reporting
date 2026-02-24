const SERVER_URL = 'http://192.168.86.34:8000';

async function uploadImages(photos) {
  const formData = new FormData();

  photos.forEach((photoUri, index) => {
    formData.append('images', {
      uri: photoUri,
      type: 'image/jpeg',
      name: `photo_${index}.jpg`,
    });
  });

  try {
    const res = await fetch(`${SERVER_URL}/analyze-images`, {
      method: 'POST',
      body: formData,
    });

    if (!res.ok) {
      throw new Error(`Server error: ${res.status}`);
    }

    const result = await res.json();
    return result;
  } catch (err) {
    throw new Error('Upload failed: ' + err.message);
  }
}

export default uploadImages;
