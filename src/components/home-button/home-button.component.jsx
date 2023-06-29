import { useNavigate } from 'react-router-dom';
import './home-button.styles.scss';
// button with link
// props: link title, link href, onClick handler
const HomeButton = (props) => {
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
    return <button className='home-button' onClick={handleClick}>{props.title}</button>;
};

export default HomeButton;


