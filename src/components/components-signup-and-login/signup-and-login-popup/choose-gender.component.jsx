import React from 'react'
import NextButton from './next-button.component';
import userInfoQueryStore from '../../../userStore.ts';
import LoginRegisterTitle from './login-register-title.component';
import {  Radio, Space } from 'antd';
import { useState,useEffect } from 'react';
import { Input} from '@chakra-ui/react'
import './choose-gender.styles.scss';
// import Calendar from '../../user-appointment/calendar';
import CalendarProfile from '../calendar-profile/calendar-profile.component';
const ChooseGender = () => {
    const userInfo = userInfoQueryStore((state) => state.userInfo);
    const setGender = userInfoQueryStore((state) => state.setGender);
    const [birthday, setBirthdayValue] = useState(null);
    const switchPopupTab = userInfoQueryStore(state=>state.switchPopupTab);
    const [selectedGender, setSelectedGender] = useState(userInfo.gender);
    const setBirthday = userInfoQueryStore(state=>state.setBirthday);
    const onChange = (e) => {
        // console.log('radio checked', e.target.value);
        setSelectedGender(e.target.value);  
        setGender(e.target.value);  
    };
    const onChangeDate = (e) => {
        // console.log('date checked', e.target.value);
        setBirthdayValue(e.target.value);
    };
    // console.log("userInfo in gender page",userInfo);
    const handleOnClick = ()=>{
        setBirthday(birthday);
        switchPopupTab('interest');
    }
    const handleSkip = ()=>{
        setBirthday(null);
        setGender(null);
        switchPopupTab('interest');
    }
    return (
        <div className="gender-outer-container">
                <div className='choose-gender-title-container'>
                    <LoginRegisterTitle title={"Your Profile"} handleBackwards={()=>switchPopupTab('sendVerifyEmail')} handleSkip={handleSkip}/>
                </div> 
                <div className='profile-content-container'>
                    <form>
                        <div className="profile-section-container" style={{ marginTop:'-10px'}}>
                            <div>Gender</div>
                            <Radio.Group onChange={onChange} value={selectedGender}>
                                <Space direction="horizontal" >
                                    <Radio className="gradient-radio" value={1}>Male</Radio>
                                    <Radio className="gradient-radio" value={2}>Female</Radio>
                                    <Radio className="gradient-radio" value={3}>Other</Radio>
                                </Space>
                            </Radio.Group>
                        </div>
                        <div className='profile-section-container'>
                            <div>Birthday</div>
                            {/* <Input
                                placeholder="Select Date and Time"
                                size="md"
                                type="date"
                                className="calendar-input"
                                value={birthday} 
                                onChange={onChangeDate}
                            /> */}
                            {/* <Calendar/> */}
                            <CalendarProfile/>
                        </div>
                        <div className="next-button-section">
                            <NextButton type="submit" title='Next' width='180px' onClick={handleOnClick}/>
                        </div>  
                    </form>        
                </div>  
            </div>
        )
}

export default ChooseGender