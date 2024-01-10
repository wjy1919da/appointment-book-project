import React from 'react';

// components
import DoctorAppointmentProfileNav from './nav/doctor-profile-appointment-nav';
// import Button from '../components-posts/community-post-button/community-post-button';

// scss
import './doctor-profile-appointment-main.scss';

// images
// import Arrow from '../../assets/doctor/black-arrow-left.svg';

const DoctorAppointmentProfilePage = () => {
  return (
    <div className='doctor-profile-appointment-main-container'>
      <div className='doctor-profile-appointment-main-title-button-container'>
        <div className='doctor-profile-appointment-main-title-button-wrap'>
          {/* <img src={Arrow} alt='Arrow-Icon' /> */}
          <span className='doctor-profile-appointment-main-title'>
            Appointment Dashboard
          </span>
        </div>
        {/* <Button
          buttonName='Save Changes'
          className='doctor-appointment-profile-save-changes-button'
        /> */}
      </div>
      <div className='doctor-profile-appointment-main-inner-container'>
        <DoctorAppointmentProfileNav />
      </div>
    </div>
  );
};

export default DoctorAppointmentProfilePage;
