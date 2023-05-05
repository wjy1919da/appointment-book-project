import { Link } from 'react-router-dom';

import './home-procedure-card.styles.scss';

const HomeProcedureCard = ({ title }) => {
    const picSrc = require(`../../../assets/home/${title}.jpg`);

    return (
        <div className='card home-procedure-card text-center'>
            <Link className='home-procedure-card-link' to={'/procedure/' + title.split(' ')[0]}>
                <img className='card-pic' src={picSrc} alt={title} />
                <h5 className="card-title">{title + ' procedure'}</h5>
            </Link>
        </div>
    )
}

export default HomeProcedureCard;