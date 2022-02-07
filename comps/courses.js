import React from 'react'

export default function Courses() {
    return (
        <>
            <ul class="taraana-courses-ul pl-0 mx-auto">
                <li class="taraana-courses-ul-item d-flex flex-column flex-lg-row align-items-lg-center">
                    <div class="img-section mr-lg-5"><img src="./assets/icons/spotlogo/1.png" alt="course-image" class="img-fluid" /></div>
                    <div class="desc-section">
                        <h3>Kathak:</h3>
                        <ul className="course-points-list">
                            <li>
                                Group classes for all levels and age groups
                            </li>
                            <li>
                                Personalized one-on-one sessions
                            </li>
                        </ul>
                    </div>
                </li>
                <li class="taraana-courses-ul-item d-flex flex-column flex-lg-row align-items-lg-center">
                    <div class="img-section mr-lg-5"><img src="./assets/icons/spotlogo/2.png" alt="course-image" class="img-fluid" /></div>
                    <div class="desc-section">
                        <h3>Hindustani Music:</h3>
                        <h4 className="head-highlight">Hindustani Vocal:</h4>
                        <ul className="course-points-list">
                            <li>
                                Group classes for all levels and age groups
                            </li>
                            <li>
                            Personalized one-on-one sessions
                            </li>
                        </ul>
                        <h4 className="head-highlight">Tabla/Sitar Classes:</h4>
                        <p>
                            We conduct workshops and offer one-on-one classes for Tabla and Sitar based on request. 
                        </p>
                    </div>
                </li>
                {/* <li class="taraana-courses-ul-item d-flex flex-column flex-lg-row align-items-lg-center">
                    <div class="img-section mr-lg-5"><img src="./assets/icons/spotlogo/3.png" alt="course-image" class="img-fluid" /></div>
                    <div class="desc-section">
                        <h3>Tabla/Sitar:</h3>
                        <p>Taraana Academy believes in wholistic learning. We not only regularly conduct workshops on Hindustani instruments but we also offer one on one classes for Tabla and Sitar based on request.</p>
                    </div>
                </li> */}
                <li class="taraana-courses-ul-item d-flex flex-column flex-lg-row align-items-lg-center">
                    <div class="img-section mr-lg-5"><img src="./assets/icons/spotlogo/4.png" alt="course-image" class="img-fluid" /></div>
                    <div class="desc-section">
                        <h3>Yoga:</h3>
                        <p class="mb-0">Yoga for dance specifically is an integral part of our regular classes. In addition, we have yoga courses for those who may be interested in it.</p>
                    </div>
                </li>
            </ul>
        </>
    )
}
