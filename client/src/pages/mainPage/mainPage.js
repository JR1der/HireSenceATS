import {Component} from "react";
import Header from "../../components/header/header.js";
import HeroSection from "../../components/heroSection/heroSection.js";
import ResumeToolkit from "../../components/resumeTransfer/resumeToolkit.js";
import Footer from "../../components/footer/footer.js";
import SignForm from "../../components/signForm/signForm.js";
import BeginBlock from "../../components/beginBlock/beginBlock.js";

import "./mainPage.css";

class MainPage extends Component {
    render() {
        return (
            <>
                <div className="wrapper">
                    <Header></Header>
                    <div className="container">

                        {/* <SignForm signForm__title={"Login"} btnText={"Login"} btnClasses={'btn btn_inactive'}></SignForm> */}

                        <HeroSection></HeroSection>
                        <ResumeToolkit
                            title={"Get expert feedback on your resume, instantly"}
                            descr="Score My Resume scores your resume on key criteria recruiters and hiring managers look for. Upload your resume and in just 30 seconds, you'll get actionable steps to revamp your resume and land more interviews."
                            btnText={'Upload resume'}
                            btnClasses="btn btn_big">
                        </ResumeToolkit>
                        <ResumeToolkit
                            positionMod={"resumeToolkit_right"}
                            title={"Target your resume to a job, instantly"}
                            descr="Our free AI-powered platform analyzes the job description and identifies important keywords and skills missing from your resume. Learn how to tailor your resume to a specific job and land more interviews."
                            btnText={'Target your resume'}
                            btnClasses="btn btn_big">
                        </ResumeToolkit>

                        <BeginBlock></BeginBlock>
                        <Footer></Footer>
                    </div>
                </div>
            </>
        )
    }
}

export default MainPage;