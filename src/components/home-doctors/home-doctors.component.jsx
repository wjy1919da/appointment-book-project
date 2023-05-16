import backgroundImage from '../../assets/home/home-apple-section-ring.png'
import  PhoneImage from '../../assets/home/home-apple-section.png'
import PhoneScreen from '../../assets/home/home-apple-section-screen.png'
import HomeText from '../home-text/home-text.component';
import HomeButton from '../home-button/home-button.component';
import './home-doctors.styles.scss'
// phone image
const HomeDoctors = () => {
    return (
        <div className = 'home-doctors-container'>
            <div  className='home-doctors-background' style={{ backgroundImage: `url(${backgroundImage})` }}>
                <div className = 'home-doctor-apple-section'>
                    <img className='phone-image' src={PhoneImage} alt="Phone Image" />
                    <div className = 'home-doctor-apple-screen'>
                        <img className='phone-screen' src={PhoneScreen} alt="Phone Screen" />
                    </div>
                </div>
                <div className='home-doctors-text'>
                    <HomeText 
                        title="Community" 
                        content={`Our app is a welcoming community of beauty lovers like you.
                    Join us today and connect with like-minded individuals who share your passion for personal care.`}
                    />
                    <div className='home-doctors-button'>
                        <HomeButton title="Download App" href = "/procedure/facial-rejuvenation"/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomeDoctors;