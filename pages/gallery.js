import { useRouter } from "next/router";
import AlbumsList from "../comps/gallery/albumsList";
import ImagesList from "../comps/gallery/imagesList";
import useFirestore from "../hooks/useFirestore";
import { firestore } from "../utils/firebase";
import { doc, getDoc } from "@firebase/firestore";
import OtherLayout from "../layouts/otherLayout";
import useFirestoreDoc from "../hooks/useFirestoreDoc";
import { useEffect, useState } from "react";
import Link from "next/link";

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
        <OtherLayout title="Gallery - Taraana Academy of Kathak">
            <main style={{marginTop: '120px'}}>
                <section className="taraana-gallery-page bg-fill-1" style={{paddingTop: '40px'}}>
                    <div className="container">
                        <div className="col-lg-2 col-12 d-inline-block" style={{padding: '0px'}}>
                            <Link href="/"><a className="taraana-back-btn taraana-btn">Back</a></Link>
                        </div>
                        <h2 className="col-8 d-inline-block taraana-back-btn-cont t-h1 text-left text-lg-center">
                            <span>{(album ? album.name : "Gallery")}</span>
                        </h2>
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
