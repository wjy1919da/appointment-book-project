import React from 'react';

// components
import Button from '../../components-posts/community-post-button/community-post-button';
// dummy data
import { appointmentData } from '../data/appointmentData';

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
          <div>
            {appointmentData.map((item, index) => (
              <div
                key={index}
                className='doctor-appointment-profile-appointment-tab-list-container'
              >
                <span className='doctor-appointment-profile-appointment-tab-time'>
                  {item.time}
                </span>
                {/* <span>{item.src}</span> */}
                <span className='doctor-appointment-profile-appointment-tab-await'>
                  {item.await}
                </span>
                <div className='doctor-appointment-profile-appointment-tab-tag-container'>
                  {item.tag1 && (
                    <span className='doctor-appointment-profile-appointment-tab-tag-1'>
                      {item.tag1}
                    </span>
                  )}
                  {item.tag2 && (
                    <span className='doctor-appointment-profile-appointment-tab-tag-2'>
                      {item.tag2}
                    </span>
                  )}
                </div>
                <span
                  className={`${
                    item.status === 'Open Slot'
                      ? 'doctor-appointment-profile-appointment-tab-status-open-slot'
                      : item.status === 'Close Slot'
                      ? 'doctor-appointment-profile-appointment-tab-status-close-slot'
                      : item.status === 'Confirm'
                      ? 'doctor-appointment-profile-appointment-tab-status-confirm'
                      : ''
                  }`}
                >
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorAppointmentProfileAppointmentTab;
