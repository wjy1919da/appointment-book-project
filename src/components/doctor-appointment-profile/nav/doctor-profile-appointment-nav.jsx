import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// components
import DoctorAppointmentProfileAppointmentTab from '../tabs/doctor-profile-appointment-tab.jsx';
import DoctorAppointmentProfileSetting from '../tabs/doctor-profile-appointment-setting-tab.jsx';

// scss
import './doctor-profile-appointment-nav.scss';

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
    <div className='doctor-profile-appointment-nav-container'>
      <div className='doctor-profile-appointment-nav'>
        <div
          onClick={() => setActiveTab('Appointment')}
          className={`item ${activeTab === 'Appointment' ? 'active' : ''}`}
        >
          <a href='#Appointment' className='doctor-profile-appointment-nav-tab'>
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
          <a href='#Setting' className='doctor-profile-appointment-setting-nav-tab'>
            Setting
          </a>
        </div>
      </div>
      <div className='bottom-rendering'>
        {activeTab === 'Appointment' && (
          <DoctorAppointmentProfileAppointmentTab />
        )}
        {activeTab === 'Setting' && <DoctorAppointmentProfileSetting />}
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
