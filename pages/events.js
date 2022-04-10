import Link from "next/link";
import AllEvents from "../comps/events/allEvents";
import useFirestore from "../hooks/useFirestore";
import OtherLayout from "../layouts/otherLayout";

export default function Events() {

    let events = useFirestore('events').docs;

    return (
        <OtherLayout title="Events - Taraana Academy of Kathak">
            <main>
                <section className="taraana-all-events bg-fill-1" style={{paddingTop: '40px'}}>
                    <div className="container">
                        <div className="col-lg-2 col-12 d-inline-block" style={{padding: '0px'}}>
                            <Link href="/"><a className="taraana-back-btn taraana-btn">Back</a></Link>
                        </div>
                        <h2 className="col-8 d-inline-block taraana-back-btn-cont t-h1 text-left text-lg-center">
                            <span>All Events</span>
                        </h2>
                        <AllEvents events={events} />
                    </div>
                </section>
            </main>
        </OtherLayout>
  )
}
