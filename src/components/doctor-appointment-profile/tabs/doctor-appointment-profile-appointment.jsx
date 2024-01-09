import { useState } from 'react';
import Calendar from 'react-calendar';

// components
import Button from '../../components-posts/community-post-button/community-post-button';
// dummy data
import { appointmentData } from '../data/appointmentData';
// slots decription data
import { slotsDescriptionData } from '../data/slotsDescriptionData';

// scss
import './doctor-appointment-profile-appointment.scss';
import '../components/doctor-appointment-profile-calendar.scss';
import 'react-calendar/dist/Calendar.css';

const DoctorAppointmentProfileAppointmentTab = () => {
  const [date, setDate] = useState(new Date());

  const handleChange = (newDate) => {
    setDate(newDate);
  };

  const tileClassName = ({ date, view }) => {
    const isToday =
      date.getDate() === new Date().getDate() &&
      date.getMonth() === new Date().getMonth() &&
      date.getFullYear() === new Date().getFullYear();

    return isToday ? 'today-tile' : '';
  };

  const formatShortWeekday = (locale, date) => {
    const weekdays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
    return weekdays[date.getDay()];
  };

  return (
    <div className='doctor-appointment-profile-appointment-tab-container'>
      <div className='doctor-appointment-profile-appointment-tab-inner-container'>
        <div className='doctor-appointment-profile-appointment-tab-left-container'>
          <Calendar
            onChange={handleChange}
            value={date}
            locale='en-GB'
            formatShortWeekday={formatShortWeekday}
            tileClassName={tileClassName}
          />
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
          <div className='doctor-appointment-profile-appointment-tab-button-description-container'>
            {slotsDescriptionData.map((desc, index) => (
              <div
                key={desc.id}
                className='doctor-appointment-profile-appointment-tab-description-container'
              >
                <span
                  className={`doctor-profile-appointment-tab-icon icon-${
                    index + 1
                  }`}
                >
                  {desc.icon}
                </span>
                {desc.dot ? (
                  <>
                    <img
                      className={`doctor-profile-appointment-tab-dot dot-${index+1}`}
                      src={desc.dot}
                      alt={`Icon ${index + 1}`}
                    />
                  </>
                ) : null}
                <span className='doctor-profile-appointment-tab-description'>
                  {desc.description}
                </span>
              </div>
            ))}
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
