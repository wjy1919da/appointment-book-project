import React from 'react';
import { useNavigate } from 'react-router-dom';

// components
import Button from '../components-posts/community-post-button/community-post-button';

// scss
import './doctor-appointment-page-2.scss';

// images
import Arrow from '../../assets/post/iconoir_arrow-right.svg';

const DoctorAppointmentPage2 = () => {
  const navigate = useNavigate();

  // back button
  const handleGoBackDoctorAppointment = () => {
    navigate('/doctor-appointment-1');
  };

  // next button
  const handleGoNextDoctorAppointment = () => {
    navigate('/doctor-appointment-3');
  };

  return (
    <div className='doctor-appointment-date-container'>
      <div className='doctor-appointment-date-back-button-container'>
        <span className='doctor-appointment-date-label-back-button'>
          Appointment
        </span>
      </div>
      <div className='doctor-appointment-date-inner-container'>
        <div className='doctor-appointment-date-description-container'>
          <p className='doctor-appointment-date-description'>
            Next, please select the date and time that is the best for you. Our
            verified doctors will contact you during this time.
          </p>
        </div>
        <div className='doctor-appointment-button-container'>
          <Button
            buttonName='Back'
            icon={Arrow}
            rotateIcon={true}
            className='doctor-appointment-back-button'
            onClick={handleGoBackDoctorAppointment}
          />
          <label class='radio-label'>
            <input type='radio' checked />
            <span class='radio-text'></span>
          </label>
          <label class='radio-label'>
            <input type='radio' checked />
            <span class='radio-text'></span>
          </label>
          <label class='radio-label'>
            <input type='radio' />
            <span class='radio-text'></span>
          </label>
          <label class='radio-label'>
            <input type='radio' />
            <span class='radio-text'></span>
          </label>
          <Button
            buttonName='Next'
            icon={Arrow}
            // rotateIcon={true}
            className='doctor-appointment-next-button'
            onClick={handleGoNextDoctorAppointment}
          />
        </div>
      </div>
    </div>
  );
};

export default DoctorAppointmentPage2;
