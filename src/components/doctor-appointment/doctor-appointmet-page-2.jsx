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

  const handleGoBackDoctorAppointment = () => {
    navigate('/doctorProfile');
  };

  return (
    <div className='doctor-appointment-container'>
      <div className='doctor-appointment-pink-background-1'></div>
      <div className='doctor-appointment-pink-background-2'></div>
      <div
        className='doctor-appointment-back-button-container'
        onClick={handleGoBackDoctorAppointment}
      >
        <img
          src={Arrow}
          alt='Icon-Arrow'
          className='doctor-appointment-arrow-back-button'
        />
        <span className='doctor-appointment-label-back-button'>
          Appointment
        </span>
      </div>
      <div className='doctor-appointment-inner-container'>
        <div className='doctor-appointment-description-container'>
          <p className='doctor-appointment-description'>
            Next, please fill out the following information regarding your
            gender, age, and reason for this consultation.
          </p>
        </div>
     
        <div className='doctor-appointment-button-container'>
          <Button
            buttonName='Back'
            className='doctor-appointment-back-button'
          />
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <Button
            buttonName='Next'
            className='doctor-appointment-next-button'
          />
        </div>
      </div>
    </div>
  );
};

export default DoctorAppointmentPage2;
