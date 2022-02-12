import { useState, useEffect } from "react";
import { firestore } from '../utils/firebase';
import { doc, onSnapshot } from "@firebase/firestore";

const useFirestoreDoc = (documentPath) => {
    const [document, setDocument] = useState({});

    useEffect(async () => {
        const docRef = doc(firestore, documentPath);
        const docObserver = onSnapshot(docRef, snap => {
            if(snap.exists) {
                setDocument(snap.data());
            }
            else {
                console.log("Error while fetching data");
            }
        });
    }, [])
    
    return { document };
}

export default useFirestoreDoc;