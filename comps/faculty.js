import React from 'react';

export default function Faculty() {
  return (
        <>
            <ul className="taraana-faculty-ul pl-0 mx-auto">
                <li className="taraana-faculty-ul-item d-flex flex-column flex-lg-row align-items-lg-center">
                    <div className="faculty-dp faculty-shritha mr-lg-5"></div>
                    <div className="desc-section">
                        <h3>Shritha Baskar</h3>
                        <p className="mb-0">Shritha Baskar began her training at the age of five under Guru Smt. Ketaki Hazra, a disciple of Smt. Bela Arnab. Shritha earned herself a Senior Diploma in Kathak Dance from the Surabharati Sangeet Parishad, Kolkata, at the age of seventeen. <br />Read more about Shritha <a id="faculty-read-more" href="#founder-about">here</a>.</p>
                    </div>
                </li>
                <li className="taraana-faculty-ul-item d-flex flex-column flex-lg-row align-items-lg-center">
                    <div className="faculty-dp faculty-asmi mr-lg-5"></div>
                    <div className="desc-section">
                        <h3>Asmi Mehra</h3>
                        <p className="mb-0">
                            Asmi has been learning Kathak under the guidance of Shritha Baskar since 2016 and has attended several workshops conducted by Pt.Birju Maharaj, Smt. Durga Arya to name a few. 
                            Being one of the most senior dancers of the academy, Asmi also has been teaching students of Taraana Academy since 2020.
                        </p>
                    </div>
                </li>
                <li className="taraana-faculty-ul-item d-flex flex-column flex-lg-row align-items-lg-center">
                    <div className="faculty-dp faculty-dhanya mr-lg-5"></div>
                    <div className="desc-section">
                        <h3>Dhanya Krishnan</h3>
                        <p className="mb-0">
                        Dhanya has been receiving her training in Kathak from Shritha Baskar since 2017. She has also attended workshops conducted by Pt. Birju Maharaj, Smt. Saswati Sen, Smt. Durga Arya, and other notable Gurus. 
                        Besides teaching at Taraana, she also works as a Content Writer in an IT firm in Chennai. 
                        </p>
                    </div>
                </li>
            </ul>
        </>
  );
}
