import React from 'react';

export default function Faculty() {
  return (
        <>
            <ul className="taraana-courses-ul pl-0 mx-auto">
                <li className="taraana-courses-ul-item d-flex flex-column flex-lg-row align-items-lg-center">
                    <div className="img-section mr-lg-5"><img src="./assets/icons/spotlogo/1.png" alt="course-image" className="img-fluid" /></div>
                    <div className="desc-section">
                        <h3>Shritha Baskar</h3>
                        <p className="mb-0">She is guru</p>
                    </div>
                </li>
                <li className="taraana-courses-ul-item d-flex flex-column flex-lg-row align-items-lg-center">
                    <div className="img-section mr-lg-5"><img src="./assets/icons/spotlogo/2.png" alt="course-image" className="img-fluid" /></div>
                    <div className="desc-section">
                        <h3>Asmi Mehra</h3>
                        <p className="mb-0">
                            She is assistant teaching staff (ATS)
                        </p>
                    </div>
                </li>
                <li className="taraana-courses-ul-item d-flex flex-column flex-lg-row align-items-lg-center">
                    <div className="img-section mr-lg-5"><img src="./assets/icons/spotlogo/4.png" alt="course-image" className="img-fluid" /></div>
                    <div className="desc-section">
                        <h3>Kriteka</h3>
                        <p className="mb-0">Music guru</p>
                    </div>
                </li>
            </ul>
        </>
  );
}
