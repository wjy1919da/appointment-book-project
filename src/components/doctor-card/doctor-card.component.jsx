import { Link } from 'react-router-dom';
import './doctor-card.styles.scss';

const DoctorCard = ({ doctor }) => {
    const doctorName = doctor.firstName + ' ' + doctor.lastName;

    return (
        <div className="card doctor-card text-center">
            <Link className='doctor-card-link' to={`${doctor.id}`}>
                <img src={doctor.iconPic} className='card-img-top' alt={doctorName} />
                <div className='card-body'>
                    <h5 className="card-title">{'Dr. ' + doctorName}</h5>
                    <p className='card-text'>{doctor.city + ', ' + doctor.state}</p>
                    {doctor.workYear && <div className='doctor-card-experience'>{doctor.workYear + ' yrs experience'}</div>}
                    {!doctor.workYear && <div className='doctor-card-experience'>{'M.D. with experience'}</div>}
                </div>
            </Link>  
        </div>
    )
}

export default DoctorCard;