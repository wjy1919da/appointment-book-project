import { Link } from 'react-router-dom';

import StyledButton from '../styled-button/styled-button.component';
import './sub-footer.styles.scss';

const SubFooter = () => {
    return (
        <div className='sub-footer-container'>
            <h2 className='sub-footer-title'>
                still have questions?
            </h2>
            <p className='sub-footer-txt'>
                click here to choose your doctor for consultation
            </p>
            <div className='sub-footer-button-container'>
                <Link className='sub-footer-button' to='/doctor'>
                    <StyledButton text={'ask a doctor | go'}/>
                </Link>
            </div>
            <div className='sub-reference-title'>
                reference source
            </div>
            <div className='sub-reference-text'>
                <span className='sub-reference-point'>·</span>
                https://www.americanboardcosmeticsurgery.org  
            </div>
            <div className='sub-reference-text'>
                <span className='sub-reference-point'>·</span>
                https://www.beverlyhillsplasticsurgerygroup.com
            </div>
            <div className='sub-reference-text'>
                <span className='sub-reference-point'>·</span>
                https://www.ganchi.com
            </div>
            <div className='sub-reference-text'>
                <span className='sub-reference-point'>·</span>
                http://www.thermage.com
            </div>
            <div className='sub-reference-text'>
                <span className='sub-reference-point'>·</span>
                https://www.fraxel.com/#home
            </div>
            <div className='sub-reference-text'>
                <span className='sub-reference-point'>·</span>
                https://www.vaser.com/#home
            </div>
            <div className='sub-reference-text'>
                <span className='sub-reference-point'>·</span>
                https://www.clearandbrilliant.com/#what-it-does
            </div>
        </div>
    )
}

export default SubFooter;