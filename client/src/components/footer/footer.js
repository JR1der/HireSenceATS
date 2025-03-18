import "./footer.css";

import AnimatedGradient from "../animated-gradient/animated-gradient.js";

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer__text">
                <h3>HireSense</h3>
                <p>Get the job you deserve, faster.</p>
            </div>
            <hr />
            <div className="footer__nav">
                <ul className="footer__links">
                    <li className="footer__links-title"><h3>Improve your resume</h3></li>
                    <li className="footer__links-href"><a href="#">Score my resume</a></li>
                    <li className="footer__links-href"><a href="#">Targeted resume</a></li>
                </ul>

                <ul className="footer__links">
                    <li className="footer__links-title"><h3>Get to know us</h3></li>
                    <li className="footer__links-href"><a href="#">Help center</a></li>
                    <li className="footer__links-href"><a href="#">Privacy</a></li>
                    <li className="footer__links-href"><a href="#">Terms</a></li>
                </ul>
            </div>
            <hr />
            <div className="footer__small">
                <small className="footer__small-text">© 2025 HireSense. All rights reserved.</small>
            </div>
            <AnimatedGradient></AnimatedGradient>
        </footer>
    )
}

export default Footer;