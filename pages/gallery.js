import { useRouter } from "next/router";
import AlbumsList from "../comps/gallery/albumsList";
import ImagesList from "../comps/gallery/imagesList";
import useFirestore from "../hooks/useFirestore";
import { firestore } from "../utils/firebase";
import { doc, getDoc } from "@firebase/firestore";
import OtherLayout from "../layouts/otherLayout";
import useFirestoreDoc from "../hooks/useFirestoreDoc";
import { useEffect, useState } from "react";

export default function GalleryPage() {

    const [album, setAlbum] = useState();
    
    const router = useRouter();
    const { id: albumId } = router.query;
    useEffect(function() {
        const albumRef = doc(firestore, `albums/${albumId}`);
        getDoc(albumRef)
            .then(doc => {
                setAlbum(doc.data());
            });
    }, [albumId]);

    
    let renderComp;
    
    if( !albumId ) {
        let albums = useFirestore('albums').docs;
        renderComp = <AlbumsList albums={albums} />
    }
    else {
        const images = useFirestore(`albums/${albumId}/images`).docs;
        renderComp = <ImagesList images={images} />
    }

    return (
        <OtherLayout>
            <main style={{marginTop: '120px'}}>
                <section className="taraana-gallery-page bg-fill-1" style={{paddingTop: '40px'}}>
                    <div className="container">
                        <h2 className="t-h1 text-left text-lg-center">{(album ? album.name : "Gallery")}</h2>
                        {album ? (
                            <p className="text-lg-center">{album.description}</p>
                        ) : null}
                        {renderComp}
                    </div>
                </section>
            </main>
        </OtherLayout>
  )
}
