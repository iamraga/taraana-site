import React from 'react';
import useFirestore from '../../hooks/useFirestore';
import Link from 'next/link';
import Moment from 'react-moment';

export default function Events() {

    let events = useFirestore('events', 'eventDate').docs;
    
    let upcomingEvents = events.filter(event => event.eventDate.seconds * 1000 >= new Date().getTime())
                            .sort((a,b) => a.eventDate - b.eventDate );
    let bgColor = 0;
    let eventsToDisplay = [];
    let eventsElement;
    if(upcomingEvents && upcomingEvents.length > 0) {
        upcomingEvents.splice(3); //Getting only 3 upcoming events
        eventsToDisplay.push(...upcomingEvents);
    }
    if(eventsToDisplay.length < 3) {
        let pastEvents = events.filter(event => event.eventDate.seconds * 1000 < new Date().getTime())
        .sort((a,b) => b.eventDate - a.eventDate);

        pastEvents.splice(3 - eventsToDisplay.length); //Adding only remaining events from past
        pastEvents = pastEvents.map(eachEvent => {
            return {...eachEvent, isPast: true};
        });
        eventsToDisplay.push(...pastEvents);
    }
    eventsElement = eventsToDisplay.map(event => {
        bgColor++;
        let eventContainerCss = `circle-text mx-lg-auto event-bg-fill-${bgColor}`;
        let date = new Date(event.eventDate ? event.eventDate.seconds * 1000 : event.fromDate.seconds * 1000);
        let eventYear = date.getFullYear();
        let currentYear= new Date().getFullYear(); 
        let isDisplayYear = currentYear > eventYear;
        let dateClassNames = isDisplayYear ? "w-50 event-date-year" : "w-50";
        return (
            <div key={event.id} className="row align-items-center mb-3">
                <div className="col-12 col-md-2">
                <p className={eventContainerCss}>
                    <span className={dateClassNames}>
                        {(isDisplayYear) ? (
                            <Moment date={event.eventDate ? event.eventDate.seconds * 1000 : event.fromDate.seconds * 1000} format={"DD MMM 'YY"} />
                        ) : (
                            <Moment date={event.eventDate ? event.eventDate.seconds * 1000 : event.fromDate.seconds * 1000} format={'DD MMM'} />
                        )}
                    </span>
                </p>
                </div>
                <div className="col-12 col-md-10 event-bottom-border">
                    <h3>{event.name}</h3>
                    <div style={{marginBottom: '0.5rem'}}>
                        <div style={{display: 'flex', alignItems: 'center'}}>
                            <span style={{fontFamily: 'Made-Dillan', fontSize: '20px'}}>Venue: </span>
                            <span style={{fontFamily: 'Merriweather', fontSize: '18px', marginLeft: '0.5rem'}}>{event.venue}</span>
                            <a title="View on Google maps" href={event.venueUrl} className="img-fluid" style={{marginLeft: '0.5rem'}} target="_blank">
                                <img width={28} height={28} src="./assets/icons/google-map.png" alt="google maps icon" />
                            </a>
                        </div>
                    </div>
                    <div style={{marginBottom: '0.5rem'}}>
                        <span style={{fontFamily: 'Made-Dillan', fontSize: '20px'}}>Time: </span>
                        <span style={{fontFamily: 'Merriweather', fontSize: '18px'}}>{event.time}</span>
                    </div>
                    <p>{event.description}</p>
                    <p>{event.isPast}</p>
                </div>
            </div>
        );
    });
    return (
        <>
            <div className="row align-items-center">
                <div className="col-12 col-lg-7 d-flex flex-column">
                    {eventsElement}
                    <div className="view-all-events-cont">
                        <Link href="/events"><a className="taraana-btn">View all events</a></Link>
                    </div>
                </div>
                <div className="col-12 col-lg-5"><img src="./assets/images/hero5.png" alt="Events - Taraana Academy of Kathak" className="img-fluid leader-img" /></div>
            </div>
        </>
    )
}
