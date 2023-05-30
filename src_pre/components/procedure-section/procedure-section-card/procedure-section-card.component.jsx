import { Link } from 'react-router-dom';
import StyledButtonV2 from "../../styled-button-v2/styled-button-v2.component";

import './procedure-section-card.styles.scss'

const ProcedureSectionCard = ({ title }) => {

    return (
        <div className='procedure-section-card-container'>
            <h3 className='procedure-section-card-title'>
                {title}
            </h3>
            <div className='procedure-section-card-btn-container'>
                <Link className='procedure-section-card-btn' to='/doctor'>
                    <StyledButtonV2 text='FIND A DOCTOR' />
                </Link>
            </div>
            <br />
            <div className='procedure-section-card-btn-container'>
                <Link className='procedure-section-card-btn' to={'/procedure/' + title.toLowerCase().replaceAll(' ', '-')}>
                    <StyledButtonV2 text='LEARN MORE' />
                </Link>
            </div>
        </div>
    )
}

export default ProcedureSectionCard;