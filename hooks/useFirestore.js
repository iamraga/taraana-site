import { useState, useEffect } from "react";
import { firestore } from '../utils/firebase';
import { query, onSnapshot, collection, orderBy } from 'firebase/firestore';

const useFirestore = (collectionName, orderByParam) => {
    const [docs, setDocs] = useState([]);

    useEffect(() => {
        let unsub;
        let albumsRef;
        if(orderByParam) {
            albumsRef = query(collection(firestore, collectionName), orderBy(orderByParam));
        }
        else {
            albumsRef = query(collection(firestore, collectionName));
        }
        unsub = onSnapshot(albumsRef, (snap) => {
            let documents = [];
            snap.forEach((doc) => {
                documents.push({...doc.data(), id: doc.id});
            });
            setDocs(documents);
        });
        return () => unsub();
    }, [collectionName])
    
    return { docs };
}

export default useFirestore;