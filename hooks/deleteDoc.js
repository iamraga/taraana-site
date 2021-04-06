import { projectFirestore } from "../utils/firebase";

export default function deleteDoc(docPath) {
    const docRef = projectFirestore.doc(docPath);
    docRef.delete();
}