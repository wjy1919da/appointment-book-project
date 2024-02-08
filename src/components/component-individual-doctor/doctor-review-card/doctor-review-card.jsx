import React from 'react';
import './doctor-review-card.styles.scss';
import VerificationStatusGray from '../../../assets/doctor/doctor-verification-status-gray.svg';
import verifiedIcon from '../../../assets/doctor/verified-Icon.png';
import StarRate from '../../starRate/starRate';
import { reverseEasing } from 'framer-motion';

const DoctorReview = ({ profileImage, name, starRate, reviewText, date }) => {
  let starRateTimeTen = starRate * 10;
  if (!profileImage && !name && !starRate && !reviewText && !date) {
    return null;
  }

  function convertUnicode(input) {
    return input.replace(/\\+u([0-9a-fA-F]{4})/g, (a, b) =>
      String.fromCharCode(parseInt(b, 16))
    );
  }

  function dateConverter(input) {
    const splitDate = input.split('/');
    if (splitDate.length === 3)
      return `${splitDate[2]}-${splitDate[1]}-${splitDate[0]}`;
    else return input;
  }

  return (
    <div className='doctor-review-card-container'>
      <div className='reviewer-information-date'>
        <div className='reviewer-information'>
          <img
            src={profileImage}
            alt='reviewer-image'
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
            }}
          ></img>
          <div className='reviewer-info-div'>
            <span className='reviewer-Name'>{name}</span>
            <span className='verified-symbol'>
              <img
                src={VerificationStatusGray}
                style={{ height: '20px', width: '20px' }}
              ></img>
              {/* <span className="verified-Text">verified customer</span> */}
            </span>
          </div>
          <div className='review-date-container'>
            <span className='review-date'>{dateConverter(date)}</span>
          </div>
        </div>
      </div>
      <div className='reviewer-starRate'>
        <StarRate rateScore={starRate} />
      </div>
      <div className='reviewer-text'>{convertUnicode(reviewText)}</div>
    </div>
  );
};

export default DoctorReview;
