import React, { useEffect } from "react";
import Head from 'next/head';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function HomeLayout({ children }) {

    const router = useRouter();
    console.log(router.route);

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
            var $item = $('#taraanaDesktopNav ul li, .taraana-home-cta, .taraana-faculty-ul');
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
                    var hrefVal = $(this).find('a').attr('href');
                    console.log(hrefVal);
                    if(hrefVal.startsWith('#')) {
                        var $section = $($(this).find('a').attr('href'));
                        var sectionTop = $section.offset().top - 60;
                        var sectionHeight = $section.parent().height();
                        if (sectionTop <= scrollTop && (sectionTop + sectionHeight) > scrollTop) {
                            $(this).addClass('activeNav');
                            $(this).siblings().removeClass('activeNav');
                            var mobileScrollNavActive = $(this).find('a').text();
                        }
                    }
                });
            });
            $(window).scroll(function() {
                var $item = $('#taraanaMobileNav ul li');
                var scrollTop = $(this).scrollTop();
                $item.each(function() {
                    var hrefVal = $(this).find('a').attr('href');
                    if(hrefVal.startsWith('#')) {
                        var $section = $($(this).find('a').attr('href'));                    
                        var sectionTop = $section.offset().top - 60;
                        var sectionHeight = $section.parent().height();
                        if (sectionTop <= scrollTop && (sectionTop + sectionHeight) > scrollTop) {
                            var mobileScrollNavActive = $(this).find('a').text();
                            $(".mobile-navigation span:first-child").text(mobileScrollNavActive);
                        }
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

                <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
                <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-Piv4xVNRyMGpqkS2by6br4gNJ7DXjqk09RmUpJ8jgGtD7zP9yug3goQfGII0yAns" crossOrigin="anonymous"></script>
                <title>Taraana Landing Page</title>
            </Head>
            <div className="taraana-wrapper">
                <header className="fixed-top">
                    <div className="contact-strap py-2 d-none d-md-block">
                    <div className="container d-flex justify-content-end">
                        <div className="details d-flex align-items-center"><span className="mr-4">Call : +91 95000 81900, +91 7358438454</span>
                            <a href="https://www.instagram.com/taraanaacademy_kathak/" target="_blank" className="d-flex align-items-center"><img src="../assets/icons/instagram.png" className="mr-1" alt="instagram icon" /><span>@taraanaacademy_kathak</span></a>
                        </div>
                    </div>
                    </div>
                    <div className="container">
                    <nav className="d-flex justify-content-between mt-3 my-md-3 align-items-md-center flex-column flex-md-row">
                        <Link href="/"><a className="taraana-logo"><img src="../assets/images/taraana-logo.png" alt="Taraana logo" /></a></Link>
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
                {children}
            </div>
        </div>
    );
}
