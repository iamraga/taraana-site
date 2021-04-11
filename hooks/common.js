import { projectFirestore } from "../utils/firebase";

export function deleteDoc(docPath) {
    const docRef = projectFirestore.doc(docPath);
    docRef.delete();
}

export async function getAllAlbumIds() {
    const albums = await projectFirestore.collection(`albums`).get();
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