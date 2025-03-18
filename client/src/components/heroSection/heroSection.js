import "./heroSection.css";
import cta from '../../asset/images/cta.svg';

const HeroSection = () => {
    return (
        <section id="#" className="hero">
            <h1 className="hero__title"><span className="hero__brand">HireSense</span> - your career toolkit</h1>
            <p className="hero__subtitle">Optimize and target your resume</p>
            <div className="hero__cta">
                <a href="#begin-block">
                    <p>Let`s try it</p>
                    <img src={cta} alt="cta"/>
                </a>
            </div>
            <div className="background-circles">
                <span className="background-circle__1"></span>
                <span className="background-circle__2"></span>
                <span className="background-circle__3"></span>
                <span className="background-circle__4"></span>
                <span className="background-circle__5"></span>
                <span className="background-circle__6"></span>
            </div>
        </section>

    );
}

export default HeroSection;