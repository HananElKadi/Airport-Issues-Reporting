const SERVER_URL = 'http://192.168.86.56:8000';

async function uploadImages(photos) {
  const formData = new FormData();

  // Append each photo with the same field name 'files'
  photos.forEach((photoUri, index) => {
    console.log(photoUri);

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
