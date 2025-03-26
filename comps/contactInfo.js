import React from 'react'

export default function ContactInfo() {
    return (
        <>
            <div className="contact-detail d-flex flex-row flex-md-row align-items-center align-items-md-normal mb-4">
                <img src="./assets/icons/location.png" alt="location icon" className="img-fluid" />
                <p className="mb-0">Shenstone Park, No : 7,Harrington Road,
                    <br/> Chetpet (Lady Andal Gate 4)
                    <br/>Chennai - 600031
                </p>
            </div>
            <div className="contact-detail d-flex flex-row flex-md-row align-items-center align-items-md-normal mb-4">
                <a href="tel:+91 95000 81900" className="img-fluid">
                    <img src="./assets/icons/call.png" alt="phone icon" />
                </a>
                <p className="mb-0">Mobile: <a href="tel:+91 95000 81900">+91 95000 81900</a>, <a href="tel:+91 7358438454">+91 7358438454</a>
                </p>
            </div>
            <div className="contact-detail d-flex flex-row flex-md-row align-items-center align-items-md-normal mb-4">
                <a href="mailto:contact@taraanaacademy.in">
                    <img src="./assets/icons/message.png" alt="mail icon" className="img-fluid" />
                </a>
                <p className="mb-0"><a href="mailto:contact@taraanaacademy.in">contact@taraanaacademy.in</a></p>
            </div>
            <div className="contact-detail d-flex flex-row flex-md-row align-items-center align-items-md-normal mb-4">
                <a href="https://www.instagram.com/taraanaacademy_kathak/" target="_blank">
                    <img src="./assets/icons/instagram.png" alt="instagram icon" className="img-fluid" />
                </a>
                <p className="mb-0"><a href="https://www.instagram.com/taraanaacademy_kathak/" target="_blank">@taraanaacademy_kathak</a></p>
            </div>
            <div className="contact-detail d-flex flex-row flex-md-row align-items-center align-items-md-normal mb-4">
                <a href="https://www.facebook.com/TaraanaAcademyOfKathak" target="_blank">
                    <img src="./assets/icons/facebook.png" alt="facebook icon" className="img-fluid" />
                </a>
                <p className="mb-0"><a href="https://www.facebook.com/TaraanaAcademyOfKathak" target="_blank">@TaraanaAcademyOfKathak</a></p>
            </div>
            <div className="contact-detail d-flex flex-row flex-md-row align-items-center align-items-md-normal mb-4">
                <a href="https://www.youtube.com/channel/UCsvugBIsm1DEr0j8ouTBR9g" target="_blank">
                    <img src="./assets/icons/youtube.png" alt="youtube icon" className="img-fluid" />
                </a>
                <p className="mb-0"><a href="https://www.youtube.com/channel/UCsvugBIsm1DEr0j8ouTBR9g" target="_blank">Taraana Academy of Kathak</a></p>
            </div>
        </>
    )
}
