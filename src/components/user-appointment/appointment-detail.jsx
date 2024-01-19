import { useLocation } from 'react-router-dom';
import './appointment-detail.styles.scss';
import { Link } from 'react-router-dom';
import AppInfoQueryStore from '../../appointmentStore.ts';
import doctorAvatar from '../../assets/user/doctor-profile-image.png';
import locationIcon from '../../assets/user/locationIcon.png';
import badgeIcon from '../../assets/user/badgeIcon.png';
import glassesIcon from '../../assets/user/glassesIcon.png';
import defaultImg from '../../assets/post/default_image.png';
import badgeAppointmentConfirmed from '../../assets/user/badgeAppointmentConfirmed.svg';
import badgeAppointmentPending from '../../assets/user/badgeAppointmentPending.svg';
import badgeAppointmentDeclined from '../../assets/user/badgeAppointmentDeclined.svg';
import editIcon from '../../assets/user/editIcon.svg';
/**
 * type: 0 = reschedule, 1 = in time range to start, 2 = not in time range to start
 *
 */
const AppointmentDetail = ({
  type,
  appointmentPending,
  appointmentObj,
  className,
}) => {
  const togglePopup = AppInfoQueryStore((state) => state.togglePopup);
  const appointmentBadge =
    type === 0
      ? badgeAppointmentDeclined
      : appointmentPending
      ? badgeAppointmentPending
      : badgeAppointmentConfirmed;
  const endingText =
    type === 0
      ? 'Declined'
      : appointmentPending
      ? 'Waiting for Confirmation'
      : 'Confirmed Appointment';

  // use location to link up
  const location = useLocation();
  const isDoctorProfile = location.pathname === '/doctor-profile-appointment';

  return (
    <div className='appointment-detail-main-container'>
      <div className='appointment-top-info-container'>
        <div className='app-doctor-info-section'>
          <div className='app-doctor-avatar-container'>
            <img
              src={doctorAvatar}
              className='app-doctor-avatar'
              alt='doctor profile'
            />
          </div>
          <div className='app-doctor-detail'>
            {/* <div className='app-doctor-detail-combin'>
                            <div className='app-doctor-detail-icon-container'>
                                <img src ={locationIcon} alt='location' className='app-doctor-detail-icon' />
                            </div>
                            <span className='app-doctor-detail-text'>City, State</span>
                        </div> */}
            <span className='app-doctor-name'>Dr.Name Name</span>
            <span className='app-doctor-detail-text'>Date: 6 Jan 2023</span>
            <span className='app-doctor-detail-text'>
              Time: 10:00 AM - 10:30 AM EST
            </span>
            {/* <div className='app-doctor-detail-combin'>
                            <div className='app-doctor-detail-icon-container'>
                                <img src={glassesIcon} alt='glasses' className='app-doctor-detail-icon' />
                            </div>
                            <span className='app-doctor-detail-text'>Specialization</span>
                        </div> */}
            {/* <div className='app-doctor-detail-combin'>
                            <div className='app-doctor-detail-icon-container'>
                                <img src={badgeIcon} alt='verification badge' className='app-doctor-detail-icon' />
                            </div>
                            <span className='app-doctor-detail-text'>License or Verification</span>
                        </div> */}
          </div>
        </div>
        <div className='app-doctor-ending-section'>
          <div className='appointment-ending-section-top-row'>
            <div className='appointment-ending-section-badge-container'>
              {' '}
              <img
                className='appointment-ending-section-badge'
                src={appointmentBadge}
                alt='appointment badge'
              />{' '}
            </div>
            <span
              className={`appointment-ending-section-text ${
                type === 0 && 'appointment-ending-section-text-declined'
              }`}
            >
              {endingText}
            </span>
          </div>

          {/* buttons */}
          {/* <div className='app-doctor-ending-button-container'>
                        {type !== 1 ? <button className='app-doctor-ending-edit-button' onClick={() => {
                                console.log("EDIT Link clicked");
                                togglePopup(true, 'appointmentDescription');
                                }} ><img src={editIcon} alt='edit' className='app-doctor-ending-edit-icon' />Edit</button> :
                                <button className='app-doctor-ending-join-consultation-button'>Join the Consultation Room</button>}
                    </div> */}
          <div className='app-doctor-ending-button-container'>
            {!isDoctorProfile ? (
              type !== 1 ? (
                <button
                  className='app-doctor-ending-edit-button'
                  onClick={() => {
                    console.log('EDIT Link clicked');
                    togglePopup(true, 'appointmentDescription');
                  }}
                >
                  <img
                    src={editIcon}
                    alt='edit'
                    className='app-doctor-ending-edit-icon'
                  />
                  Edit
                </button>
              ) : (
                <button className='app-doctor-ending-join-consultation-button'>
                  Join the Consultation Room
                </button>
              )
            ) : type !== 1 ? (
              <>
                <button
                  className={className}
                  style={{
                    color: '#fbfcff',
                    background:
                      'linear-gradient(90deg, #f48c8a 0%, #f0a484 100%)',
                  }}
                  // onClick={() => {
                  //   console.log('EDIT Link clicked');
                  //   togglePopup(true, 'appointmentDescription');
                  // }}
                >
                  {/* <img
                  src={editIcon}
                  alt='edit'
                  className='app-doctor-ending-edit-icon'
                /> */}
                  Confirm
                </button>
                <button
                  className={className}
                  style={{ color: '#675D59', border: '2px solid #675D59' }}
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <button
                  className={className}
                  style={{
                    color: '#fbfcff',
                    background:
                      'linear-gradient(90deg, #f48c8a 0%, #f0a484 100%)',
                  }}
                >
                  Start the Consultation
                </button>
                <button
                  className={className}
                  style={{ color: '#675D59', border: '2px solid #675D59' }}
                >
                  Cancel
                </button>
              </>
            )}
          </div>
        </div>

        {/* <div className='app-time-info-section'>
                    <span className='app-time-info-section-date' >
                        Thursday 4, June
                    </span>
                    <span className='app-time-info-section-time'>
                        01:23 PM EST
                    </span>
                    <button className='app-cancel-or-change-button' onClick={() => {
                      console.log("Link clicked");
                      togglePopup(true, 'appointmentDescription') }} >Change/Cancel Appointment</button>
                </div> */}
      </div>
      <div className='app-medium-info-section'>
        <span>You want to consult about:</span>
        <div className='app-medium-buttons-combin'>
          <button disabled className='app-medium-button app-medium-text-button'>
            Eyes
          </button>
          <button disabled className='app-medium-button app-medium-text-button'>
            Lip Filler
          </button>
          {/* <button disabled className='app-medium-button app-medium-plus-button' >+</button> */}
        </div>
      </div>
      <div className='app-description-section'>
        <span className='app-description-title'> Description: </span>
        <span className='app-description-description'>
          {' '}
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur.
        </span>
        <div className='app-description-photos-section'>
          <span className='app-description-title'>Your Photos: </span>
          <div className='app-description-photos-container'>
            <div className='app-description-photo-container'>
              <img
                className='app-description-photo'
                src={defaultImg}
                alt='app description'
              />
            </div>
            <div className='app-description-photo-container'>
              <img
                className='app-description-photo'
                src={defaultImg}
                alt='app description'
              />
            </div>
          </div>
        </div>
        {/* <Link className='app-edit-button' onClick={() => {
                console.log("Link clicked");
                togglePopup(true, 'appointmentDescription')}}>Edit</Link> */}
      </div>
      <div className='app-details-record-section'>
        <span className='app-details-record'>
          Call Record: None / Edit Record: None / Reschedule Record: None /
          Cancellation Record: None / Refund Record: None / System Refund: None
        </span>
      </div>
      {type === 0 && (
        <div className='app-ending-duo-buttons-section'>
          <button
            className='app-ending-reschedule-button'
            onClick={() => togglePopup(true, 'EditAppointment')}
          >
            Reschedule
          </button>
          <button className='app-ending-cancel-button'>
            Cancel Appointment
          </button>
        </div>
      )}
    </div>
  );
};

export default AppointmentDetail;
