import React from 'react';

// components
import Button from '../components-posts/community-post-button/community-post-button';
import DoctorAppointmentProfileNav from './nav/doctor-appointment-profile-nav';

// scss
import './doctor-appointment-profile.scss';

// images
import Arrow from '../../assets/doctor/black-arrow-left.svg';

const DoctorAppointmentProfilePage = () => {
  return (
    <div className='doctor-appointment-profile-container'>
      <div className='doctor-appointment-profile-title-button-container'>
        <div className='doctor-appointment-profile-title-button-wrap'>
          {/* <img src={Arrow} alt='Arrow-Icon' /> */}
          <span className='doctor-appointment-profile-title'>
            Appointment Dashboard
          </span>
        </div>
        {/* <Button
          buttonName='Save Changes'
          className='doctor-appointment-profile-save-changes-button'
        /> */}
      </div>
      <div className='doctor-appointment-profile-inner-container'>
        <DoctorAppointmentProfileNav />
      </div>
    </div>
  );
};

export default DoctorAppointmentProfilePage;
