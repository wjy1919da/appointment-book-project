import ConsultingIcon from '../../assets/home/consulting-icon.gif';
import SharingIcon from '../../assets/home/sharing-icon.gif';
import SavingIcon from '../../assets/home/saving-icon.gif';
import DoctorImg from '../../assets/home/doctor_mobile.svg';
import vector from '../../assets/home/Vector.png';
import './home-doctor-page.styles.scss'
import HomeLink from '../home-link/home-link.component';
import StarRate from '../starRate/starRate';

const HomeDoctorPage = () => {
    return(
        <div className='Home-doctor-page'>
            <div className='home-doctor-page-pic animate__animated animate__slideInUp'>
               { <img src={DoctorImg} alt='doctorImg' className='doctor-page-img'></img> }
                <div className = 'doctor-page-name-card'>
                    <h5>Dr. Amir Karam</h5>
                    <p >Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia.</p>
                    <span className='starRatePart'>
                        <StarRate rateScore='50'/>
                    </span>
              </div>
           </div>
            <div className='home-doctor-page-container'>
                <div className='home-doctor-page-text'>
                   <span className='home-doctor-page-text1'>Consult A Doctor</span>
                </div>
                <div className='home-doctor-page-subText'>
                    <span className = 'doctor-page-post-Text'>
                        Our platform collaborates with top professionals and institutions to provide 
                        you with expert advice and support. 
                        Consult with our trusted partners about surgery procedures, 
                        coupons, and more.
                    </span>

                </div>
                <div className='home-doctor-page-link'>
                {/* <h3 className="underline-link">View More Posts</h3> */}
                <HomeLink title= "View More Doctors" href = "/doctor"/>
                    <img src={vector} alt="arrow" style={{width:"18px",height:"17px",marginTop:"3px",marginLeft:"10px", border: "None"}}></img>
                </div>
            </div>
        </div>
    )
}
export default HomeDoctorPage;