import React, { useState } from 'react';
import './user-info2.css';

function App() {
    const [currentPage, setCurrentPage] = useState('My Profile');

    const handleNavClick = (pageName) => {
        setCurrentPage(pageName);
    };

    return (
        <div className="user-info">
            <div className="navbar">
                <div className="nav-top">
                    <div className="nav-item" onClick={() => handleNavClick('My Profile')}>
                        My Profile
                    </div>
                    <div className="nav-item" onClick={() => handleNavClick('My Appointments')}>
                        My Appointments
                    </div>
                    <div className="nav-item" onClick={() => handleNavClick('My Coupons')}>
                        My Coupons
                    </div>
                    <div className="nav-item" onClick={() => handleNavClick('Sign Out')}>
                        Sign Out
                    </div>
                </div>
                <div className="nav-bottom">
                    <div className="nav-item" onClick={() => handleNavClick('Apply to be a Doctor')}>
                        Apply to be a Doctor
                    </div>
                </div>
            </div>
            <div className="content">
                {currentPage === 'My Profile' && (
                    <div>
                        {/* My Profile content */}
                    </div>
                )}
                {currentPage === 'My Appointments' && (
                    <div>
                        {/* My Appointments content */}
                    </div>
                )}
                {currentPage === 'My Coupons' && (
                    <div>
                        {/* My Coupons content */}
                    </div>
                )}
                {currentPage === 'Apply to be a Doctor' && (
                    <div>
                        {/* Apply to be a Doctor content */}
                    </div>
                )}
            </div>
        </div>
    );
}

export default App;
