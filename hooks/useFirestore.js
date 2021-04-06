import { useState, useEffect } from "react";
import { projectFirestore } from '../utils/firebase';

const useFirestore = (collection, orderBy) => {
    const [docs, setDocs] = useState([]);

    useEffect(() => {
        let unsub;
        if(orderBy) {
            unsub = projectFirestore.collection(collection)
                .orderBy(orderBy)
                .onSnapshot((snap) => {
                    let documents = [];
                    snap.forEach((doc) => {
                        documents.push({...doc.data(), id: doc.id});
                    });
                    setDocs(documents);
                });
        }
        else {
            unsub = projectFirestore.collection(collection)
                .onSnapshot((snap) => {
                    let documents = [];
                    snap.forEach((doc) => {
                        documents.push({...doc.data(), id: doc.id});
                    });
                    setDocs(documents);
                });
        }
        return () => unsub();
    }, [collection])
    
    return { docs };
}

export default useFirestore;