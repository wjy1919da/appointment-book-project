import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// components
import DoctorAppointmentProfileAppointmentTab from '../tabs/doctor-appointment-profile-appointment';

// scss
import './doctor-appointment-profile-nav.scss';

const DoctorAppointmentProfileNav = () => {
  const [activeTab, setActiveTab] = useState('Appointment');
  const [showCreatePost, setShowCreatePost] = useState(false);

  const { hash } = useLocation();

  useEffect(() => {
    const cleanHash = hash.replace('#', '');
    if (cleanHash === 'Appointment' || cleanHash === 'Setting') {
      setActiveTab(cleanHash);
    }
  }, [hash]);

  return (
    <div className='doctor-appointment-profile-nav-container'>
      <div className='doctor-appointmen-profile-navbar'>
        <div
          onClick={() => setActiveTab('Appointment')}
          className={`item ${activeTab === 'Appointment' ? 'active' : ''}`}
        >
          <a href='#Appointment' className='nav-tab-appointment'>
            Appointment
          </a>
        </div>
        <div
          onClick={() => {
            setActiveTab('Setting');
            setShowCreatePost(false);
            console.log(showCreatePost);
          }}
          className={`item ${activeTab === 'Setting' ? 'active' : ''}`}
        >
          <a href='#Setting' className='nav-tab-setting'>
            Setting
          </a>
        </div>
      </div>
      <div className='bottom-rendering'>
        {activeTab === 'Appointment' && (
          <DoctorAppointmentProfileAppointmentTab />
        )}
        {/* {activeTab === 'Posts' && <UserProfilePost />}
        {activeTab === 'Doctors' && <UserProfileReview />} */}
      </div>
      {/* <div className='bottom-rendering'>
          {activeTab === 'Posts' && (
            <UserProfilePost
              showCreatePost={showCreatePost}
              setShowCreatePost={setShowCreatePost}
            />
          )}
          {activeTab === 'Like' && <UserProfileLike />}
          {activeTab === 'Reviews' && <UserProfileReview />}
        </div> */}
    </div>
  );
};

export default DoctorAppointmentProfileNav;
