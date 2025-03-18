import "./header.css";
import logo from '../../asset/images/logo.svg';

const Header = () => {
    return (
        <header className="header">
            <div className="header__logo">
                <a href="#">
                    <img src={logo} alt="Logo"/>
                </a>
            </div>
            <ul className="header__nav">
                <li className="header__nav-item"><a href="#about-us">About Us</a></li>
                <li className="header__nav-item"><a href="#begin-block">Check you CV</a></li>
            </ul>
        </header>
    );
}

export default Header;