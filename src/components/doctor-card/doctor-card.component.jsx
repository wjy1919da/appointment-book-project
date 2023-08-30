import React from 'react';
import './doctor-card.styles.scss';
import DoctorProfileImage from '../../assets/doctor/doctor-profile-image.png'
import locationIcon from '../../assets/doctor/search-card-locationIcon.png'
import glassIcon from '../../assets/doctor/search-card-glassIcon.png'
import badgeIcon from '../../assets/doctor/search-card-badgeIcon.png'
import StarRate from '../starRate/starRate';
import { useMediaQuery } from 'react-responsive';

const DoctorCard = ({doctor}) => {
    const isPhone = useMediaQuery({ query: `(max-width: 767px)` });
    const isIpad = useMediaQuery({query: `(min-width: 768px) and (max-width:1024px)` });
    const searchButtonWidth = isIpad ? '600' : (isPhone ? '300' : '330');
    //console.log("doctor card: ",doctor);

    return (
        <div className='search-doctor-card-container' style={{ width: `${searchButtonWidth}px` }}>
            <div className='doctor-profile-img'>
                <img src={DoctorProfileImage} class="img-fluid rounded-start" alt="..."></img>
            </div>
            <div className="search-card-body">
                <span className="search-card-title">{doctor.nickname}</span>
                <span className='search-card-text '>
                    <img src={locationIcon} style={{height:"18px", marginTop:"4px", marginInlineStart:"2px", marginInlineEnd:"2px"}} alt='location'></img>
                    {doctor.address}
                </span>
                <span className='search-card-text '>
                    <img src={glassIcon} style={{height:"18px", marginTop:"4px"}} alt='glass'></img>
                    {doctor.name.length > 1 ? (doctor.name.slice(0, 2).join(', ') + '...') : doctor.name[0]}
                </span>
                <span className='search-card-text '>
                    <img src={badgeIcon} style={{height:"18px", marginTop:"4px"}} alt='badge'></img>
                    {doctor.mechName}
                </span>
                <span className='search-card-text'>
                    <StarRate rateScore ='4'/>
                </span>
            </div>
        </div>
    )
}

export default DoctorCard;