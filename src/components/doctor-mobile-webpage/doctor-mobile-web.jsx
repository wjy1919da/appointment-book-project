import './doctor-mobile-web.styles.scss'
import HomeTitle from '../../components/home-title/home-title.component';
import DoctorSearchBackground from '../../assets/doctor/doctor-search-background.png';
import FeatureDoctor from '../../components/FeatureDoctor/feature-doctor.component';
import IntroDoctor from '../../components/intro-doctor/intro-doctor.component';
import DoctorSearchMultiInput from '../../components/doctor-search-multiInput/doctor-search-multiInput.component';
import DoctorPostGrid from '../../components/doctor-post-grid/doctor-post-grid.component';
import { useMediaQuery } from 'react-responsive';
const DoctorMobilWebpage = () => {
    const isMobile = useMediaQuery({ query: `(max-width: 768px)` }); 
    return (
        <div className='doctor-search-outer-continer-mobile'>
        <div className='doctor-search-hearder-container-mobile'>
            <div className='doctor-search-header-title-and-bar'>
                <HomeTitle title='Find Your Doctor' isMobile={isMobile} />
                <DoctorSearchMultiInput isMobile={isMobile} />
            </div>
            <div className='doctor-search-header-pic-container-mobile animate__animated animate__slideInUp'>
                <img src={DoctorSearchBackground} alt="Doctor Search" className="doctor-search-header-pic-mobile" />
            </div>
        </div>
        <div className="doctor-intro-container-mobile">
            <IntroDoctor isMobile={isMobile} />
        </div>
        <div className="doctor-feature-doctor-container-mobile">
            <FeatureDoctor isMobile={isMobile} />
        </div>
        <div className='doctor-post-part-mobile'>
            <span className="doctor-post-title-mobile">Post by doctor</span>
            <div className='doctor-post-grid-container-mobile'>
                <DoctorPostGrid />
            </div>
        </div>
    </div>
    )
}
export default DoctorMobilWebpage;