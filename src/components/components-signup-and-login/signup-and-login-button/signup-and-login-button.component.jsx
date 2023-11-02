import { useNavigate } from 'react-router-dom';
import './signup-and-login-button.styles.scss';

// button with link
// props: link title, link href, onClick handler
const SignupAndLoginButton = (props) => {
    const navigate = useNavigate();
    const handleClick = () => {
        if (props.href) {
            console.log(props.href);
            navigate(props.href);
        }
        if (props.onClick) {
            props.onClick();
        }
    }
    const hasIcon = props.isIcon;
    const buttonStyle = {
        // if width is not provided, it defaults to 'auto'
        // other styles can be added here
        width:props.width || 'auto', 
        height:props.height || 'auto',
        borderRadius:props.borderRadius || 'auto'
      };
    
    return (
        <button type={props.type} className='signup-and-login-button' onClick={handleClick} style={buttonStyle}>
            {props.isIcon&&<img src={props.isIcon} className='signup-and-login-button-icon' alt='search'/>}
            {props.title}
        </button>
    );
};

export default SignupAndLoginButton;