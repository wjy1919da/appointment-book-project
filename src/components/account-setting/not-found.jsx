import { useState, useEffect } from 'react';
import AccountSetup from './account-setting';
import "./not-found.styles.scss";

const AccountNotFoundPage = () => {
    const [showAccountSetting, setShowAccountSetting] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    
    const handleClick = () => {
        setShowAccountSetting(true);
    };
    return (
        <div className="not-found-page-container">
            {showAccountSetting ? (
                <AccountSetup/>
            ) : (
            <div>
                <div className="not-found-page-screen">
                    <button class="back-home-button" onClick={handleClick}></button>
                    <span className='not-found-text'>404 Not Found</span>
                    <span className='feature-coming-soon-text'>Feature is Coming Soon!</span>
                </div>
            </div>
            )}
        </div>
    )
}

export default AccountNotFoundPage;