
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './doctor-own-profile-edit.styles.scss';
import DoctorEditVoucherSession from "./doctor-edit-voucher-session";
import DoctorEditInterestCategory from './doctor-profile-edit-interest-area';
import DoctorEditVerificationSession from './doctor-own-profile-verification-session';
import DoctorEditHightLightSession from './doctor-edit-profile-hightlight-session';
import { useSetDoctorProfile } from '../../../hooks/useUpdateProfile'
import userInfoQueryStore from '../../../userStore';
import { Link } from 'react-router-dom';
const DoctorProfileEdit = () => {
    const { userInfo } = userInfoQueryStore();
    const [changePic, setChangePic] = useState(false);
    const [isTextClicked, setIsTextClicked] = useState([false, false, false, false, false, false]);
    const interests = ["Body", "Face", "Lorum", "Lorum", "Lorum", "Lorum"];
    const [underlinePosition, setUnderlinePosition] = useState({ left: 50, top: 106 });
    const [saveSuccess, setSaveSuccess] = useState(false);
    const navigate = useNavigate();
    const navigateToBasicProfile = () =>
    {
      navigate('/doctorProfile');
    }
    const handleHover = (isHovered) => {
        setChangePic(isHovered);
    };
    const changeTextColor = (index) => {
        const updatedStates = isTextClicked.map((_, i) => (i === index ? true : false));
        setIsTextClicked(updatedStates);
        if (index < 3) {
            setUnderlinePosition({ left: 50 + 63*index});
        } else {
            setUnderlinePosition({ left: 50 + 63*2 + 74*(index-2)});
        }
    };
    const [selectedGender, setSelectedGender] = useState(null);

    const handleSelectGender = (gender) => {
      setSelectedGender(gender);
    };
  
    const isGenderSelected = (gender) => {
      return selectedGender === gender;
    };
    const [name, setName] = useState('');
    const [dob, setDob] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [businessPhone, setBusinessPhone] = useState('');
    const [clinic, setClinic] = useState('');
    const [location, setLocation] = useState('');
    const [website, setWebsite] = useState('');
    const [description, setDescription] = useState('');

    const { mutate: setUserProfile, status } = useSetDoctorProfile();
    useEffect(() => {
        if (status === 'success') {
            console.log("suc send",status)
            setSaveSuccess(true);
            setTimeout(() => setSaveSuccess(false), 3000);
        } else if (status === 'error') {
            setSaveSuccess(false);
        }
    }, [status]);
    const saveProfile = () => {
        const { password } = userInfo;
        setUserProfile({
            address: location,
            licenses:'',
            mechName: clinic,
            mechTel: businessPhone,
            miaoshu: description,
            mobile: phone,
            nickname: name,
            password, // If you need to pass password, manage its state as well
        });
    };
    return (
        <div className='user-profile-edit-container'>
            {saveSuccess && (
                <div className="save-success-message" style={{position:'absolute',top:'100px',left:'650px',color:'red'}}>
                    Change saved!
                </div>
            )}
            <div className='user-profile-edit-screen'>
                <button class="button-to-userprofile"
                        onClick={navigateToBasicProfile}                
                ></button>
                <span className='edit-profile-text'>Edit Profile</span>
                <button class="button-save-changes" onClick={saveProfile}>
                    <span className='subtext-save-changes'>Save Changes</span>
                </button>
                <div className='personal-info-table'>
                    <span className='table-subheading'>Personal Information</span>
                    <div 
                        className="avatar-picture"
                        onMouseEnter={() => handleHover(true)}
                    >
                    </div>
                    {changePic && (
                    <div 
                        className="avatar-picture-on-hover"
                        onMouseLeave={() => handleHover(false)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200" fill="none">
                            <circle cx="100" cy="100" r="100" fill="#141414" fill-opacity="0.5"/>
                        </svg>
                        <span className='click-to-change-text'>Click to Change</span>
                        <div className="delete-pic"></div>
                    </div>
                    )}
                    
                    <textarea style={{width: '278px', height: '40px', top: '165px', left:'281px', padding: "9px 20px 9px 12px"}} value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
                    <textarea style={{width: '504px', height: '48px', top: '364px', left:'55px', padding: "13px 374px 13px 12px"}} value={dob} onChange={(e) => setDob(e.target.value)}  placeholder="mm/dd/yyyy" />
                    <textarea style={{width: '504px', height: '48px', top: '471px', left:'55px', padding: "13px 320px 13px 12px"}} value={email} onChange={(e) => setEmail(e.target.value)} placeholder="charm@gmail.com" />
                    <textarea style={{width: '504px', height: '48px', top: '578px', left:'55px', padding: "13px 365px 13px 12px"}} value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="(xxx)-xxxx-xxxx" />
                    <textarea style={{width: '504px', height: '48px', top: '678px', left:'55px', padding: "13px 365px 13px 12px"}} value={businessPhone} onChange={(e) => setBusinessPhone(e.target.value)} placeholder="(xxx)-xxxx-xxxx" />
                    <textarea style={{width: '504px', height: '48px', top: '778px', left:'55px', padding: "13px 300px 13px 12px"}} value={clinic} onChange={(e) => setClinic(e.target.value)} placeholder="Clinic/Organization" />
                    <textarea style={{width: '504px', height: '48px', top: '878px', left:'55px', padding: "13px 300px 13px 12px"}} value={location} onChange={(e) => setLocation(e.target.value)} placeholder="City,state" />
                    <textarea style={{width: '504px', height: '48px', top: '978px', left:'55px', padding: "13px 300px 13px 12px"}} value={website} onChange={(e) => setWebsite(e.target.value)} placeholder="www.charm.com" />
                    <textarea style={{width: '504px', height: '178px', top: '1085px', left:'55px', padding: "8px 12px 148px 12px"}} value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" />
                    <span className='table-body' style={{top: '124px', left: '281px' }}>Name</span>
                    <div className="gender-selection-container" style={{position:'absolute',top:'264px',left:'280px'}}>
                    {['female', 'male', 'other'].map((gender) => (
                        <div key={gender} className="gender-option" onClick={() => handleSelectGender(gender)}>
                        <div className={`gender-checkbox ${selectedGender === gender ? 'selected' : ''}`}>
                            {selectedGender === gender && <div className="gender-inner-circle"></div>}
                        </div>
                        <span className="gender-label">{gender}</span>
                        </div>
                    ))}
                    </div>
                    <span className='table-body' style={{top: '223px', left: '281px' }}>Gender</span>
                    <span className='table-body' style={{top: '323px', left: '55px' }}>Age</span>
                    <span className='table-body' style={{top: '430px', left: '55px' }}>Email</span>
                    <span className='table-body' style={{top: '537px', left: '55px' }}>Phone Number</span>
                    <span className='table-body' style={{top: '642px', left: '55px' }}>Business Number</span>
                    <span className='table-body' style={{top: '742px', left: '55px' }}>Clinic</span>
                    <span className='table-body' style={{top: '842px', left: '55px' }}>Location</span>
                    <span className='table-body' style={{top: '942px', left: '55px' }}>Website</span>
                    <span className='table-body' style={{top: '1044px', left: '55px' }}>Bio</span>
                </div>
                <div className='interests-table'>
                    <span className='table-subheading'>Specialization</span>
                        {isTextClicked.map((isClicked, index) => (
                            <span
                            className="interest-options"
                            key={index}
                            style={{
                                color: isClicked ? 'var(--text-1-footer, #352C29)' : 'var(--text-2-button, #675D59)',
                                top: '102px',
                                left: '48px',
                                marginRight: '24px'
                            }}
                            onClick={() => changeTextColor(index)}
                            >
                            {interests[index]}
                            </span>
                        ))}
                        <div className="underline" style={{ position: 'relative', left: `${underlinePosition.left}px`, top: `${underlinePosition.top}px` }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="34" height="4" viewBox="0 0 34 4" fill="none">
                                <path d="M2 2H32" stroke="url(#paint0_linear_3221_24210)" stroke-width="4" stroke-linecap="round" />
                                <defs>
                                    <linearGradient id="paint0_linear_3221_24210" x1="2" y1="2.5" x2="32" y2="2.50001" gradientUnits="userSpaceOnUse">
                                        <stop stop-color="#F48C8A" />
                                        <stop offset="1" stop-color="#F0A484" />
                                    </linearGradient>
                                </defs>
                            </svg>
                        </div>
                        <div className='doctor-edit-profile-interest-category-mapping'>
                            <DoctorEditInterestCategory/>
                        </div>
                </div>
                <div className='doctoe-edit-verification-session'>
                            <DoctorEditVerificationSession/>
                </div>
                <div>
                            <DoctorEditHightLightSession/>
                </div>
                <div>
                    <DoctorEditVoucherSession/>
                </div> 
            </div>
        </div>
    )
}

export default DoctorProfileEdit;