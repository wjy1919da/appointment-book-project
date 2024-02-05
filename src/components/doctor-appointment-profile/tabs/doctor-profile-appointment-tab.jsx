import { useState } from 'react';

// components
import FormButton from '../../../mutual_components/button/button';
import AppointmentDetail from '../../user-appointment/appointment-detail';
import DarkenConfirmationModal from '../../chakra-modal/chakra-modal';
import CalendarComponent from '../../../mutual_components/calendar/calendar';

// data
import { appointmentData as initialAppointmentData } from '../data/appointmentData';
// import { slotsDescriptionData } from "../data/slotsDescriptionData";

// scss
import './doctor-profile-appointment-tab.scss';

// images
import xIcon from '../../../assets/user/xIcon.svg';

const DoctorAppointmentProfileAppointmentTab = () => {
  const [isPopupOpen, setPopupOpen] = useState(false); // pop up
  const [isModalOpen, setModalOpen] = useState(false); // secondary confirmation modal
  const [appointmentData, setAppointmentData] = useState(
    initialAppointmentData
  ); // appointment list data

  // pop up
  const handleClickList = (e) => {
    if (
      e.target.classList.contains('doctor-profile-appointment-tab-list-active')
    ) {
      setPopupOpen(true);
    }
  };

  // pop up close
  const handleClickPopupClose = () => {
    setPopupOpen(false);
  };

  // toggle open/close slots button, open modal when click on confirm button
  const handleClickSlotsAndModal = (index) => {
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

    const currentItem = appointmentData[index];

    if (currentItem.status === 'Confirm') {
      setModalOpen(true);
    }
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
            {/* confirmed */}
            <AppointmentDetail className='doctor-profile-appointment-tab-button' />
            {/* not confirmed */}
            {/* <AppointmentDetail type={1} className='doctor-profile-appointment-tab-button' /> */}
          </div>
        </div>
      )}

      {/* darken secondary confirmation modal pop up */}
      <DarkenConfirmationModal
        title='Secondary Confirmation?'
        cancelButtonText='Cancel'
        approveButtonText='Confirm'
        // approveCallback={}
        isModalOpen={isModalOpen}
        closeModalFunc={() => setModalOpen(false)}
      />

      <div className='doctor-profile-appointment-tab-inner-container'>
        <div className='doctor-profile-appointment-tab-left-container'>
          <CalendarComponent />
          <div className='doctor-profile-appointment-tab-button-container'>
            <FormButton
              buttonName='Open all unavailable slots'
              className='doctor-profile-appointment-tab-open-button'
            />
            <FormButton
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
                  onClick={() => handleClickSlotsAndModal(index)}
                >
                  {/* status with icon */}
                  <span className='doctor-profile-appointment-tab-status-container'>
                    {item.icon && <img src={item.icon} alt='Icon' />}
                    {item.status}
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
