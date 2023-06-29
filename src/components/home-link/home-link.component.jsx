import { Link } from 'react-router-dom';
import './home-link.styles.scss'

const HomeLink = (props) => {
    return(
        <Link to={props.href} className="home-link">{props.title}</Link>
    )
};

export default HomeLink;