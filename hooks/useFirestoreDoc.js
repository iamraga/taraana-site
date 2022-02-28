import { useState, useEffect } from "react";
import { firestore } from '../utils/firebase';
import { doc, getDoc, onSnapshot } from "@firebase/firestore";

const useFirestoreDoc = async (documentPath) => {

    const docRef = doc(firestore, documentPath);
    const docSnap = await getDoc(docRef);
    if(docSnap.exists) {
        return docSnap.data();
    }
    else {
        console.log("Error while fetching data");
    }
    return null;
}

export default useFirestoreDoc;