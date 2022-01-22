import React, {useEffect} from 'react';
import { Row, Col, Button } from 'antd';
import Link from 'next/link';
import Head from 'next/head';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Contact from './contact';

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
            $("#taraanaMobileNav ul li").click(function() {
                $("#taraanaMobileNav").slideToggle(200);
                $(".mobile-nav-indicator").toggleClass("expanded")
                var mobileNavOption = $(this).find('a').text();
                $(".mobile-navigation span:first-child").text(mobileNavOption);
            });
            $(window).resize(function() {
                $("#taraanaMobileNav").hide();
            })
            var $item = $('#taraanaDesktopNav ul li');
            $item.on('click', 'a', function(event) {
            var $section = $($(this).attr('href'));
            var sectionTop = $section.offset().top;   
            $('html, body').stop().animate({scrollTop: sectionTop}, 1500);
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
                <meta charset="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
                {/*<!-- Bootstrap CSS -->*/}
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css" integrity="sha384-B0vP5xmATw1+K9KRQjQERJvTumQW0nPEzvF6L/Z6nronJ3oUOFUFpCjEUQouq2+l" crossorigin="anonymous" />
                <link rel="stylesheet" type="text/css" href="css/style.css" />

                <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
                <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-Piv4xVNRyMGpqkS2by6br4gNJ7DXjqk09RmUpJ8jgGtD7zP9yug3goQfGII0yAns" crossorigin="anonymous"></script>
                <title>Taraana Landing Page</title>
            </Head>
            <div class="taraana-wrapper">
                <header class="fixed-top">
                    <div class="contact-strap py-2 d-none d-md-block">
                    <div class="container d-flex justify-content-end">
                        <div class="details d-flex align-items-center"><span class="mr-4">Call : +91 95000 81900,+91 7358438454</span>
                            <a href="https://www.instagram.com/taraanaacademy_kathak/" target="_blank" class="d-flex align-items-center"><img src="./assets/icons/instagram.png" class="mr-1" alt="instagram icon" /><span>@taraanaacademy_kathak</span></a>
                        </div>
                    </div>
                    </div>
                    <div class="container">
                    <nav class="d-flex justify-content-between mt-3 my-md-3 align-items-md-center flex-column flex-md-row">
                        <a class="taraana-logo" href="javascript:void(0);"><img src="./assets/images/taraana-logo.png" alt="Taraana logo" /></a>
                        <button type="button" aria-expanded="false" aria-label="Toggle navigation" class="d-flex d-md-none mobile-navigation justify-content-between align-items-center mt-2 my-md-2 py-3"><span>About</span><span class="mobile-nav-indicator">+</span></button>
                        <div class="taraana-navigation  d-none d-md-block" id="taraanaDesktopNav">
                            <ul class="list-group list-group-horizontal-md">
                                <li class="list-group-item"> <a href="#about">About</a> </li>
                                <li class="list-group-item"> <a href="#bio">Bio</a> </li>
                                <li class="list-group-item"> <a href="#courses">Courses</a> </li>
                                <li class="list-group-item"> <a href="#gallery">Gallery</a> </li>
                                <li class="list-group-item"> <a href="#events">Events</a> </li>
                                <li class="list-group-item pr-0"> <a href="#contact">Contact</a> </li>
                            </ul>
                        </div>
                        <div class="taraana-navigation" id="taraanaMobileNav">
                            <ul class="list-group list-group-horizontal-md">
                                <li class="list-group-item"> <a href="#about">About</a> </li>
                                <li class="list-group-item"> <a href="#bio">Bio</a> </li>
                                <li class="list-group-item"> <a href="#courses">Courses</a> </li>
                                <li class="list-group-item"> <a href="#gallery">Gallery</a> </li>
                                <li class="list-group-item"> <a href="#events">Events</a> </li>
                                <li class="list-group-item pr-0"> <a href="#contact">Contact</a> </li>
                            </ul>
                        </div>
                    </nav>
                    </div>
                </header>
                <main class="container">
                    <section class="taraana-intro animate-slide">
                    <div class="d-flex flex-column-reverse flex-lg-row">
                        <div class="text-section mt-lg-5">
                            <p>Taraana Academy Of Kathak, a Chennai based organization works towards insinuating the practice,understanding and appreciation of Kathak</p>
                            <p>Built on an aim to promote this classical dance form in a social and educational context, Taraana strives to develop a systematic and structural dance and educational training programme under the direction of Shritha Baskar, a Kathak danceuse and the founder of Taraana Academy.</p>
                            <p>Training sessions in traditional ‘Shudh’ Kathak are held by Taraana Academy at the heart Chennai city at a state of the art studio dedicated solely for the practice of Kathak, Hindustani Vocals, and Yoga.</p>
                            <div class="d-flex flex-column flex-md-row pt-2"> <a href="" class="taraana-btn mr-md-4 mb-3 mb-md-0">Courses</a> <a href="" class="taraana-btn">Contact</a> </div>
                        </div>
                        <div class="img-section text-center"><img src="./assets/images/hero1.png" alt="girl dancing image" class="img-fluid" /></div>
                    </div>
                    <div id="about" class="nav-scroller"></div>
                    </section>
                    <section class="taraana-history animate-slide">
                    <div class=" d-flex flex-column-reverse flex-lg-row">
                        <div class="img-section text-center"><img src="./assets/images/hero2.png" alt="girl dancing image" class="img-fluid leader-img" /></div>
                        <div class="text-section">
                            <h2 className="t-h2 sp-margin-left">At Taraana, we strongly believe, that a strong dancer is created in the <span class="head-highlight">studio</span> and star performer is born <span class="head-highlight">onstage</span>.</h2>
                            <p>Taraana was founded in 2015 by artistic director and Kathak danceuse Shritha Baskar , along with her mother – Vasantha Baskar. A joint vision Taraana Academy was born out of a Skype conversation with the rest of the family.</p>
                            <p>Taraana has evolved into a premier Kathak Academy catering to over students of differing backgrounds ages ranging from 6 to 60. The academy offers 40 group lessons a week in our state of the art studio in Nungambakkam, Chennai.</p>
                            <p>Taraana Academy is commited to including differently abled or the under privileged persons in our student population. It is one of the few Kathak academies in Chennai to focus on classical dance as a form of therapy and facilitates Yoga for Dance and Hindustani Music sessions. Through training sessions, workshops and events, we are trying to build a discerning network of art-lovers in Chennai ; making training in Kathak available to ALL keen learners in the city.</p>
                        </div>
                    </div>
                    <div id="bio" class="nav-scroller"></div>
                    </section>
                    <section class="taraana-shritha-bio">
                    <div class="d-flex flex-column flex-lg-row">
                        <div class="text-section">
                            <h2 class="t-h2 sp-margin-right">Shritha currently continues to be under the <span class="head-highlight">guidance</span> of Guru Smt. Nayantara Parpia (disciple of Smt. Yogini Gandhi and Pt. Birju Maharaj)</h2>
                            <p>Shritha Baskar is a Kathak danseuse born and brought up in Dubai. She began training at the tender age of five under Guru Smt. Ketaki Hazra, who herself is a disciple of Smt. Bela Arnab. Being trained in the Jaipur and Lucknow Gharana of Kathak, Shritha had earned herself a Senior Diploma in Kathak Dance from the Surabharati Sangeet Parishad, Kolkata, at the age of seventeen.</p>
                            <p>She has several performances to her credit which include regular recitals for the Diplomatic Corps, the Indian Embassy of various countries and the Festival of India around regions of the Arabian Gulf.</p>
                            <p>In addition to her regular performances and schooling, Shritha simultaneously took pleasure in teaching Kathak and semi classical dance to the students of the ‘Dubai Centre for Special Needs’ and ‘Special Needs Families’ for three consecutive summers. Her work with the differently-abled has gained her many more accolades in the United Arab Emirates.</p>
                            <p>Moving to Chennai in 2011 only made it more opportune for Shritha to regularly attend workshops conducted by Pandit Birju Maharaj and Vidushi Saswati Sen and many other senior dancers. Performing for the annual Indo-Korea trade meet is just one of her many performances in Chennai. Adept in both Nritya and Abhinaya, Shritha’s performances have been well lauded.</p>
                        </div>
                        <div class="img-section text-center"><img src="./assets/images/hero3.png" alt="expressive girl image" class="img-fluid leader-img" /></div>
                    </div>
                    <div id="courses" class="nav-scroller"></div>
                    </section>
                    <section class="taraana-courses">
                    <h2 class="t-h2 text-lg-center">Courses at Taraana</h2>
                    <ul class="pl-0 mx-auto">
                        <li class="d-flex flex-column flex-lg-row align-items-lg-center">
                            <div class="img-section mr-lg-5"><img src="./assets/icons/spotlogo/1.png" alt="course-image" class="img-fluid" /></div>
                            <div class="desc-section">
                                <h3>Kathak:</h3>
                                <p>Taraana offers dance programmes from a wider perspective; personalised dance training according the needs of its students. Classes are undertaken by Shritha Baskar and assistant teachers who have over 6 years of training under Shritha Baskar herself. We also offer intensive one-on-one training sessions to focus on the students’ individual requirements.</p>
                            </div>
                        </li>
                        <li class="d-flex flex-column flex-lg-row align-items-lg-center">
                            <div class="img-section mr-lg-5"><img src="./assets/icons/spotlogo/2.png" alt="course-image" class="img-fluid" /></div>
                            <div class="desc-section">
                                <h3>Hindustani Vocal Music:</h3>
                                <p>Since Hindustani Music and Kathak work hand-in-hand, Hindustani vocal courses are available at Taraana too under some of the best teachers and Hindustani vocalists in the city.</p>
                            </div>
                        </li>
                        <li class="d-flex flex-column flex-lg-row align-items-lg-center">
                            <div class="img-section mr-lg-5"><img src="./assets/icons/spotlogo/3.png" alt="course-image" class="img-fluid" /></div>
                            <div class="desc-section">
                                <h3>Tabla/Sitar:</h3>
                                <p>Taraana Academy believes in wholistic learning. We not only regularly conduct workshops on Hindustani instruments but we also offer one on one classes for Tabla and Sitar based on request.</p>
                            </div>
                        </li>
                        <li class="d-flex flex-column flex-lg-row align-items-lg-center">
                            <div class="img-section mr-lg-5"><img src="./assets/icons/spotlogo/4.png" alt="course-image" class="img-fluid" /></div>
                            <div class="desc-section">
                                <h3>Yoga:</h3>
                                <p class="mb-0">Yoga for dance specifically is an integral part of our classes here at Taraana but besides that we do have yoga courses for those who may be interested in it.</p>
                            </div>
                        </li>
                    </ul>
                    </section>
                    <section class="taraana-purpose">
                    <h2 class="t-h2 text-lg-center"><span class="head-highlight">Dance, Music and Yoga</span> can be used to:</h2>
                    <div class="row flex-column-reverse flex-lg-row">
                        <div class="col-12 col-lg-6  text-center"><img src="./assets/images/hero4.png" alt="tabla image" class="img-fluid leader-img" /></div>
                        <div class="col-12 col-lg-6">
                            <ul class="pl-0">
                                <li>Improve body language</li>
                                <li>Destress</li>
                                <li>Develop flexibility</li>
                                <li>Improve posture and alignment of body.</li>
                                <li>Understand the proper execution of Laya and Taal.</li>
                                <li>Perform on stage in front of audiences; building confidence and self expression.</li>
                                <li>Details on any of these classes can be attained upon a visit to the studio, via email or phone.</li>
                            </ul>
                        </div>
                    </div>
                    </section>
                    <section class="taraana-eligibility text-lg-center">
                    <h2 className="t-h2">Eligibility:</h2>
                    <p class="mx-auto mb-0">There is no restriction on maximum age. People of 5 years and more can join these programmes. Similarly, we don’t put conditions like prior knowledge of dance. Beginners as well as those with some experience in Kathak can join these programmes.</p>
                    <div id="gallery" class="nav-scroller"></div>
                    </section>
                    <section class="taraana-gallery">
                    <h2 class="t-h2 text-left text-lg-center">Gallery</h2>
                    <div class="carousel-block position-relative">
                        <Slider className="gallery-slider" {...settings}>
                            <div class="gallery-unit"> <img src="./assets/images/car-img1.jpg" /> </div>
                            <div class="gallery-unit"> <img src="./assets/images/car-img2.jpg" /> </div>
                            <div class="gallery-unit"> <img src="./assets/images/car-img3.jpg" /> </div>
                            <div class="gallery-unit"> <img src="./assets/images/car-img4.jpg" /> </div>
                            <div class="gallery-unit"> <img src="./assets/images/car-img5.jpg" /> </div>
                        </Slider>
                        <div class="position-absolute left-frame"><img src="./assets/icons/spotlogo/5.png" /></div>
                        <div class="position-absolute right-frame"><img src="./assets/icons/spotlogo/5.png" /></div>
                    </div>
                    <div id="events" class="nav-scroller"></div>
                    </section>
                    <section class="taraana-upcoming-event">
                    <h2 class="t-h2 head-highlight text-lg-center">Upcoming Event</h2>
                    <div class="row align-items-center">
                        <div class="col-12 col-lg-7 d-flex flex-column">
                            <div class="row align-items-center mb-3">
                                <div class="col-12 col-md-2">
                                <p class="circle-text mx-lg-auto"><span class="w-50">18 Aug</span></p>
                                </div>
                                <div class="col-12 col-md-10 event-bottom-border">
                                <h3>Bawara Mann Workshop</h3>
                                <p>Taraana offers dance programmes from a wider perspective; personalised dance training according the needs of its students. </p>
                                </div>
                            </div>
                            <div class="row align-items-center mb-3">
                                <div class="col-12 col-md-2">
                                <p class="circle-text mx-lg-auto" style={{backgroundColor: '#CAA35E'}}><span class="w-50">22 Oct</span></p>
                                </div>
                                <div class="col-12 col-md-10 event-bottom-border">
                                <h3>Antarang 2021</h3>
                                <p>Taraana offers dance programmes from a wider perspective; personalised dance training according the needs of its students. </p>
                                </div>
                            </div>
                            <div class="row align-items-center mb-3">
                                <div class="col-12 col-md-2">
                                <p class="circle-text mx-lg-auto" style={{backgroundColor: '#7FA39C'}}><span class="w-50">30 Nov</span></p>
                                </div>
                                <div class="col-12 col-md-10">
                                <h3>Insta live session - Dance history</h3>
                                <p>Taraana offers dance programmes from a wider perspective; personalised dance training according the needs of its students. </p>
                                </div>
                            </div>
                        </div>
                        <div class="col-12 col-lg-5"><img src="./assets/images/hero5.png" alt="dancing girl image" class="img-fluid leader-img" /></div>
                    </div>
                    <div class="nav-scroller" id="contact"></div>
                    </section>
                    <section class="taraana-getin-touch">
                    <h2 class="t-h2 text-lg-center">Get in touch</h2>
                    <div class="row justify-content-between flex-column-reverse flex-lg-row">
                        <div class="col-12 col-lg-6">
                            {/* <form>
                                <div class="form-group">
                                <input type="text" class="form-control" id="taraanaInputName" aria-describedby="Name" placeholder="Name" /> 
                                </div>
                                <div class="form-group">
                                <input type="email" class="form-control" id="taraanaInputEmail" aria-describedby="Email" placeholder="Email" /> 
                                </div>
                                <div class="form-group">
                                <input type="text" class="form-control" id="taraanaInputNumber" aria-describedby="phone number" placeholder="Number" /> 
                                </div>
                                <div class="form-group mb-4">
                                <textarea class="form-control" id="taraanaInputMessage" rows="3" placeholder="Message"></textarea>
                                </div>
                                <button type="submit" class="form-submit border-0 float-right mt-2">Submit</button>
                            </form> */}
                            <Contact />
                        </div>
                        <div class="col-12 col-lg-5 mb-5 mb-lg-0">
                            <div class="contact-detail d-flex flex-row flex-md-row align-items-center align-items-md-normal mb-3">
                                <img src="./assets/icons/location.png" alt="location icon" class="img-fluid" />
                                <p>Shenstone Park, No : 7,Harrington Road,
                                <br/> Chetpet (Lady Andal Gate 4)
                                <br/>Chennai - 600031
                                </p>
                            </div>
                            <div class="contact-detail d-flex flex-row flex-md-row align-items-center align-items-md-normal mb-3">
                                <img src="./assets/icons/call.png" alt="phone icon" class="img-fluid" />
                                <p>Tel: <a href="tel:04443129199"> 044- 4312 9199</a>
                                <br/>Mobile: <a href="tel:+91 95000 81900">+91 95000 81900</a>, <a href="tel:+91 7358438454">+91 7358438454</a>
                                </p>
                            </div>
                            <div class="contact-detail d-flex flex-row flex-md-row align-items-center align-items-md-normal mb-3">
                                <img src="./assets/icons/message.png" alt="mail icon" class="img-fluid" />
                                <p><a href="mailto:contact@taraanaacademy.in">contact@taraanaacademy.in</a></p>
                            </div>
                            <div class="contact-detail d-flex flex-row flex-md-row align-items-center align-items-md-normal mb-3">
                                <img src="./assets/icons/instagram.png" alt="instagram icon" class="img-fluid" />
                                <p><a href="https://www.instagram.com/taraanaacademy_kathak/" target="_blank">@taraanaacademy_kathak</a></p>
                            </div>
                            <div class="contact-detail d-flex flex-row flex-md-row align-items-center align-items-md-normal mb-3">
                                <img src="./assets/icons/facebook.png" alt="facebook icon" class="img-fluid" />
                                <p class="mb-0"><a href="https://www.facebook.com/TaraanaAcademyOfKathak" target="_blank">@TaraanaAcademyOfKathak</a></p>
                            </div>
                        </div>
                    </div>
                    </section>
                    <section class="taraana-reach-us">
                    <h2 class="t-h2 text-lg-center">Reach us</h2>
                    <iframe class="mb-5" src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15545.922811956934!2d80.2382525!3d13.0686925!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xd6e6199dfa1945be!2sTaraana%20Academy%20Of%20Kathak!5e0!3m2!1sen!2sin!4v1635701629405!5m2!1sen!2sin" width="100%" style={{border:0}} allowfullscreen="" loading="lazy"></iframe>
                    </section>
                </main>
            </div>
        </div>
    )
}
