import './resumeToolkit.css';
import Button from '../button/button.js';

const ResumeToolkit = ({ positionMod, title, descr, btnText, btnClasses }) => {
    return (
        <section id="about-us"  className={`resumeToolkit ${positionMod}`}>
            <div className="resumeToolkit__content">
                <h2 className="resumeToolkit__title">
                    {title}
                </h2>
                <p className='resumeToolkit__descr'>
                    {descr}
                </p>
                <Button text={btnText} className={btnClasses}></Button>
            </div>
        </section>
    );
}

export default ResumeToolkit;