import React, {useEffect} from 'react';
import { Row, Col, Button } from 'antd';
import Link from 'next/link';
import Head from 'next/head';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import EnquiryForm from '../comps/enquiryForm';
import ContactInfo from '../comps/contactInfo';
import Courses from '../comps/courses';
import Events from '../comps/events/allEvents';
import Purpose from '../comps/purpose';
import Faculty from '../comps/faculty';

var settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [{
        breakpoint: 1024,
        settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true
        }
    }, {
        breakpoint: 800,
        settings: {
            slidesToShow: 2,
            slidesToScroll: 2
        }
    }, {
        breakpoint: 480,
        settings: {
            slidesToShow: 1,
            slidesToScroll: 1
        }
    }]
};

export default function Index() {

    useEffect(function() {
        window.$ = window.jQuery = require('jquery');

        $(document).ready(function() {
            $('.animate-slide').addClass('animate-slided');
            $(".mobile-navigation").click(function() {
                $("#taraanaMobileNav").slideToggle(200);
                $(".mobile-nav-indicator").toggleClass("expanded");
            });
            $("#taraanaDesktopNav ul li").click(function() {
                $(this).addClass('activeNav');
                $(this).siblings().removeClass('activeNav');
            })
            $("#taraanaMobileNav ul li, .taraana").click(function() {
                $("#taraanaMobileNav").slideToggle(200);
                $(".mobile-nav-indicator").toggleClass("expanded")
                var mobileNavOption = $(this).find('a').text();
                $(".mobile-navigation span:first-child").text(mobileNavOption);
            });
            $(window).resize(function() {
                $("#taraanaMobileNav").hide();
            })
            var $item = $('#taraanaDesktopNav ul li, .taraana-home-cta');
            $item.on('click', 'a', function(event) {
                var $section = $($(this).attr('href'));
                var sectionTop = $section.offset().top;   
                $('html, body').stop().animate({scrollTop: sectionTop}, 1000);
                event.preventDefault();
            });
            $(window).scroll(function() {
                var $item = $('.taraana-navigation ul li');
                var scrollTop = $(this).scrollTop();
                $item.each(function() {
                    var $section = $($(this).find('a').attr('href'));
                    var sectionTop = $section.offset().top - 60;
                    var sectionHeight = $section.parent().height();
                    if (sectionTop <= scrollTop && (sectionTop + sectionHeight) > scrollTop) {
                        $(this).addClass('activeNav');
                        $(this).siblings().removeClass('activeNav');
                        var mobileScrollNavActive = $(this).find('a').text();
                    }
                });
            });
            $(window).scroll(function() {
                var $item = $('#taraanaMobileNav ul li');
                var scrollTop = $(this).scrollTop();
                $item.each(function() {
                    var $section = $($(this).find('a').attr('href'));                    
                    var sectionTop = $section.offset().top - 60;
                    var sectionHeight = $section.parent().height();
                    if (sectionTop <= scrollTop && (sectionTop + sectionHeight) > scrollTop) {
                        var mobileScrollNavActive = $(this).find('a').text();
                        $(".mobile-navigation span:first-child").text(mobileScrollNavActive);
                    }
                });
            });
        });
    }, []);

    return (
        <div>
            <Head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
                {/*<!-- Bootstrap CSS -->*/}
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css" integrity="sha384-B0vP5xmATw1+K9KRQjQERJvTumQW0nPEzvF6L/Z6nronJ3oUOFUFpCjEUQouq2+l" crossOrigin="anonymous" />
                <link rel="stylesheet" type="text/css" href="css/style.css" />

                <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
                <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-Piv4xVNRyMGpqkS2by6br4gNJ7DXjqk09RmUpJ8jgGtD7zP9yug3goQfGII0yAns" crossOrigin="anonymous"></script>
                <title>Taraana Landing Page</title>
            </Head>
            <div className="taraana-wrapper">
                <header className="fixed-top">
                    <div className="contact-strap py-2 d-none d-md-block">
                    <div className="container d-flex justify-content-end">
                        <div className="details d-flex align-items-center"><span className="mr-4">Call : +91 95000 81900, +91 7358438454</span>
                            <a href="https://www.instagram.com/taraanaacademy_kathak/" target="_blank" className="d-flex align-items-center"><img src="./assets/icons/instagram.png" className="mr-1" alt="instagram icon" /><span>@taraanaacademy_kathak</span></a>
                        </div>
                    </div>
                    </div>
                    <div className="container">
                    <nav className="d-flex justify-content-between mt-3 my-md-3 align-items-md-center flex-column flex-md-row">
                        <a className="taraana-logo" href="javascript:void(0);"><img src="./assets/images/taraana-logo.png" alt="Taraana logo" /></a>
                        <button type="button" aria-expanded="false" aria-label="Toggle navigation" className="d-flex d-md-none mobile-navigation justify-content-between align-items-center mt-2 my-md-2 py-3"><span>About</span><span className="mobile-nav-indicator">+</span></button>
                        <div className="taraana-navigation  d-none d-md-block" id="taraanaDesktopNav">
                            <ul className="list-group list-group-horizontal-md">
                                <li className="list-group-item"> <a href="#about">About</a> </li>
                                {/* <li className="list-group-item"> <a href="#bio">Bio</a> </li> */}
                                <li className="list-group-item"> <a href="#courses">Courses</a> </li>
                                <li className="list-group-item"> <a href="#faculty">Faculty</a> </li>
                                <li className="list-group-item"> <a href="#gallery">Gallery</a> </li>
                                <li className="list-group-item"> <a href="#events">Events</a> </li>
                                <li className="list-group-item pr-0"> <a href="#contact">Contact</a> </li>
                            </ul>
                        </div>
                        <div className="taraana-navigation" id="taraanaMobileNav">
                            <ul className="list-group list-group-horizontal-md">
                                <li className="list-group-item"> <a href="#about">About</a> </li>
                                {/* <li className="list-group-item"> <a href="#bio">Bio</a> </li> */}
                                <li className="list-group-item"> <a href="#courses">Courses</a> </li>
                                <li className="list-group-item"> <a href="#faculty">Faculty</a> </li>
                                <li className="list-group-item"> <a href="#gallery">Gallery</a> </li>
                                <li className="list-group-item"> <a href="#events">Events</a> </li>
                                <li className="list-group-item pr-0"> <a href="#contact">Contact</a> </li>
                            </ul>
                        </div>
                    </nav>
                    </div>
                </header>
                <main>
                    <section className="taraana-intro animate-slide bg-fill-1" style={{paddingTop: '40px'}}>
                    <div className="d-flex flex-column-reverse flex-lg-row container">
                        <div className="text-section mt-lg-5">
                            <h2 className="t-h2 sp-margin-right">
                                The only studio dedicated solely for the practice of Kathak, Hindustani Vocals, and Yoga in the heart of Chennai city.
                            </h2>
                            <p>
                                Taraana Academy Of Kathak is a Chennai based institute that provides training in Kathak. Built on an aim to promote ‘Shudh’(pure) Kathak in a social and educational context, Taraana Academy strives to develop a systematic dance training programme.
                            </p>
                            <div className="taraana-home-cta d-flex flex-column flex-md-row pt-2"> <a href="#courses" className="taraana-btn mr-md-4 mb-3 mb-md-0">Courses</a> <a href="#contact" className="taraana-btn">Contact</a> </div>
                        </div>
                        <div className="img-section text-center mt-lg-4"><img style={{maxWidth: '93%'}} src="./assets/images/hero1.png" alt="girl dancing image" className="img-fluid" /></div>
                    </div>
                    <div id="about" className="nav-scroller"></div>
                    </section>
                    <section className="taraana-history animate-slide bg-fill-2">
                    <div className=" d-flex flex-column-reverse flex-lg-row container">
                        <div className="img-section text-center"><img src="./assets/images/hero2.png" alt="girl dancing image" className="img-fluid leader-img" /></div>
                        <div className="text-section">
                            <div className="about-badge-cont sp-margin-left"><span className="about-badge">About Taraana Academy</span></div>
                            <h2 className="t-h2 sp-margin-left">At Taraana, we strongly believe that a strong dancer is created in the <span className="head-highlight">studio</span>  and a star performer is born <span className="head-highlight">onstage</span>.</h2>
                            <p>Taraana was founded in 2015 by Kathak danseuse – Shritha Baskar , along with her mother– Vasantha Baskar. A joint vision – Taraana Academy – was born out of a Skype conversation with the rest of the family.</p>
                            <p>Taraana has evolved into a premier Kathak Academy catering to over students of differing backgrounds ages ranging from 6 to 60.</p>
                            <p>A Kathak academy in Chennai that focuses on classical dance as a form of therapy; Taraana also facilitates Yoga for Dance and Hindustani Music sessions. Through regular classes, workshops, and events we make training in Kathak available to all keen learners in the city.</p>
                        </div>
                    </div>
                    {/* <div id="bio" className="nav-scroller"></div> */}
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
                        <div className="img-section text-center"><img src="./assets/images/hero3.png" alt="expressive girl image" className="img-fluid leader-img" /></div>
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
                            <div className="carousel-block position-relative">
                                <Slider className="gallery-slider" {...settings}>
                                    <div className="gallery-unit"> <img src="./assets/images/car-img1.jpg" /> </div>
                                    <div className="gallery-unit"> <img src="./assets/images/car-img2.jpg" /> </div>
                                    <div className="gallery-unit"> <img src="./assets/images/car-img3.jpg" /> </div>
                                    <div className="gallery-unit"> <img src="./assets/images/car-img4.jpg" /> </div>
                                    <div className="gallery-unit"> <img src="./assets/images/car-img5.jpg" /> </div>
                                </Slider>
                                <div className="position-absolute left-frame"><img src="./assets/icons/spotlogo/5.png" /></div>
                                <div className="position-absolute right-frame"><img src="./assets/icons/spotlogo/5.png" /></div>
                            </div>
                            <div id="events" className="nav-scroller"></div>
                        </div>
                    </section>
                    <section className="taraana-upcoming-event bg-fill-2">
                        <div className="container">
                            <h2 className="t-h1 head-highlight text-lg-center">Upcoming Events</h2>
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
            </div>
        </div>
    )
}
