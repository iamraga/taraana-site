import { useState, useEffect } from "react";
import { projectFirestore } from '../utils/firebase';

const useFirestoreDoc = (documentPath) => {
    const [doc, setDoc] = useState({});

    useEffect(async () => {
        const docRef = projectFirestore.doc(documentPath);
        const docObserver = docRef.onSnapshot(snap => {
            if(snap.exists) {
                setDoc(snap.data());
            }
            else {
                console.log("Error while fetching data");
            }
        });
    }, [])
    
    return { doc };
}

export default useFirestoreDoc;