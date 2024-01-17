import { useState } from 'react';
import Calendar from 'react-calendar';

// components
import Button from '../../components-posts/community-post-button/community-post-button';
import AppointmentDetail from '../../user-appointment/appointment-detail';
import DarkenConfirmationModal from '../../chakra-modal/chakra-modal';

// data
import { appointmentData as initialAppointmentData } from '../data/appointmentData';
// import { slotsDescriptionData } from "../data/slotsDescriptionData";

// scss
import './doctor-profile-appointment-tab.scss';
import '../doctor-profile-appointment-components/doctor-profile-appointment-calendar.scss';
import 'react-calendar/dist/Calendar.css';

// images
import xIcon from '../../../assets/user/xIcon.svg';
import confirmedIcon from '../../../assets/doctor/doctor-verification-status.svg';

const DoctorAppointmentProfileAppointmentTab = () => {
  const [date, setDate] = useState(new Date());
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [appointmentData, setAppointmentData] = useState(
    initialAppointmentData
  );

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

  // pop up
  const handleClickList = (e, index) => {
    if (
      e.target.classList.contains('doctor-profile-appointment-tab-list-active')
    ) {
      setPopupOpen(true);
      setCurrentIndex(index);
    }
  };

  // pop up close
  const handleClickPopupClose = () => {
    setPopupOpen(false);
  };

  // toggle slots
  const toggleSlots = (index) => {
    setPopupOpen(false);
    setAppointmentData((prevData) => {
      const updatedSlots = prevData.map((slot, i) => {
        if (i === index) {
          return {
            ...slot,
            status:
              slot.status === 'Open Slot'
                ? 'Close Slot'
                : slot.status === 'Close Slot'
                ? 'Open Slot'
                : slot.status,
          };
        }
        return slot;
      });
      return updatedSlots;
    });
  };

  // modal secondary confirmation
  const handleConfirmClick = () => {
    setModalOpen(true);
  };

  // call slots and modal both
  const handleConfirmAndToggle = async (index) => {
    console.log('Both Called');
    await handleConfirmClick();
    toggleSlots(index);
    // update the status to confirmed
    setAppointmentData((prevData) => {
      const updatedSlots = prevData.map((slot, i) => {
        if (i === index) {
          return {
            ...slot,
            status: 'Confirmed',
          };
        }
        return slot;
      });
      return updatedSlots;
    });
  };

  return (
    <div className='doctor-profile-appointment-tab-container'>
      {/* pop up */}
      {isPopupOpen && (
        <div className='doctor-profile-appointment-tab-darkened-container'>
          <div
            className='doctor-profile-appointment-tab-darkened'
            onClick={(e) => handleClickList(e)}
          ></div>
          <div className='doctor-profile-appointment-tab-popup-container'>
            <div
              className='doctor-profile-appointment-tab-close-icon-container'
              onClick={handleClickPopupClose}
            >
              <img
                src={xIcon}
                className='doctor-profile-appointment-tab-close-icon'
                alt='Close-Icon'
              />
            </div>
            <AppointmentDetail />
          </div>
        </div>
      )}

      {/* darken secondary confirmation modal pop up */}
      <DarkenConfirmationModal
        title='Secondary Confirmation '
        cancelButtonText='No'
        approveButtonText='Yes'
        approveCallback={() => {
          if (appointmentData[currentIndex]?.status !== 'Confirmed') {
            handleConfirmAndToggle(currentIndex);
            setModalOpen(false);
            setAppointmentData((prevData) => [...prevData]);
          }
        }}
        isModalOpen={isModalOpen}
        closeModalFunc={() => setModalOpen(false)}
      />

      <div className='doctor-profile-appointment-tab-inner-container'>
        <div className='doctor-profile-appointment-tab-left-container'>
          <Calendar
            onChange={handleChange}
            value={date}
            locale='en-GB'
            formatShortWeekday={formatShortWeekday}
            tileClassName={tileClassName}
          />
          <div className='doctor-profile-appointment-tab-button-container'>
            <Button
              buttonName='Open all unavailable slots'
              className='doctor-profile-appointment-tab-open-button'
            />
            <Button
              buttonName='Close all unbooked slots'
              className='doctor-profile-appointment-tab-close-button'
            />
          </div>
          {/* <div className="doctor-profile-appointment-tab-button-description-container">
            {slotsDescriptionData.map((desc, index) => (
              <div
                key={desc.id}
                className="doctor-profile-appointment-tab-description-container"
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
                      className={`doctor-profile-appointment-tab-dot dot-${
                        index + 1
                      }`}
                      src={desc.dot}
                      alt={`Icon ${index + 1}`}
                    />
                  </>
                ) : null}
                <span className="doctor-profile-appointment-tab-description">
                  {desc.description}
                </span>
              </div>
            ))}
          </div> */}
        </div>
        <div className='doctor-profile-appointment-tab-right-container'>
          <p className='doctor-profile-appointment-tab-date-title'>
            Friday, 6 January 2023
          </p>
          <div>
            {appointmentData.map((item, index) => (
              <div
                key={index}
                className={`doctor-profile-appointment-tab-list-container ${
                  index >= 2
                    ? 'doctor-profile-appointment-tab-list-active'
                    : 'doctor-profile-appointment-tab-list-disabled'
                }`}
                onClick={(e) => handleClickList(e)}
              >
                <span
                  className={`doctor-profile-appointment-tab-time ${
                    index >= 2
                      ? 'doctor-profile-appointment-tab-time-active'
                      : 'doctor-profile-appointment-tab-time-disabled'
                  }`}
                >
                  {item.time}
                </span>
                <div className='doctor-profile-appointment-tab-icon-and-await'>
                  {item.src &&
                    item.src.map((src, srcIndex) => (
                      <img
                        key={srcIndex}
                        className='doctor-profile-appointment-tab-contact-icon'
                        src={src}
                        alt={`Icon ${index + 1}`}
                      />
                    ))}
                  <span className='doctor-profile-appointment-tab-await'>
                    {item.await}
                  </span>
                </div>
                <div className='doctor-profile-appointment-tab-tag-container'>
                  {item.tag1 && (
                    <span
                      className={`doctor-profile-appointment-tab-tag-1 ${
                        index >= 2
                          ? 'doctor-profile-appointment-tab-tag-1-active'
                          : 'doctor-profile-appointment-tab-tag-2-disabled'
                      }`}
                    >
                      {item.tag1}
                    </span>
                  )}
                  {item.tag2 && (
                    <span
                      className={`doctor-profile-appointment-tab-tag-2 ${
                        index >= 2
                          ? 'doctor-profile-appointment-tab-tag-2-active'
                          : 'doctor-profile-appointment-tab-tag-2-disabled'
                      }`}
                    >
                      {item.tag2}
                    </span>
                  )}
                  {!item.tag1 && !item.tag2 && item.cancel && (
                    <span className='doctor-profile-appointment-tab-cancel'>
                      {item.cancel}
                    </span>
                  )}
                </div>
                <button
                  className={`${
                    item.status === 'Open Slot'
                      ? 'doctor-profile-appointment-tab-status-open-slot'
                      : item.status === 'Close Slot'
                      ? 'doctor-profile-appointment-tab-status-close-slot'
                      : item.status === 'Confirm'
                      ? 'doctor-profile-appointment-tab-status-confirm'
                      : item.status === 'Confirmed'
                      ? 'doctor-profile-appointment-tab-status-confirmed'
                      : item.status === 'Declined'
                      ? 'doctor-profile-appointment-tab-status-confirmed'
                      : item.status === 'Confirm and Refund'
                      ? 'doctor-profile-appointment-tab-status-confirm'
                      : ''
                  }`}
                  // onClick={() => handleConfirmAndToggle(index)}
                  onClick={() => {
                    if (item.status !== 'Confirmed') {
                      handleConfirmAndToggle(index);
                    }
                  }}
                >
                  {/* status with icon */}
                  <span className='doctor-profile-appointment-tab-status-container'>
                    {item.status === 'Confirmed' && (
                      <>
                        <img src={confirmedIcon} alt='Confirmed Icon' />
                        Confirmed
                      </>
                    )}
                    {item.status !== 'Confirmed' && item.status}
                  </span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorAppointmentProfileAppointmentTab;
