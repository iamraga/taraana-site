import React from 'react';
import Moment from 'react-moment';

export default function AllEvents({ events }) {
    
    let upcomingEvents = events.filter(event => event.eventDate.seconds * 1000 >= new Date().getTime())
                            .sort((a,b) => a.eventDate - b.eventDate );
    let pastEvents = events.filter(event => event.eventDate.seconds * 1000 < new Date().getTime())
                        .sort((a,b) => b.eventDate - a.eventDate);
    let bgColor = 0;
    let upcomingEventsComp = upcomingEvents.length > 0 ? ( upcomingEvents.map(event => {
        bgColor++;
        let eventContainerCss = `circle-text mx-lg-auto event-bg-fill-${(bgColor % 3) + 1}`;
        let date = new Date(event.eventDate ? event.eventDate.seconds * 1000 : event.fromDate.seconds * 1000);
        let eventYear = date.getFullYear();
        let currentYear= new Date().getFullYear(); 
        let isDisplayYear = currentYear > eventYear;
        let dateClassNames = isDisplayYear ? "w-50 event-date-year" : "w-50";
        return (
            <div className="row align-items-center mb-3">
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
                        <span style={{fontFamily: 'Made-Dillan', fontSize: '20px'}}>Venue: </span>
                        <span style={{fontFamily: 'Merriweather', fontSize: '18px'}}>{event.venue}</span></div>
                    <p>{event.description}</p>
                    <p>{event.isPast}</p>
                </div>
            </div>
        );
    })
    ) : null;

    let pastEventsComp = (
        pastEvents.map(event => {
            bgColor++;
            let eventContainerCss = `circle-text mx-lg-auto event-bg-fill-${(bgColor % 3) + 1}`;
            let date = new Date(event.eventDate ? event.eventDate.seconds * 1000 : event.fromDate.seconds * 1000);
            let eventYear = date.getFullYear();
            let currentYear= new Date().getFullYear(); 
            let isDisplayYear = currentYear > eventYear;
            let dateClassNames = isDisplayYear ? "w-50 event-date-year" : "w-50";
            return (
                <div className="row align-items-center mb-3">
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
                            <span style={{fontFamily: 'Made-Dillan', fontSize: '20px'}}>Venue: </span>
                            <span style={{fontFamily: 'Merriweather', fontSize: '18px'}}>{event.venue}</span></div>
                        <p>{event.description}</p>
                        <p>{event.isPast}</p>
                    </div>
                </div>
            );
        })
    )
    
    return (
        <div>
            {(upcomingEventsComp) ? ( <div className="about-badge-cont" style={{margin: '40px 0px'}}>
                <span className="about-badge">Upcoming Events</span>
            </div>
            ) : null }
            {upcomingEventsComp}
            <div className="about-badge-cont" style={{margin: '40px 0px'}}>
                <span className="about-badge">Past Events</span>
            </div>
            {pastEventsComp}
        </div>
    )
}
