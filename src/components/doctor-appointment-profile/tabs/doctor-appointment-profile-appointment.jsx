import React from 'react';

// components
import Button from '../../components-posts/community-post-button/community-post-button';

// scss
import './doctor-appointment-profile-appointment.scss';

const DoctorAppointmentProfileAppointmentTab = () => {
  return (
    <div className='doctor-appointment-profile-appointment-tab-container'>
      <div className='doctor-appointment-profile-appointment-tab-inner-container'>
        <div className='doctor-appointment-profile-appointment-tab-left-container'>
          <div className='doctor-appointment-profile-calendar'></div>
          <div className='doctor-appointment-profile-appointment-tab-button-container'>
            <Button
              buttonName='Open all unavailable slots'
              className='doctor-appointment-profile-appointment-tab-open-button'
            />
            <Button
              buttonName='Close all unbooked slots'
              className='doctor-appointment-profile-appointment-tab-close-button'
            />
          </div>
        </div>
        <div className='doctor-appointment-profile-appointment-tab-right-container'>
          <p className='doctor-appointment-profile-appointment-tab-date-title'>
            Friday, 6 January 2023
          </p>
        </div>
      </div>
    </div>
  );
};

export default DoctorAppointmentProfileAppointmentTab;
