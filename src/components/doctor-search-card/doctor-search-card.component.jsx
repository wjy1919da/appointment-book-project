import locationIcon from '../../assets/doctor/search-card-locationIcon.png';
import badgeIcon from '../../assets/doctor/search-card-badgeIcon.png';
import glassesIcon from '../../assets/doctor/search-card-glassIcon.png';
import StarRate from '../../components/starRate/starRate';
import doctorStockPhoto from '../../assets/doctor/doctor-profile-image.png';
import { Link } from "react-router-dom";
import './doctor-search-card.scss';

const DoctorSearchCard = ({doctorObj}) => { // based on Figma, doctorObj should preferably have: name, doctorId, photoUrl, rating, location, specialization/field, license/verification
    const name = doctorObj?.name;           // ^I would assume doctorQuerys would be passed in here, from store.ts, which dont contain their rating. I'll have to ask how we will store that
    const photoUrl = doctorObj?.photoUrl;
    const id = doctorObj?.memberId;
    const rating = doctorObj?.rating;
    const location = doctorObj?.location;
    const field = doctorObj?.field;
    return (
        <div className='doctor-sc-container'>
            <div className='doctor-sc'>
                <div className='doctor-sc-image-column'>
                    <div className='doctor-sc-image-container'>
                        <img src={photoUrl || doctorStockPhoto} alt='Doctor photo' className='doctor-sc-image' /> 
                    </div>
                    <div className='doctor-sc-rating-container'>
                        <StarRate rateScore={rating} />
                    </div>
                </div>
                <div className='doctor-sc-info-column'>
                    <div className='doctor-sc-location-row doctor-sc-row'>
                        <div className='doctor-sc-icon-container'>
                            <img src={locationIcon} alt='location icon' className='doctor-sc-icon' />
                        </div>
                        <p className='doctor-sc-location-text doctor-sc-text'>{location  || 'City, State'}</p>
                    </div>
                    <div className='doctor-sc-name-row doctor-sc-row'>
                        <div className='doctor-sc-name-container'>
                        <Link to={`/doctor/${id}`}><h4 className='doctor-sc-name-text doctor-sc-text'>{name || 'Dr. Name Name'}</h4></Link>
                        </div>
                    </div>
                    <div className='doctor-sc-field-row doctor-sc-row'>
                        <div className='doctor-sc-icon-container'>
                            <img src={glassesIcon} alt='glasses icon' className='doctor-sc-icon' />
                        </div>
                        <p className='doctor-sc-field-text doctor-sc-text'>{field || 'Generalist'}</p>
                    </div>
                    <div className='doctor-sc-license-row doctor-sc-row'>
                        <div className='doctor-sc-icon-container'>
                            <img src={badgeIcon} alt='badge icon' className='doctor-sc-icon' />
                        </div>
                        <p className='doctor-sc-verification-text doctor-sc-text'>License or Verification</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DoctorSearchCard;