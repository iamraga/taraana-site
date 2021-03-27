import { useState, useEffect } from 'react';
import { projectStorage } from '../utils/firebase';

const useStorage = (file) => {
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState(null);
    const [url, setUrl] = useState(null);

    useEffect(() => {
        //References
        const storageRef = projectStorage.ref('images/' + file.name);
        storageRef.put(file).on('state_changed', (snap) => {
            let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
            setProgress(percentage);
        }, (err) => {
            setError(err);
        }, async () => { //Fired after complete upload
            const url = await storageRef.getDownloadURL();
            setUrl(url);
        });
    }, [file]);

    return { progress, url, error };
}

export default useStorage;