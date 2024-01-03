import React from 'react';
import { useNavigate } from 'react-router-dom';

// components
import Button from '../components-posts/community-post-button/community-post-button';

// scss
import './doctor-appointment-page.scss';

// images
import Arrow from '../../assets/post/iconoir_arrow-right.svg';
import VideoCallIcon from '../../assets/doctor/video-call-icon.svg';
import VoiceIcon from '../../assets/doctor/voice-icon.svg';
import PhoneIcon from '../../assets/doctor/phone-icon.svg';

const DoctorAppointmentPage = () => {
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
            Hello, to get started with your consultation, we would like to know
            more about you. Please choose from the following list of available
            consultations:
          </p>
        </div>
        <div className='icon-container'>
          <div className='icon-inner-container'>
            <figure className='icon-set'>
              <img src={VideoCallIcon} alt='Icon-Video' />
              <figcaption className='caption-label'>
                Video Consultation
              </figcaption>
              <figcaption className='caption-price'>$20/hr</figcaption>
            </figure>
            <figure className='icon-set'>
              <img src={VoiceIcon} alt='Icon-Voice' />
              <figcaption className='caption-label'>
                Video Consultation
              </figcaption>
              <figcaption className='caption-price'>$20/hr</figcaption>
            </figure>
            <figure className='icon-set'>
              <img src={PhoneIcon} alt='Icon-Phone' />
              <figcaption className='caption-label'>
                Phone Consultation
              </figcaption>
              <figcaption className='caption-price'>$20/hr</figcaption>
            </figure>
          </div>
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

export default DoctorAppointmentPage;
