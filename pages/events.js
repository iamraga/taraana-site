import AllEvents from "../comps/events/allEvents";
import useFirestore from "../hooks/useFirestore";
import OtherLayout from "../layouts/otherLayout";

export default function Events() {

    let events = useFirestore('events').docs;

    return (
        <OtherLayout>
            <main>
                <section className="taraana-all-events bg-fill-1" style={{paddingTop: '40px'}}>
                    <div className="container">
                        <h2 className="t-h1 text-left text-lg-center">All Events</h2>
                        <AllEvents events={events} />
                    </div>
                </section>
            </main>
        </OtherLayout>
  )
}
