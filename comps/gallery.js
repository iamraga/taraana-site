import Slider from "@ant-design/react-slick";
import React from "react";
import useFirestore from "../hooks/useFirestore";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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


export default function Gallery() {

    let albums = useFirestore('albums').docs;
    albums = albums.filter(album => (album.id !== "album-order")); //Ignoring album-order entity
    console.log(albums);

    return (
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
    );
}
