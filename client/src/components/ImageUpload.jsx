import React, { useState } from 'react';
import { useUser } from '../context/UserContext';
import { uploadProfilePicture, deleteProfilePicture } from '../api/users';

const ImageUpload = () => {
    const { user, setUser } = useUser();

    const [file, setFile] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const [loading, setLoading] = useState(false);
    const [imageSucess, setImageSuccess] = useState("");


    // Handle file selection
    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    // Upload the file to your backend (which will upload it to S3)
    const handleUpload = async () => {
        if (!file) {
            alert('Please select a file first!');
            return;
        }

        setLoading(true);
        const formData = new FormData();
        formData.append('image', file); // Append the file to the form data

        try {
            // Make a POST request to your backend API to upload the image to S3
            await deleteProfilePicture(user.id);
            const response = await uploadProfilePicture(user.id, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setUser(response)
            setImageSuccess("Image submitted successfully!")
            // The backend should return the image URL or S3 path
            // setImageUrl(response.data.url);
        } catch (err) {
            console.error('Error uploading image:', err);
            alert('Error uploading image');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <div className='flex flex-col justiyf-center gap-4 my-8'>
                {imageSucess && <p className='bg-green-100 p-2'>{imageSucess}</p>}
                <h1 className='text-2xl'>Upload Profile Picture</h1>
                {user?.image && (
                    <div>
                        <h3>Uploaded Image:</h3>
                        <img className='w-[300px] mx-auto' src={user.image} alt="Uploaded" />
                    </div>
                )}

                <input className='mx-auto' type="file" onChange={handleFileChange} accept='image/*' />
                <button className='mx-auto bg-gray-200 hover:bg-gray-300 px-8 py-4' onClick={handleUpload} disabled={loading}>
                    {loading ? 'Uploading...' : 'Submit Image'}
                </button>
            </div>
            {imageUrl && (
                <div>
                    <h3>Uploaded Image:</h3>
                    <img src={imageUrl} alt="Uploaded" style={{ width: '300px' }} />
                </div>
            )}
        </div>
    );
};

export default ImageUpload;
