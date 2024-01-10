import { useState } from 'react';
// import Calendar from 'react-calendar';

// components
// import MeterSlider from '../components/doctor-appointment-profile-meter-slider';

// scss
import './doctor-profile-appointment-setting-tab.scss';
import '../components/doctor-profile-appointment-calendar.scss';
// import 'react-calendar/dist/Calendar.css';

// images
import VideoIcon from '../../../assets/doctor/video-call-icon.svg';
import VoiceIcon from '../../../assets/doctor/voice-icon.svg';
import PhoneIcon from '../../../assets/doctor/phone-icon.svg';

const DoctorAppointmentProfileSetting = () => {
  // const [date, setDate] = useState(new Date());
  const [selectedValue, setSelectedValue] = useState('');

  const handleDropdownChange = (e) => {
    setSelectedValue(e.target.value);
  };

  // uncommented calender is removed on figma now
  // const handleChange = (newDate) => {
  //   setDate(newDate);
  // };

  // const tileClassName = ({ date, view }) => {
  //   const isToday =
  //     date.getDate() === new Date().getDate() &&
  //     date.getMonth() === new Date().getMonth() &&
  //     date.getFullYear() === new Date().getFullYear();

  //   return isToday ? 'today-tile' : '';
  // };

  // const formatShortWeekday = (locale, date) => {
  //   const weekdays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
  //   return weekdays[date.getDay()];
  // };

  return (
    <div className='doctor-profile-appointment-setting-tab-container'>
      <div className='doctor-profile-appointment-setting-tab-inner-container-1'>
        {/* left container */}
        {/* <div className='doctor-appointment-profile-setting-tab-left-container'>
          <Calendar
            onChange={handleChange}
            value={date}
            locale='en-GB'
            formatShortWeekday={formatShortWeekday}
            tileClassName={tileClassName}
          />
        </div> */}
        {/* right container */}
        <div className='doctor-profile-appointment-setting-tab-right-container'>
          <p className='doctor-profile-appointment-setting-tab-title-1'>
            Working Time
          </p>
          {/* first line dropdown */}
          <div className='doctor-profile-appointment-setting-tab-dropdown-container-1'>
            <div className='doctor-profile-appointment-setting-tab-select-day-dropdown-container'>
              <select
                id='myDropdown'
                value={selectedValue}
                onChange={handleDropdownChange}
              >
                <option value='option1'>Monday</option>
                <option value='option2'>Tuesday</option>
                <option value='option3'>Wednesday</option>
                <option value='option1'>Thursday</option>
                <option value='option2'>Friday</option>
                <option value='option3'>Saturday</option>
              </select>
            </div>
            <div className='doctor-profile-appointment-setting-tab-select-ending-day-dropdown-container'>
              <select
                id='myDropdown'
                value={selectedValue}
                onChange={handleDropdownChange}
              >
                <option value=''>Select Ending Day</option>
                <option value='option1'>Monday</option>
                <option value='option2'>Tuesday</option>
                <option value='option3'>Wednesday</option>
                <option value='option1'>Thursday</option>
                <option value='option2'>Friday</option>
                <option value='option3'>Saturday</option>
              </select>
            </div>
          </div>
          {/* second line dropdown */}
          <div className='doctor-profile-appointment-setting-tab-dropdown-container-2'>
            <div className='doctor-profile-appointment-setting-tab-select-time-dropdown-container'>
              <select
                id='myDropdown'
                value={selectedValue}
                onChange={handleDropdownChange}
              >
                <option value='option1'>10:00</option>
              </select>
            </div>
            <div className='doctor-profile-appointment-setting-tab-select-ending-time-dropdown-container'>
              <select
                id='myDropdown'
                value={selectedValue}
                onChange={handleDropdownChange}
              >
                <option value='option1'>Select Ending Time</option>
              </select>
            </div>
            <div className='doctor-profile-appointment-setting-tab-select-time-zone-dropdown-container'>
              <select
                id='myDropdown'
                value={selectedValue}
                onChange={handleDropdownChange}
              >
                <option value='option1'>Time Zone</option>
              </select>
            </div>
          </div>
          {/* third line dropdown */}
          <div className='doctor-profile-appointment-setting-tab-dropdown-container-3'>
            <div className='doctor-profile-appointment-setting-tab-select-appointment-time-period-dropdown-container'>
              <select
                id='myDropdown'
                value={selectedValue}
                onChange={handleDropdownChange}
              >
                <option value='option1'>Appointment Time Period</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <div className='doctor-profile-appointment-setting-tab-inner-container-2'>
        <p className='doctor-profile-appointment-setting-tab-title-2'>
          Edit Consultation
        </p>
        {/* video consultation */}
        <div className='doctor-profile-appointment-setting-tab-video-consultation-container'>
          <div className='doctor-profile-appointment-setting-tab-video-consultation-title'>
            <img src={VideoIcon} alt='Icon-Video' />
            <span>Video Consultation</span>
          </div>
          <div className='doctor-profile-appointment-setting-tab-video-consultation-status'>
            Close Video Consultation
          </div>
        </div>
        <input
          type='text'
          value='$30'
          className='doctor-profile-appointment-setting-tab-video-consultation-input'
        />
        {/* <MeterSlider /> */}
        {/* voice consultation */}
        {/* <div className='doctor-appointment-profile-setting-tab-voice-consultation-container'>
          <div className='doctor-appointment-profile-setting-tab-voice-consultation-title'>
            <img src={VoiceIcon} alt='Icon-Voice' />
            <span>Voice Consultation</span>
          </div>
          <div className='doctor-appointment-profile-setting-tab-voice-consultation-status'>
            Close Video Consultation
          </div>
        </div>
        <input
          type='text'
          value='$30'
          className='doctor-appointment-profile-setting-tab-voice-consultation-input'
        /> */}
        {/* <MeterSlider /> */}
        {/* phone consultation */}
        <div className='doctor-profile-appointment-setting-tab-phone-consultation-container'>
          <div className='doctor-profile-appointment-setting-tab-phone-consultation-title'>
            <img src={PhoneIcon} alt='Icon-Phone' />
            <span>Audio Consultation</span>
          </div>
          <div className='doctor-profile-appointment-setting-tab-phone-consultation-status'>
            Open Video Consultation
          </div>
        </div>
        {/* <input
          type='text'
          className='doctor-appointment-profile-setting-tab-phone-consultation-input'
        /> */}
      </div>
    </div>
  );
};

export default DoctorAppointmentProfileSetting;
