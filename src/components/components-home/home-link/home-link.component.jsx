import { Link } from 'react-router-dom';
import './home-link.styles.scss'

const HomeLink = (props) => {
    return props.href ? (
        <Link to={props.href} className="home-link">{props.title}</Link>
    ) : (
        <div onClick={props.onClick} className="home-link">{props.title}</div>
    )
};

export default HomeLink;
