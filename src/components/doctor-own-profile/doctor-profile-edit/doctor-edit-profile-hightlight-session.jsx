import React from "react";
import arrowLeft from '../../../assets/user/doctor-arrow-left.png';
import arrowRight from '../../../assets/user/doctor-arrow-right.png'
import './doctor-edit-profile-highLight.styles.scss';
import creatPostIcon from '../../../assets/post/create-post-icon.png'

const DoctorEditHightLightSession = () => {
    return (
      <div className="doctor-edit-hightLight-session-container">
        <div className='doctor-edit-hightlight-title-container'>
            <div className='hightlight-title-text'>
                Hightlight Cases
            </div>
            <div className='hightlight-title-arrow-session'>
                <img src = {arrowLeft} style={{width:'24px',height:'24px'}}>
                </img>
                <img src = {arrowRight}  style={{width:'24px',height:'24px'}}>
                </img>
            </div>
        </div>
        <div className='doctor-edit-hightlight-post-container'>
            <div className='hightlight-creat-post-session'>
                <img src= {creatPostIcon}></img>
                <span className='hightlight-creat-post-text-container'>Lorem ipsum dolor sit amet, consectetur adipiscing</span>
            </div>
            <div className='hightlight-post-container'>
                <div className='hightlight-post-img'>
                </div>
                <div className='highlight-post-text'>
                    Description 1 lorum ipsum Description 1 lorum ipsumDescription 1 lorum ipsumDescription 1 lorum ipsum
                </div>
            </div>
            <div className='hightlight-post-container'>
                <div className='hightlight-post-img'>
                </div>
                <div className='highlight-post-text'>
                    Description 1 lorum ipsum Description 1 lorum ipsumDescription 1 lorum ipsumDescription 1 lorum ipsum
                </div>
            </div>
        </div>
      </div>
    );
  };
export default DoctorEditHightLightSession;