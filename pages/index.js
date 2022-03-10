import React, {useEffect} from 'react';
import Link from 'next/link';
import EnquiryForm from '../comps/enquiryForm';
import ContactInfo from '../comps/contactInfo';
import Courses from '../comps/courses';
import Events from '../comps/events/upcomingEvents';
import Purpose from '../comps/purpose';
import Faculty from '../comps/faculty';
import Gallery from '../comps/gallery/galleryComp';
import HomeLayout from '../layouts/homeLayout';

export default function Index() {
    return (
        <HomeLayout>
            <main>
                <section className="taraana-intro animate-slide bg-fill-1" style={{paddingTop: '40px'}}>
                <div className="d-flex flex-column-reverse flex-lg-row container">
                    <div className="text-section mt-lg-5">
                        <h2 className="animation-heading t-h2 sp-margin-right">
                            The only studio dedicated solely for the practice of Kathak, Hindustani Vocals, and Yoga in the heart of Chennai city.
                        </h2>
                        <p className="animation-para">
                            Taraana Academy Of Kathak is a Chennai based institute that provides training in Kathak. Built on an aim to promote ‘Shudh’(pure) Kathak in a social and educational context, Taraana Academy strives to develop a systematic dance training programme.
                        </p>
                        <div className="animation-para taraana-home-cta d-flex flex-column flex-md-row pt-2"> <a href="#courses" className="taraana-btn mr-md-4 mb-3 mb-md-0">Courses</a> <a href="#contact" className="taraana-btn">Contact</a> </div>
                    </div>
                    <div className="animation-image img-section text-center mt-lg-4"><img style={{maxWidth: '93%'}} src="./assets/images/hero1.png" alt="girl dancing image" className="img-fluid" /></div>
                </div>
                <div id="about" className="nav-scroller"></div>
                </section>
                <section className="taraana-history animate-slide bg-fill-2">
                <div className=" d-flex flex-column-reverse flex-lg-row container">
                    <div className="img-section text-center"><img src="./assets/images/hero3.png" alt="girl dancing image" className="img-fluid leader-img" /></div>
                    <div className="text-section">
                        <div className="about-badge-cont sp-margin-left"><span className="about-badge">About Taraana Academy</span></div>
                        <h2 className="t-h2 sp-margin-left">At Taraana, we strongly believe that a strong dancer is created in the <span className="head-highlight">studio</span>  and a star performer is born <span className="head-highlight">onstage</span>.</h2>
                        <p>Taraana was founded in 2015 by Kathak danseuse – Shritha Baskar , along with her mother– Vasantha Baskar. A joint vision – Taraana Academy – was born out of a Skype conversation with the rest of the family.</p>
                        <p>Taraana has evolved into a premier Kathak Academy catering to over students of differing backgrounds ages ranging from 6 to 60.</p>
                        <p>A Kathak academy in Chennai that focuses on classical dance as a form of therapy; Taraana also facilitates Yoga for Dance and Hindustani Music sessions. Through regular classes, workshops, and events we make training in Kathak available to all keen learners in the city.</p>
                    </div>
                </div>
                <div id="founder-about" className="nav-scroller"></div>
                </section>
                <section className="taraana-shritha-bio bg-fill-1">
                <div className="d-flex flex-column flex-lg-row container">
                    <div className="text-section">
                        <div className="about-badge-cont"><span className="about-badge">About the Founder</span></div>
                        <h2 className="t-h2 sp-margin-right">Shritha currently trains under the guidance of <span className="head-highlight">Guru Smt. Nayantara Parpia</span> (disciple of Smt. Yogini Gandhi and Pt. Birju Maharaj).</h2>
                        <p>Shritha Baskar is a Kathak danseuse born and brought up in Dubai. She began training at the age of five under Guru Smt. Ketaki Hazra, a disciple of Smt. Bela Arnab. Being trained in the Jaipur and Lucknow Gharana of Kathak, Shritha earned herself a Senior Diploma in Kathak Dance from the Surabharati Sangeet Parishad, Kolkata, at the age of seventeen.</p>
                        <p>She has several performances to her credit, including regular recitals for the Diplomatic Corps, the Indian Embassy of various countries and the Festival of India around regions of the Arabian Gulf.</p>
                        <p>Shritha simultaneously took pleasure in teaching Kathak and semi classical dance to the students of the ‘Dubai Centre for Special Needs’ and ‘Special Needs Families’. Her work with the differently-abled has gained her many more accolades in the United Arab Emirates.</p>
                        <p>Moving to Chennai in 2011 only made it more opportune for Shritha to regularly attend workshops conducted by Pandit Birju Maharaj and Vidushi Saswati Sen and many other senior dancers. Adept in both Nrtta and Abhinaya, Shritha’s performances have been well lauded.</p>
                    </div>
                    <div className="img-section text-center"><img src="./assets/images/hero2.png" alt="expressive girl image" className="img-fluid leader-img" /></div>
                </div>
                <div id="courses" className="nav-scroller"></div>
                </section>
                <section className="taraana-courses bg-fill-2">
                    <div className="container">
                        <h2 className="t-h1 text-lg-center">Courses</h2>
                        <Courses />
                    </div>
                    <div id="faculty" className="nav-scroller"></div>
                </section>
                <section className="taraana-faculty bg-fill-1">
                    <div className="container">
                        <h2 className="t-h1 text-lg-center">Faculty</h2>
                        <Faculty />
                    </div>
                    <div id="faculty" className="nav-scroller"></div>
                </section>
                <section className="taraana-purpose bg-fill-2">
                    <div className="container">
                        <h2 className="t-h2 text-lg-center"><span className="head-highlight">Dance, Music and Yoga</span> can be used to:</h2>
                        <Purpose />
                        <div className="eligibility-cont text-center mt-5">
                            <h2 className="t-h2">Eligibility:</h2>
                            <p className="mx-auto mb-0">There is no restriction on maximum age. People of <span className="head-highlight"><b>5 years and more</b></span> can join these programmes. Beginners as well as those with some experience in Kathak can join these programmes.</p>
                            <div id="gallery" className="nav-scroller"></div>
                        </div>
                    </div>
                </section>
                {/* <section className="taraana-eligibility text-lg-center bg-fill-1">
                </section> */}
                <section className="taraana-gallery bg-fill-1">
                    <div className="container">
                        <h2 className="t-h1 text-left text-lg-center">Gallery</h2>
                        <Gallery />
                        <div id="events" className="nav-scroller"></div>
                    </div>
                </section>
                <section className="taraana-upcoming-event bg-fill-2">
                    <div className="container">
                        <h2 className="t-h1 text-lg-center">Upcoming Events</h2>
                        <Events />
                        <div className="nav-scroller" id="contact"></div>
                    </div>
                </section>
                <section className="taraana-getin-touch bg-fill-1">
                    <div className="container">
                        <h2 className="t-h1 text-lg-center">Get in touch</h2>
                        <div className="row justify-content-between flex-column-reverse flex-lg-row">
                            <div className="col-12 col-lg-6">
                                <ContactInfo />
                            </div>
                            <div className="col-12 col-lg-6 mb-5 mb-lg-0">
                                <EnquiryForm />
                            </div>
                        </div>
                    </div>
                </section>
                <section className="taraana-reach-us bg-fill-2">
                    <div className="container">
                        <h2 className="t-h2 text-lg-center">Reach us</h2>
                        <iframe className="mb-5" src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15545.922811956934!2d80.2382525!3d13.0686925!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xd6e6199dfa1945be!2sTaraana%20Academy%20Of%20Kathak!5e0!3m2!1sen!2sin!4v1635701629405!5m2!1sen!2sin" width="100%" style={{border:0}} allowFullScreen="" loading="lazy"></iframe>
                    </div>
                </section>
            </main>
        </HomeLayout>
    )
}
