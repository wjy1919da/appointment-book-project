import { useState } from 'react';

// components
import MeterSlider from '../components/doctor-appointment-profile-meter-slider';

// scss
import './doctor-appointment-profile-setting.scss';

// images
import VideoIcon from '../../../assets/doctor/video-call-icon.svg';
import VoiceIcon from '../../../assets/doctor/voice-icon.svg';
import PhoneIcon from '../../../assets/doctor/phone-icon.svg';

const DoctorAppointmentProfileSetting = () => {
  const [selectedValue, setSelectedValue] = useState('');

  const handleDropdownChange = (e) => {
    setSelectedValue(e.target.value);
  };

  return (
    <div className='doctor-appointment-profile-setting-tab-container'>
      <div className='doctor-appointment-profile-setting-tab-inner-container-1'>
        {/* left container */}
        <div className='doctor-appointment-profile-setting-tab-left-container'>
          <div className='doctor-appointment-profile-setting-tab-calendar'></div>
        </div>
        {/* right container */}
        <div className='doctor-appointment-profile-setting-tab-right-container'>
          <p className='doctor-appointment-profile-setting-tab-title-1'>
            Working Time
          </p>
          {/* first line dropdown */}
          <div className='doctor-appointment-profile-setting-tab-dropdown-container-1'>
            <div className='doctor-appointment-profile-setting-tab-select-day-dropdown-container'>
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
            <div className='doctor-appointment-profile-setting-tab-select-ending-day-dropdown-container'>
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
          <div className='doctor-appointment-profile-setting-tab-dropdown-container-2'>
            <div className='doctor-appointment-profile-setting-tab-select-time-dropdown-container'>
              <select
                id='myDropdown'
                value={selectedValue}
                onChange={handleDropdownChange}
              >
                <option value='option1'>10:00</option>
              </select>
            </div>
            <div className='doctor-appointment-profile-setting-tab-select-ending-time-dropdown-container'>
              <select
                id='myDropdown'
                value={selectedValue}
                onChange={handleDropdownChange}
              >
                <option value='option1'>Select Ending Time</option>
              </select>
            </div>
            <div className='doctor-appointment-profile-setting-tab-select-time-zone-dropdown-container'>
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
          <div className='doctor-appointment-profile-setting-tab-dropdown-container-3'>
            <div className='doctor-appointment-profile-setting-tab-select-appointment-time-period-dropdown-container'>
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
      <div className='doctor-appointment-profile-setting-tab-inner-container-2'>
        <p className='doctor-appointment-profile-setting-tab-title-2'>
          Edit Consultation
        </p>
        {/* video consultation */}
        <div className='doctor-appointment-profile-setting-tab-video-consultation-container'>
          <div className='doctor-appointment-profile-setting-tab-video-consultation-title'>
            <img src={VideoIcon} alt='Icon-Video' />
            <span>Video Consultation</span>
          </div>
          <div className='doctor-appointment-profile-setting-tab-video-consultation-status'>
            Close Video Consultation
          </div>
        </div>
        <input
          type='text'
          value='$30'
          className='doctor-appointment-profile-setting-tab-video-consultation-input'
        />
        <MeterSlider />
        {/* voice consultation */}
        <div className='doctor-appointment-profile-setting-tab-voice-consultation-container'>
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
        />
        <MeterSlider />
        {/* phone consultation */}
        <div className='doctor-appointment-profile-setting-tab-phone-consultation-container'>
          <div className='doctor-appointment-profile-setting-tab-phone-consultation-title'>
            <img src={PhoneIcon} alt='Icon-Phone' />
            <span>Phone Consultation</span>
          </div>
          <div className='doctor-appointment-profile-setting-tab-phone-consultation-status'>
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
