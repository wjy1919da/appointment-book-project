import React from 'react'
import MainDcotor from '../../assets/doctor/featureDoctor1.png'
import './main-page-intro.styles.scss'
const MainPageIntro = ({title, description}) => {
  return (
    <div className='main-page-header-container'>
    <div className='main-top-container'>
        <div className='main-title-container'>
            <h2 className='main-text main-page-title'>{title}</h2>
        </div>
        <div className='main-title-container main-subtitle-container'>
            <h4 className='main-text main-page-subtitle'>{description}</h4>
        </div>
        <div className='main-top-row'>
            <div className='main-top-img-container animate__animated animate__slideInUp'>
                <div className='main-doctor-img-container'>
                    <img src={MainDcotor} alt='Doctor' className='main-doctor-img'/>
                </div>
            </div>
        </div>
    </div>
    </div>
  )
}

export default MainPageIntro