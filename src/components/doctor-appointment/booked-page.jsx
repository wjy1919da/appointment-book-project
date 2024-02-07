import React from 'react';
import { useNavigate } from 'react-router-dom';

// components
import FormButton from '../../mutual_components/button/button';

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
          <FormButton buttonName='Home' className='doctor-appointment-home-button' />
          <FormButton
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
