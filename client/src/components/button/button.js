import './button.css';

const Button = ({ text, image, className = "" }) => {
    return (
        <button className={className} >
            {text ? text : <img src={image} alt="button" className="btn__image" />}
        </button>
    );
}
export default Button;