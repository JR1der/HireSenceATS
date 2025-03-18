import Button from "../button/button.js";
import googleIcon from '../../asset/images/googleIcon.svg';
import "./signForm.css"


const SignForm = ({ signForm__title, btnText, btnClasses }) => {
    return (
        <div className="signForm signForm_active">
            <h2 className="signForm__title">{signForm__title}</h2>

            <form className="signForm__form">
                <div className="signForm__field">
                    <label className="signForm__label" htmlFor="email">
                        Email
                    </label>
                    <input
                        className="signForm__input"
                        type="email"
                        id="email"
                        name="email"
                        placeholder="example@gmail.com"
                    />
                </div>

                <div className="signForm__field">
                    <label className="signForm__label" htmlFor="password">
                        Password
                    </label>
                    <input
                        className="signForm__input"
                        type="password"
                        id="password"
                        name="password"
                    />
                </div>

                <div className="signForm__button">
                    <Button text={btnText} className={btnClasses}></Button>
                </div>

                <div className="signForm__links">
                    <a className="signForm__link" href="#">
                        I don’t remember email or password
                    </a>
                    <div className="signForm__link-registration">
                        <p>Gon`t have an account?</p>
                        <a className="signForm__link login__link_registration" href="#">
                            Registration
                        </a>
                    </div>
                </div>

            </form>

            <div className="signForm__social">
                <p className="signForm__social-text">Login with:</p>
                <Button image={googleIcon} className="btn-social"></Button>
            </div>
        </div>
    );
};

export default SignForm;