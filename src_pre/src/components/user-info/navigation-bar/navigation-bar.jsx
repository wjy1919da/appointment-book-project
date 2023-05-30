import React from 'react';
import './navigation-bar.css';

function NavigationBar(props) {
    return (
        <div className="navigation-bar">
            <div className="navigation-items-top">
                <div className="profile-nav-item nav-item" onClick={() => props.onNavigationChange('profile')}>
                    <i className="fas fa-user"></i>
                    <span>My Profile</span>
                </div>
                <div className="appointments-nav-item nav-item"
                     onClick={() => props.onNavigationChange('appointments')}>
                    <i className="far fa-calendar-check"></i>
                    <span>My Appointments</span>
                </div>
                <div className="coupons-nav-item nav-item" onClick={() => props.onNavigationChange('coupons')}>
                    <i className="fas fa-tags"></i>
                    <span>My Coupons</span>
                </div>
                <div className="sign-out-nav-item nav-item" onClick={() => props.onNavigationChange('sign-out')}>
                    <i className="fas fa-sign-out-alt"></i>
                    <span>Sign Out</span>
                </div>
            </div>
            <div className="navigation-items-bottom">
                <div className="apply-nav-item nav-item" onClick={() => props.onNavigationChange('apply')}>
                    <i className="fas fa-user-md"></i>
                    <span>Apply to be a Doctor</span>
                </div>
            </div>
        </div>
    );
}

export default NavigationBar;
