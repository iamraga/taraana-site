import Gallery from "../comps/gallery/galleryComp";
import useFirestore from "../hooks/useFirestore";
import OtherLayout from "../layouts/otherLayout";

export default function GalleryPage() {

    let albums = useFirestore('albums').docs;
    albums = albums.filter(album => (album.id !== "album-order")); //Ignoring album-order entity

    return (
        <OtherLayout>
            <main>
                <section className="taraana-gallery bg-fill-1" style={{paddingTop: '40px'}}>
                    <div className="container">
                        <h2 className="t-h1 text-left text-lg-center">Gallery</h2>
                        <Gallery />
                    </div>
                </section>
            </main>
        </OtherLayout>
  )
}
