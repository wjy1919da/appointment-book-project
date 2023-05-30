import React, { useState } from 'react';
import NavigationBar from '../navigation-bar/navigation-bar';
import ProfilePage from '../my-profile/my-profile.component';
import AppointmentsPage from '../my-appointments/my-appointments';
import CouponsPage from '../my-coupons/my-coupons';
import ApplyPage from "../doctor-apply/doctor-apply";
import './user-info.css';

function UserInfo() {
    const [navigation, setNavigation] = useState('profile');

    const handleNavigationChange = (navigation) => {
        setNavigation(navigation);
    };

    let content;
    switch (navigation) {
        case 'appointments':
            content = <AppointmentsPage />;
            break;
        case 'coupons':
            content = <CouponsPage />;
            break;
        case 'sign-out':
            // Redirect to sign out page
            break;
        case 'apply':
            content = <ApplyPage />;
            break;
        default:
            content = <ProfilePage />;
            break;
    }

    return (
        <div className="user-info">
            <NavigationBar onNavigationChange={handleNavigationChange} />
            <div className="page-content">{content}</div>
        </div>
    );
}

export default UserInfo;
