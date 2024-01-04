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
    <div className='doctor-appointment-details-container'>
      {/* not used due to new figma design */}
      {/* <div className='doctor-appointment-pink-background-1'></div>
      <div className='doctor-appointment-pink-background-2'></div> */}
      <div
        className='doctor-appointment-details-back-button-container'
        // onClick={handleGoBackDoctorAppointment}
      >
        {/* <img
          src={Arrow}
          alt='Icon-Arrow'
          className='doctor-appointment-arrow-back-button'
        /> */}
        <span className='doctor-appointment-details-label-back-button'>
          Appointment
        </span>
      </div>
      <div className='doctor-appointment-details-inner-container'>
        <div className='doctor-appointment-details-description-container'>
          <p className='doctor-appointment-details-description'>
            Currently, in process of Figma.{' '}
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

export default DoctorAppointmentPage4;
