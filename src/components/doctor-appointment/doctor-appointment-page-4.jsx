import React from 'react';
import { useNavigate } from 'react-router-dom';

// components
import Button from '../components-posts/community-post-button/community-post-button';

// scss
import './doctor-appointment-page-4.scss';

// images
import Arrow from '../../assets/post/iconoir_arrow-right.svg';

const DoctorAppointmentPage4 = () => {
  const navigate = useNavigate();

  // back button
  const handleGoBackDoctorAppointment = () => {
    navigate('/doctor-appointment-3');
  };

  // next button
  const handleGoNextDoctorAppointment = () => {
    navigate('/doctor-appointment-booked-page');
  };

  return (
    <div className='doctor-appointment-payment-container'>
      <div
        className='doctor-appointment-payment-back-button-container'
        // onClick={handleGoBackDoctorAppointment}
      >
        <span className='doctor-appointment-payment-label-back-button'>
          Appointment
        </span>
      </div>
      <div className='doctor-appointment-payment-inner-container'>
        <div className='doctor-appointment-payment-description-container'>
          <p className='doctor-appointment-payment-description'>
            Currently, in process of Figma.
          </p>
        </div>

        <div className='doctor-appointment-payment-button-container'>
          <Button
            buttonName='Back'
            icon={Arrow}
            rotateIcon={true}
            className='doctor-appointment-payment-back-button'
            onClick={handleGoBackDoctorAppointment}
          />
          <label class='doctor-appointment-payment-radio-label'>
            <input type='radio' checked />
            <span class='radio-text'></span>
          </label>
          <label class='doctor-appointment-payment-radio-label'>
            <input type='radio' checked />
            <span class='radio-text'></span>
          </label>
          <label class='doctor-appointment-payment-radio-label'>
            <input type='radio' checked />
            <span class='radio-text'></span>
          </label>
          <label class='doctor-appointment-payment-radio-label'>
            <input type='radio' checked />
            <span class='radio-text'></span>
          </label>
          <Button
            buttonName='Next'
            icon={Arrow}
            // rotateIcon={true}
            className='doctor-appointment-payment-next-button'
            onClick={handleGoNextDoctorAppointment}
          />
        </div>
      </div>
    </div>
  );
};

export default DoctorAppointmentPage4;
