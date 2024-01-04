import React from 'react';
import { useNavigate } from 'react-router-dom';

// components
import Button from '../components-posts/community-post-button/community-post-button';

// scss
import './booked-page.scss';

// images
import Arrow from '../../assets/post/iconoir_arrow-right.svg';
import DoctorImage from '../../assets/doctor/doctor-profile-picture.svg';

const BookedPage = () => {
  const navigate = useNavigate();

  // back button
  // const handleGoBackDoctorAppointment = () => {
  //   navigate('/doctor-appointment-4');
  // };

  // next button
  // const handleGoNextDoctorAppointment = () => {
  //   navigate('/doctor-appointment-booked-page');
  // };

  return (
    <div className='doctor-appointment-booked-container'>
      <div
        className='doctor-appointment-booked-back-button-container'
        // onClick={handleGoBackDoctorAppointment}
      >
        {/* <img
          src={Arrow}
          alt='Icon-Arrow'
          className='doctor-appointment-arrow-back-button'
        /> */}
        <span className='doctor-appointment-booked-label-back-button'>
          Appointment
        </span>
      </div>
      <div className='doctor-appointment-booked-inner-container'>
        <div className='doctor-appointment-booked-description-container'>
          <p className='doctor-appointment-booked-description'>
            Please allow the doctor some time to confirm your appointment.
            <br />
            We will notify you once it is confirmed. We appreciate your time!
          </p>
        </div>

        {/* doctor confirm section */}
        <div className='doctor-appointment-booked-doctor-container'>
          <div className='doctor-appointment-booked-doctor-image-container'>
            <img src={DoctorImage} alt='Image-Doctor' />
          </div>
          <div className='doctor-appointment-booked-doctor-info-container'>
            <p className='doctor-appointment-booked-name'>Charlotte</p>
            <p className='doctor-appointment-booked-date'>
              Date : 6 January 2023
            </p>
            <p className='doctor-appointment-booked-time'>
              Time : 10:00 AM - 10:30 AM EST
            </p>
          </div>
        </div>

        <div className='doctor-appointment-button-container'>
          {/* <Button
            buttonName='Back'
            icon={Arrow}
            rotateIcon={true}
            className='doctor-appointment-back-button'
            onClick={handleGoBackDoctorAppointment}
          /> */}
          <label class='radio-label'>
            <input type='radio' name='open-page' value='currenttab' checked />
            <span class='radio-text'></span>
          </label>
          <label class='radio-label'>
            <input type='radio' name='open-page' value='newtab' />
            <span class='radio-text'></span>
          </label>
          <label class='radio-label'>
            <input type='radio' name='open-page' value='newwindow' />
            <span class='radio-text'></span>
          </label>
          <label class='radio-label'>
            <input type='radio' name='open-page' value='currenttab' checked />
            <span class='radio-text'></span>
          </label>
          <label class='radio-label'>
            <input type='radio' name='open-page' value='currenttab' checked />
            <span class='radio-text'></span>
          </label>
          <label class='radio-label'>
            <input type='radio' name='open-page' value='currenttab' checked />
            <span class='radio-text'></span>
          </label>
          <Button
            buttonName='My Appointment'
            icon={Arrow}
            // rotateIcon={true}
            className='doctor-appointment-next-button'
            // onClick={handleGoNextDoctorAppointment}
          />
        </div>
      </div>
    </div>
  );
};

export default BookedPage;
