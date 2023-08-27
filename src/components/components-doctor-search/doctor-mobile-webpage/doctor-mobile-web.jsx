import './doctor-mobile-web.styles.scss'
import HomeTitle from '../../home-title/home-title.component';
import DoctorSearchBackground from '../../../assets/doctor/doctor-search-background.png'; 
import DoctorSearchPhone from '../../../assets/doctor/doctor-search-phone.png';
import FeatureDoctor from '../doctor-search-feature/doctor-search-feature.component';
import IntroDoctor from '../doctor-search-info/doctor-search-info.component';
import DoctorSearchMultiInput from '../doctor-search-multiInput/doctor-search-multiInput.component';
import DoctorPostGrid from '../../components-posts/community-post-grid/doctor-post-grid.component';
import { useMediaQuery } from 'react-responsive';
const DoctorMobilWebpage = () => {
    const isMobile = useMediaQuery({ query: `(max-width: 1024px)` }); 
    const isPhone = useMediaQuery({ query: `(max-width: 767px)` });
    const isIpad = useMediaQuery({query: `(min-width: 768px) and (max-width:1024px)` });
    return (
        <div>
            {isMobile &&
            <div className='doctor-search-outer-continer-mobile'>
                <div className='doctor-search-hearder-container-mobile'>
                    <div className='doctor-search-header-title-and-bar'>
                        <HomeTitle title='Find Your Doctor' isMobile={isMobile} />
                        <DoctorSearchMultiInput  />
                    </div>
                    {isPhone &&
                    <div className='doctor-search-header-pic-container-mobile animate__animated animate__slideInUp'>
                        <img src={DoctorSearchBackground} alt="Doctor Search" className="doctor-search-header-pic-mobile" />
                    </div>}
                    {isIpad&&
                    (<div className='doctor-search-header-pic-container-ipad animate__animated animate__slideInUp'>
                        <img src={DoctorSearchBackground} alt='Doctor Search Background' className='doctor-search-header-pic-ipad'/>
                        <img src={DoctorSearchPhone} alt='Doctor Search Phone' className='doctor-search-header-phone-ipad'/> 
                    </div>)}
                </div>
                <div className="doctor-intro-container-mobile">
                    <IntroDoctor isMobile={isMobile} />
                </div>
                <div className="doctor-feature-doctor-container-mobile">
                    <FeatureDoctor  />
                </div>
                <div className='doctor-post-part-mobile'>
                    <span className="doctor-post-title-mobile">Post by doctor</span>
                    <div className='doctor-post-grid-container-mobile'>
                        <DoctorPostGrid/>
                    </div>
                </div>
            </div>
            }
        </div>
    )
}
export default DoctorMobilWebpage;