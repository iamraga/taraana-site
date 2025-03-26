import OtherLayout from "../layouts/otherLayout";

export default function Exams() {

    return (
        <OtherLayout title="Examinations - Taraana Academy of Kathak">
            <main>
                <section className="taraana-all-events bg-fill-1" style={{paddingTop: '40px'}}>
                    <div className="container">
                        <div className="istd-logo-container">
                            <h2 className="t-h1 text-center text-lg-center" style={{marginBottom: '15px'}}>
                                <span><span className="head-highlight">Taraana academy</span> is affiliated to</span>
                            </h2>
                            <div id="istd-logo" className="istd-logo">
                                <a href="https://my.istd.org/home/" title="Imperial Society of Teachers of Dancing" target="_blank">
                                    <span className="emblem"></span>
                                    <span className="istd-title"></span>
                                </a>
                            </div>
                        </div>
                        <div className="mt-lg-5 taraana-exams">
                            <p>At Taraana Academy, we offer formal examinations for Kathak, that include practical dance, theory, and stage performance exams in affiliation with one of the world's leading dance examination boards - the Imperial Society Of Teachers Of Dance (ISTD). 
                                <a href="https://www.istd.org/home/" target="_blank"> Learn More about ISTD</a>.</p>
                            <p>
                            This provides an opportunity for all students of Taraana Academy to follow an academic career in Kathak and pursue a certification or a diploma course in Kathak. While it is not compulsory for our students to give examinations, we encourage students to do so.
                            </p>
                            <p>
                            These examinations offer the option for in-person sessions for students located in Chennai, India, or remote participation for those residing in other cities or engaging in online learning.
                            </p>
                            <p>
                            We conduct exams twice a year: <span className="head-highlight">April-May session and November-December session.</span> <br />The examination structure includes six grades up to the Intermediate Vocational Graded Examinations, with an additional two levels for those aiming to achieve the Advanced Levels.
                            </p>
                        </div>
                        
                    </div>
                </section>
            </main>
        </OtherLayout>
  )
}
