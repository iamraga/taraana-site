import React from 'react'

export default function Courses() {
    return (
        <>
            <ul className="taraana-courses-ul pl-0 mx-auto">
                <li className="taraana-courses-ul-item d-flex flex-column flex-lg-row align-items-lg-center">
                    <div className="img-section mr-lg-5"><img src="./assets/icons/spotlogo/1.png" alt="course-image" className="img-fluid" /></div>
                    <div className="desc-section">
                        <h3>Kathak:</h3>
                        <ul className="course-points-list">
                            <li>
                                Group classes for <b>all levels and age groups</b>
                            </li>
                            <li>
                                Personalized <b>one-on-one sessions</b>
                            </li>
                        </ul>
                    </div>
                </li>
                <li className="taraana-courses-ul-item d-flex flex-column flex-lg-row align-items-lg-center">
                    <div className="img-section mr-lg-5"><img src="./assets/icons/spotlogo/2.png" alt="course-image" className="img-fluid" /></div>
                    <div className="desc-section">
                        <h3>Hindustani Music:</h3>
                        <h4 className="head-highlight">Hindustani Vocal:</h4>
                        <ul className="course-points-list">
                            <li>
                                Group classes for <b>all levels and age groups</b>
                            </li>
                            <li>
                            Personalized <b>one-on-one sessions</b>
                            </li>
                        </ul>
                        <h4 className="head-highlight">Tabla/Sitar Classes:</h4>
                        <p>
                            We conduct workshops and offer one-on-one classes for Tabla and Sitar based on request. 
                        </p>
                    </div>
                </li>
                <li className="taraana-courses-ul-item d-flex flex-column flex-lg-row align-items-lg-center">
                    <div className="img-section mr-lg-5"><img src="./assets/icons/spotlogo/4.png" alt="course-image" className="img-fluid" /></div>
                    <div className="desc-section">
                        <h3>Yoga:</h3>
                        <p className="mb-0">Yoga for dance specifically is an integral part of our regular classes. In addition, we have yoga courses for those who may be interested.</p>
                    </div>
                </li>
            </ul>
        </>
    )
}
