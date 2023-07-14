import HomeDoctors from '../../components/home-doctors/home-doctors.component';
import HomeInstruments from '../../components/home-instruments/home-instruments.component';
import Footer from '../../components/footer/footer.component';
import arrow from '../../assets/home/arrow.png'
import { useState } from 'react';
import './home.styles.scss';
import HomePost from '../../components/home-post/home-post.component';
import HomeDoctorPage from '../../components/home-doctor-page/home-doctor-page.component';
import { Fragment, useLayoutEffect } from 'react';
import HomeButton from '../../components/home-button/home-button.component';
import Modal from 'react-bootstrap/Modal';

const Home = () => {
    useLayoutEffect(() => {
        window.scrollTo(0, 0);
    });
    const [show, setShow] = useState(false);
    const handleClose = () =>setShow(false);
    const handleShow = () => setShow(true);

    const videoUrl = "https://www.youtube.com/embed/AZprJCr5FE0";
    
    function handleClick() {
        window.open(videoUrl, "_blank");
    }

    return (
        <Fragment>
            <div className='home'>
                <div className='home-pic animate__animated animate__slideInDown'></div>
                <div className='home-title-container'>
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
                    <div className='home-title-buttons'>
                   
                        {/* <button type="button" className=' button home-title-button1' >Start Charm life</button> */}
                        <HomeButton title = "Start Charm life" href = '/download'/>
                        <button type="button" onClick={handleShow} className='button home-title-button2'>
                            <img src={arrow} alt="Button" className="button-image"></img>
                            <span className="button-text">Video</span>
                        </button>
                        
                        <Modal show={show} onHide={handleClose} size='xl' >
                        <div className="home-buttom-modal-container" style={{position:'absolute',top: '100px',width:'100%'}}>
                            <iframe src={videoUrl} style={{width:'100%',height:'600px', border: '10px solid white'}}/>
                        </div>
                        </Modal>
                        
                    </div>
                </div>
            </div>
            <HomePost/>
            <HomeDoctorPage/>
            <HomeDoctors />
            <HomeInstruments />
            <Footer />
        </Fragment>
    )
}

export default Home;