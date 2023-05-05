import { useNavigate } from 'react-router-dom';

import './doctor-detail.styles.scss';

const DoctorDetail = ({ doctorImg, doctorName, doctorIntro}) => {
    let navigate = useNavigate();

    return (
        <div className="doctor-detail-container">
            <img src={doctorImg} className='doctor-detail-pic' alt={doctorName} />
            <h3 className='doctor-detail-title'>
                {'Dr. ' + doctorName}
            </h3>
            <hr className='doctor-detail-divider' />
            <p className='doctor-detail-text'>{doctorIntro}</p>
            <div className='doctor-back-btn-container'>
                <button className='doctor-back-btn' onClick={() => navigate(-1)}>BACK</button>
            </div>
        </div>
    )
}

export default DoctorDetail;