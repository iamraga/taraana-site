import React from 'react';
import useFirestore from '../../hooks/useFirestore';
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
        console.log(upcomingEvents);
        eventsToDisplay.push(...upcomingEvents);
        console.log('events', eventsToDisplay);
    }
    if(eventsToDisplay.length < 3) {
        let pastEvents = events.filter(event => event.eventDate.seconds * 1000 < new Date().getTime())
        .sort((a,b) => b.eventDate - a.eventDate);

        pastEvents.splice(3 - eventsToDisplay.length); //Adding only remaining events from past
        eventsToDisplay.push(...pastEvents);
    }
    console.log(eventsToDisplay);
    eventsElement = eventsToDisplay.map(event => {
        bgColor++;
        let eventContainerCss = `circle-text mx-lg-auto event-bg-fill-${bgColor}`;
        return (
            <div className="row align-items-center mb-3">
                <div className="col-12 col-md-2">
                <p className={eventContainerCss}>
                    <span className="w-50">
                        <Moment date={event.eventDate ? event.eventDate.seconds * 1000 : event.fromDate.seconds * 1000} format={'DD MMM'} />
                    </span>
                </p>
                </div>
                <div className="col-12 col-md-10 event-bottom-border">
                    <h3>{event.name}</h3>
                    <div style={{marginBottom: '0.5rem'}}>
                        <span style={{fontFamily: 'Made-Dillan', fontSize: '20px'}}>Venue: </span>
                        <span style={{fontFamily: 'Merriweather', fontSize: '18px'}}>{event.venue}</span></div>
                    <p>{event.description}</p>
                </div>
            </div>
        );
    });
    return (
        <>
            <div className="row align-items-center">
                <div className="col-12 col-lg-7 d-flex flex-column">
                    {eventsElement}
                </div>
                <div className="col-12 col-lg-5"><img src="./assets/images/hero5.png" alt="dancing girl image" className="img-fluid leader-img" /></div>
            </div>
        </>
    )
}
