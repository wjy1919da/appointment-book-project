import StyledButton from '../../styled-button/styled-button.component';

import { Link } from 'react-router-dom';
import './home-doctors-card.styles.scss';

const HomeDoctorsCard = ({ doctor }) => {
    const doctorName = doctor.firstName + ' ' + doctor.lastName;

    return (
        <div className='home-doctor-cards-container'>
            <div className='home-doctor-card-container'>
                <div className='home-doctor-card-decorator'></div>
                <img className='home-doctor-card-photo' src={doctor.iconPic} alt={'Dr. ' + doctorName} />
                <div className='home-doctor-card-content-container'>
                    <h6 className='home-doctor-card-name'>{'Dr. ' + doctorName}</h6>
                    <p className='home-doctor-card-content'>{doctor.info}</p>
                </div>
                <div className='home-doctor-card-btn-container'>
                    <Link className='home-doctor-card-btn' to={'doctor/' + doctor.id}>
                        <StyledButton text='learn more | go' />
                    </Link>
                </div>
            </div>
            <div className='home-doctor-card-container-2 home-doctor-card-container-other'>
            </div>
            <div className='home-doctor-card-container-3 home-doctor-card-container-other'>
            </div>
            <div className='home-doctor-card-container-4 home-doctor-card-container-other'>
            </div>
            <div className='home-doctor-card-container-5 home-doctor-card-container-other'>
            </div>
        </div>
        
    )
}

export default HomeDoctorsCard;