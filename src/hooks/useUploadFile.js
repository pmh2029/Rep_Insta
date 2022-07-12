import { useEffect, useState } from 'react';
import { fireStorage } from '../lib/config';

const useUploadFile = (file) => {
    const [progress, setProgress] = useState(0);
    const [url, setUrl] = useState(null);

    useEffect(() => {
        const photoNameRef = fireStorage.ref(file.name);

        photoNameRef.put(file).on(
            'state_changed',
            (snap) => {
                setProgress((snap.bytesTransferred / snap.totalBytes) * 100);
            },
            (err) => {
                console.log(err);
            },
            async () => {
                const getServerUrl = await photoNameRef.getDownloadURL();
                setUrl(getServerUrl);
            }
        );
    }, [file, file.name]);
    return { progress, url };
};

export default useUploadFile;
