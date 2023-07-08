import './home-mobile.styles.scss'
import DoctorPostGridMobile from '../../components/doctor-post-grid/doctor-post-grid-mobile.component';
import PostGridMobileFollow from '../../components/doctor-post-grid/postGrid-mobile-follow.component';
import { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
const HomeMobile = () => {
  const tabs = ['Follow', 'Explore', 'Nearby'];
  const [activeTab, setActiveTab] = useState(0);
  const selectTab = (index) => {
    setActiveTab(index);
  }
  return (
    <div>
      <div className='home-outter-container'>
        <div className='home-header-tabs'>
          {tabs.map((item, index) => (
            <div
              className={`home-header-tab ${activeTab === index ? 'active' : ''}`}
              onClick={() => selectTab(index)}
            >
              {item}
              <div className="home-header-tab-underline"></div>
            </div>
          ))}
          {/* <SearchIcon/> */}
        </div>
       
        {activeTab === 0 && <div><PostGridMobileFollow/></div>}
        {activeTab === 1 && <div><DoctorPostGridMobile/></div>}
        {activeTab === 2 && <div><DoctorPostGridMobile/></div>}
      </div>
    </div>
  )
}

export default HomeMobile