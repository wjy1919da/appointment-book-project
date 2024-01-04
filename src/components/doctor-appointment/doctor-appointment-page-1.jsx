import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// components
import Button from '../components-posts/community-post-button/community-post-button';

// scss
import './doctor-appointment-page-1.scss';

// images
import Arrow from '../../assets/post/iconoir_arrow-right.svg';

const DoctorAppointmentPage1 = () => {
  const [dob, setDob] = useState('');

  const navigate = useNavigate();

  // next button
  const handleGoNextDoctorAppointment = () => {
    navigate('/doctor-appointment-2');
  };

  // birthday input
  const handleDateChange = (e) => {
    setDob(e.target.value);
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
            Please fill out the following information regarding your details.
          </p>
        </div>

        <div className='gender-and-birthday-container'>
          {/* gender radio buttons */}
          <div className='doctor-appointment-details-gender-radio-button-container'>
            <span className='radio-gender-label-gender'>Gender</span>
            <label class='radio-gender-label'>
              <input type='radio' name='open-page' value='currenttab' checked />
              <span className='radio-gender-text'>Female</span>
            </label>
            <label class='radio-gender-label'>
              <input type='radio' name='open-page' value='newtab' />
              <span className='radio-gender-text'>Male</span>
            </label>
            <label class='radio-gender-label'>
              <input type='radio' name='open-page' value='newwindow' />
              <span className='radio-gender-text'>Other</span>
            </label>
          </div>

          {/* birthday input */}
          <div className='doctor-appointment-details-birthday-container'>
            <label htmlFor='dob' className='birthday-label'>
              Birthday
            </label>
            <input
              type='date'
              id='dob'
              name='dob'
              value={dob}
              onChange={(e) => handleDateChange(e)}
              max={new Date().toISOString().split('T')[0]}
              className='birthday-input'
            />
          </div>
        </div>

        <div className='doctor-appointment-button-container'>
          <div className='blank'></div>
          <label class='radio-label'>
            <input type='radio' checked />
            <span class='radio-text'></span>
          </label>
          <label class='radio-label'>
            <input type='radio' />
            <span class='radio-text'></span>
          </label>
          <label class='radio-label'>
            <input type='radio' />
            <span class='radio-text'></span>
          </label>
          <label class='radio-label'>
            <input type='radio' />
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

export default DoctorAppointmentPage1;
