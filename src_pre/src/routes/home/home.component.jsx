import StyledButtonV3 from '../../components/styled-button-v3/styled-button-v3.component';
import HomePic from '../../assets/home/home-pic1.png';
import HomeFeatures from '../../components/home-features/home-features.component';
import HomeProcedure from '../../components/home-procedure/home-procedure.component';
import HomeDoctors from '../../components/home-doctors/home-doctors.component';
import HomeInstruments from '../../components/home-instruments/home-instruments.component';
import Footer from '../../components/footer/footer.component';
import arrow from '../../assets/home/arrow.png'
import './home.styles.scss';
import HomePost from '../../components/home-post/home-post.component';
import HomeDoctorPage from '../../components/home-doctor-page/home-doctor-page.component';
import { Link } from 'react-router-dom';
import { useLayoutEffect } from 'react';
import HomeButton from '../../components/home-button/home-button.component';


const Home = () => {
    useLayoutEffect(() => {
        window.scrollTo(-250, 0);
    });
    const videoUrl = "https://www.youtube.com/embed/AZprJCr5FE0";

    function handleClick() {
        window.open(videoUrl, "_blank");
    }

    return (
        <div className='home'>

          <div className='home-pic animate__animated animate__slideInUp'></div>
            <div className='home-title-container'>
                <div className='home-title-text'>
                    <span className='home-title-text1'>Charm Community</span>
                    <span className='home-title-text2'>For All Beauty Lovers</span>
                </div>
                <div className ='home-title-subText'>
                    <p className='ptext'> Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                        Ut enim ad minim veniam, quis nostrud exercitation ullamco 
                        laboris nisi ut aliquip ex ea commodo consequat.</p>
                </div>
                <div className='home-title-button'>
                    {/* <button type="button" className=' button home-title-button1' >Start Charm life</button> */}
                    <HomeButton title = "Start Charm life" href = '/instrument/thermage'/>
                    <button type="button" onClick={handleClick} className=' button home-title-button2'>
                            <img src={arrow} alt="Button Image" className="button-image"></img>
                            <span className="button-text">Video</span>
                    </button>

                </div>
            </div>
            <HomePost/>
            <HomeDoctorPage/>
            <HomeDoctors />
            <HomeInstruments />
            <Footer />
        </div>
    )
}

export default Home;