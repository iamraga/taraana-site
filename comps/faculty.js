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
                            Asmi has been learning kathak under the guidance of Shritha Baskar since 2016 and has attended several workshops conducted by Pt.Birju Maharaj, Smt. Durga Arya to name a few. 
                            Being one of the most senior dancers of the academy, Asmi also has been teaching students of Taraana Academy since 2020.
                        </p>
                    </div>
                </li>
                <li className="taraana-faculty-ul-item d-flex flex-column flex-lg-row align-items-lg-center">
                    <div className="faculty-dp faculty-kriteka mr-lg-5"></div>
                    <div className="desc-section">
                        <h3>Kriteka M. Iyer</h3>
                        <p className="mb-0">A disciple of Shri Waseem Ahmed Khan and Padmavibhushan Vidushi Dr Girija Devi ji, Kriteka Iyer has been learning since the age of 6. A Senior research scholar at ITC Sangeet Research Academy for 7 years, Kriteka is now a regular performer and a teacher of Hindustani Vocals.</p>
                    </div>
                </li>
            </ul>
        </>
  );
}
