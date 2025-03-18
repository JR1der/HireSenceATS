import './beginBlock.css';
import editIcon from "../../asset/images/edit-icon.svg"
import BeginForm from '../beginForm/beginForm.js';
import {useState} from 'react';
import MainForm from "../mainForm/mainForm.js";

const BeginBlock = () => {
    const [active, setActive] = useState(null);
    const [atsData, setAtsData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleClick = (index) => {
        setActive(active === index ? null : index);
    }

    const handleSubmit = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch("http://127.0.0.1:8000/api/get-result/", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            if (!response.ok) {
                throw new Error("Failed to fetch ATS score");
            }
            const data = await response.json();
            setAtsData(data);
        } catch (err) {
            setError(err.message);
        }
        setLoading(false);
    };

    return (
        <section id="begin-block" className="lets-begin">
            <div className="lets-begin__title">
                <h2>Let`s begin</h2>
            </div>
            <div className="lets-begin__steps">
                <div className="lets-begin__step">
                    <div className="lets-begin__step-content">
                        <div className="lets-begin__step-number"><span>1</span></div>
                        <p className="lets-begin__step-title">Job description</p>
                        <div className="lets-begin__step-edit" onClick={() => handleClick(1)}>
                            <img src={editIcon} alt="edit-icon"/>
                            <span>edit</span>
                        </div>
                    </div>
                    <div className={`lets-begin__form ${active === 1 ? 'show' : 'hidden'}`}>
                        <MainForm />
                    </div>
                </div>
                <hr className='stepDecorationLine'/>
                <div className="lets-begin__step">
                    <div className="lets-begin__step-content">
                        <div className="lets-begin__step-number"><span>2</span></div>
                        <p className="lets-begin__step-title">Your resume</p>
                        <div className="lets-begin__step-edit" onClick={() => handleClick(2)}>
                            <img src={editIcon} alt="edit-icon"/>
                            <span>edit</span>
                        </div>
                    </div>
                    <div className={`lets-begin__form ${active === 2 ? 'show' : 'hidden'}`}>
                        <BeginForm />
                    </div>
                </div>
            </div>
            <div className="lets-begin__submit-container">
                <button className="lets-begin__submit-button" onClick={handleSubmit}>
                    <div className="button-diamond">
                        <span>{loading ? "Loading..." : "Test Your ATS Score"}</span>
                    </div>
                </button>
            </div>

            {/* Display results when data is available */}
            {error && <p className="error-message">{error}</p>}
            {atsData && (
                <div className="ats-results">
                    <h3 className="ats-score">ATS Score: <span>{atsData.ats_score}%</span></h3>

                    <div className="skills-container">
                        <div className="skills-section">
                            <h4>Required Skills</h4>
                            <ul>
                                {atsData.required_skills.map((skill, index) => (
                                    <li key={index}>{skill}</li>
                                ))}
                            </ul>
                        </div>
                        <div className="skills-section">
                            <h4>Your CV Skills</h4>
                            <ul>
                                {atsData.cv_skills.map((skill, index) => (
                                    <li key={index}>{skill}</li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="improvements">
                        <h4>Improvements & Recommendations</h4>
                        <ul>
                            {atsData.improvements.map((improvement, index) => (
                                <li key={index}>{improvement}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </section>
    );
}
export default BeginBlock;