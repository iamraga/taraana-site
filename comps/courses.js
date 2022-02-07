import React from 'react'

export default function Courses() {
    return (
        <>
            <ul class="pl-0 mx-auto">
                <li class="d-flex flex-column flex-lg-row align-items-lg-center">
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
        </>
    )
}
