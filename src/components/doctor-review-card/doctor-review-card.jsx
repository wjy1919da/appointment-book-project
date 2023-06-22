import React from 'react';
import "./doctor-review-card.styles.scss";
import verifiedIcon from '../../assets/doctor/verified-Icon.png'
import StarRate from '../starRate/starRate';


const DoctorReviewCard = ({profileImage,name,starRate,reviewText,date}) => {
    let starRateTimeTen = starRate * 10;
    if(!profileImage&&!name&&!starRate&&!reviewText&&!date)
    {
        return null
    }
    return (
        <div className='doctor-review-card-container'>
            <div className="reviewer-information-date">
                <div className="reviewer-information">
                    <img src ={profileImage} alt="reviewer-image" style={{width:"40px",height:"40px"}}></img>
                    <span className="reviewer-Name" style={{width:"117px"}}>{name}</span>
                    <span className="verified-symbol">
                        <span className="verified-Icon"></span>
                        <span className="verified-Text">verified customer</span>
                    </span>
                    
                    </div>
                    <div className="review-date">
                        <span className="post-date">{date}</span>
                    </div>
                
            </div>
            <div className="reviewer-starRate">
                <StarRate rateScore={starRate}/>
            </div>
            <div className="reviewer-text">
                {reviewText}
            </div>
        </div>
    )
}

export default DoctorReviewCard;