import { firestore } from "../utils/firebase";
import { collection, getDocs, query, doc } from 'firebase/firestore';

export function deleteDoc(docPath) {
    const docRef = doc(firestore, docPath);
    docRef.delete();
}

export async function getAllAlbumIds() {
    const albumsRef = query(collection(firestore, `albums`))
    const albums = await getDocs(albumsRef);
    let albumIds = [];
    albums.forEach(album => {
        albumIds.push({
            params: {
                albumid: album.id
            }
        });
    });
    return albumIds;
}