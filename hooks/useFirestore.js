import { useState, useEffect } from "react";
import { firestore } from '../utils/firebase';
import { query, onSnapshot, collection, orderBy } from 'firebase/firestore';

const useFirestore = (collectionName, orderByParam) => {
    const [docs, setDocs] = useState([]);

    useEffect(() => {
        let unsub;
        let collectionRef;
        if(orderByParam) {
            collectionRef = query(collection(firestore, collectionName), orderBy(orderByParam));
        }
        else {
            collectionRef = query(collection(firestore, collectionName));
        }
        unsub = onSnapshot(collectionRef, (snap) => {
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