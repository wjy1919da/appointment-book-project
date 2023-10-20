import React from 'react'
import NextButton from './next-button.component';
import userInfoQueryStore from '../../../userStore.ts';
import LoginRegisterTitle from './login-register-title.component';
import {  Radio, Space } from 'antd';
import { useState,useEffect } from 'react';
import { Input } from '@chakra-ui/react'
import './choose-gender.styles.scss';

const ChooseGender = () => {
    const userInfo = userInfoQueryStore((state) => state.userInfo);
    const setGender = userInfoQueryStore((state) => state.setGender);
    // const setBirthday = userInfoQueryStore((state) => state.setBirthday);
    const switchPopupTab = userInfoQueryStore(state=>state.switchPopupTab);
    const [selectedGender, setSelectedGender] = useState(userInfo.gender);
    const setBirthday = userInfoQueryStore(state=>state.setBirthday);
    const onChange = (e) => {
        console.log('radio checked', e.target.value);
        setSelectedGender(e.target.value);  
        setGender(e.target.value);  
    };
    console.log("userInfo in gender page",userInfo);
    const handleOnClick = ()=>{
        setBirthday();
    }
    return (
        <div className="gender-outer-container">
                <div className='choose-gender-title-container'>
                    <LoginRegisterTitle title={"Your Profile"} handleBackwards={()=>switchPopupTab('sendVerifyEmail')} />
                </div>           
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
                    <Input
                        placeholder="Select Date and Time"
                        size="md"
                        type="date"
                        className="calendar-input"
                        />
                </div>
                <div className="next-button-section">
                    <NextButton type="submit" title='Next' width='180px' />
                </div>
            </div>
        )
}

export default ChooseGender