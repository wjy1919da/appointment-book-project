import HomeDoctors from '../../components/components-home/home-doctors/home-doctors.component';
import HomeInstruments from '../../components/components-home/home-instruments/home-instruments.component';
import Footer from '../../components/footer/footer.component';
import arrow from '../../assets/home/arrow.png'
import { useState } from 'react';
import './home.styles.scss';
import HomeMobileSubText from '../../components/components-home/home-text-mobile/home-mobile-subText.component';
import HomePost from '../../components/components-home/home-post/home-post.component';
import HomeDoctorPage from '../../components/components-home/home-doctor-page/home-doctor-page.component';
import { Fragment, useLayoutEffect } from 'react';
import HomeButton from '../../components/home-button/home-button.component';
import Modal from 'react-bootstrap/Modal';
import videoUrl from '../../assets/home/App-Demo-V10.mp4';
import HomePic from '../../assets/home/home-pic1.png';
import HomePicIpad from '../../assets/home/5-ipad.png';
import HomePicMobile from '../../assets/home/5.svg';
import { useMediaQuery } from 'react-responsive';
const Home = () => {
    useLayoutEffect(() => {
        window.scrollTo(0, 0);
    });
    const [show, setShow] = useState(false);
    const handleClose = () =>setShow(false);
    const handleShow = () => setShow(true);
    const isMobile = useMediaQuery({ query: `(max-width: 767px)` });
    const isIpad = useMediaQuery({ query: `(min-width: 768px) and (max-width: 1023px)` });
    const isMobileOrIpad = isMobile || isIpad;
    function handleClick() {
        window.open(videoUrl, "_blank");
    }
    return (
        <Fragment>
            <div className='home'>
             <div className='home-mobile-intro-container'>
                <div className='home-title-container'>
                    {/* Web */}
                    {!isMobileOrIpad&& <Fragment>
                            <div className='home-title-text'>
                                Charm Community 
                                <br/>
                                For All Beauty Lovers
                            </div>
                            <div className ='home-title-subText'>
                                <p className='ptext'> Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                                    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                                    Ut enim ad minim veniam, quis nostrud exercitation ullamco 
                                    laboris nisi ut aliquip ex ea commodo consequat.
                                </p>
                            </div>
                     </Fragment>}
                        {isMobileOrIpad&& <div className='home-mobile-text-container'><HomeMobileSubText title='Charm' content='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut'></HomeMobileSubText></div>}
                        <div className='home-title-buttons'>
                        {/* <button type="button" className=' button home-title-button1' >Start Charm life</button> */}
                            {!isMobile&&<HomeButton height="56px" title = "Start Charm life" href = '/download'/>}
                            <button type="button" onClick={handleShow} className='button home-title-button2'>
                                <img src={arrow} alt="Button" className="button-image"></img>
                                {!isMobile&&<span className="button-text">Video</span>}
                                {isMobile&&<span className="button-text">Watch Video</span>}
                            </button>
                            <Modal show={show} onHide={handleClose} size='xl' >
                                <div className="home-buttom-modal-container" style={{position:'absolute',top: '100px',width:'100%'}}>
                                    <iframe src={videoUrl} style={{width:'100%',height:'600px', border: '10px solid white'}}/>
                                </div>
                            </Modal>
                        </div>
                  </div>
                   <div className='home-mobile-intro-pic-container'>
                        {!isMobileOrIpad&&<img src={HomePic} className='home-pic animate__animated animate__slideInDown'></img>}
                        {isIpad&&<img src={HomePicIpad} className='home-pic animate__animated animate__slideInDown'></img>}
                        {isMobile&&<img src={HomePicMobile} className='home-pic animate__animated animate__slideInDown'></img>}
                    </div>
                </div>
            </div>
            <HomePost/>
            <HomeDoctorPage/>
            <HomeDoctors />
            <HomeInstruments />
            <div className='home-footer-container'>
                <Footer/> 
            </div>
        </Fragment>
    )
}

export default Home;