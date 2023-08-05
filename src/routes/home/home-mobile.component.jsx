import './home-mobile.styles.scss'
import { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import arrow from '../../assets/home/arrow.png'
import { useLayoutEffect } from 'react';
import PostContainerMobile from '../../assets/home/post_container.svg'
// src/assets/home/post_container.svg
import Doctor from '../../assets/home/doctor_mobile.svg'
//src/assets/home/doctor_mobile.svg
import StarRate from '../../components/starRate/starRate';
import HomeMobileSubText from './home-mobile-subText.component';
import HomeDoctors from '../../components/home-doctors/home-doctors.component';
import Tag1 from '../../assets/home/tag1.svg'
import Tag2 from '../../assets/home/tag2.svg'
import Tag4 from '../../assets/home/tag4.svg' 
import Footer from '../../components/footer/footer.component';
import HomeInstruments from '../../components/home-instruments/home-instruments.component';
import HomeButton from '../../components/home-button/home-button.component';
import { Link } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';

const HomeMobile = () => {
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  });
  const [show, setShow] = useState(false);
  const handleClose = () =>setShow(false);
  const handleShow = () => setShow(true);
  const procedures_names = ['botox_injections', 'breast_augmentation','chemical_peels','lip_augmentation','teeth_whitening']
  const instruments_names = ['thermage', 'inmode', 'coolsculpting', 'fraxel_laser'];
  const videoUrl = "https://www.youtube.com/embed/AZprJCr5FE0";
  const isIpad = useMediaQuery({ query: `(min-width: 768px)` });

  function handleClick() {
      window.open(videoUrl, "_blank");
  }
  const proceduresGrid = procedures_names.map((name) =>
    <div className='home-mobile-procedure' key={name}>
      <img src={require(`../../assets/procedure/${name}.svg`)} className='home-mobile-procedure-pic' alt={name} />
    </div>
  )
  const instrumentsGrid = instruments_names.map((name) =>
    <div className='home-mobile-instrument' key={name}>
      <img src={require(`../../assets/instrument/${name}.svg`)} className='home-mobile-instrument-pic' alt={name} />
    </div>
  )


  return (
    <div className='home-mobile-container'>
      <div className='home-mobile-intro-container'>
            <div className='home-mobile-intro-pic-container'>
              <div className='home-mobile-intro-pic animate__animated animate__slideInDown'></div>
            </div>
            <div className='home-mobile-intro-content-container'>
                <HomeMobileSubText title='Charm' content='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut'></HomeMobileSubText>
                <button type="button" onClick={handleShow} className='home-mobile-intro-button'>
                    <img src={arrow} alt="Button" className="home-mobile-intro-button-image"></img>
                    <span className="home-mobile-intro-button-text">Watch Video</span>
                </button>
            </div>
      </div>
      <div className='home-mobile-share-container'>
        <div className='home-mobile-share-pic-container'>
           <div className='home-mobile-share-pic animate__animated animate__slideInUp'> </div>
           <img src={PostContainerMobile} alt="postcontainer" className='home-mobile-share-postContainer'></img>
           {/* {isIpad && <img
                srcset="../../assets/home/post_container.svg 480w, ../../assets/home/post-container-ipad.png 800w"
                sizes="(max-width: 768px) 480px,
                      800px"
                src="../../assets/home/post-container-ipad.png"
                alt="Post container" />} */}
           <img src={Tag1} className='home-mobile-share-tag1'></img>
           <img src={Tag4} className='home-mobile-share-tag4'></img>
           <img src={Tag2} className='home-mobile-share-tag2'></img>
        </div>
        <div className='home-mobile-share-content-container'>
            <HomeMobileSubText title='Share' content='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut'></HomeMobileSubText>
            <Link to='/posts' className='home-mobile-share-link'>View More Posts</Link>
        </div>
      </div>
      <div className='home-mobile-consulting-container'>
            
            <div className='home-mobile-consulting-pic animate__animated animate__slideInUp'></div>
        
            <img src={Doctor} alt="doctor" className='home-mobile-consulting-doctorPic'></img>
            <div className = 'home-mobile-name-card'>
                    <div className='card-title'>Dr. Amir Karam</div>
                    <div className='card-content'>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia.</div>
                    <span className='home-mobile-starRatePart'>
                        <StarRate rateScore='50'/>
                    </span>
            </div>
            <div className='home-mobile-consulting-content'>
                <HomeMobileSubText title='Consult' content='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut'></HomeMobileSubText>
                <div style={{marginTop: '10px'}}>
                  <Link to='/doctor' className='home-mobile-share-link'>View More Doctors</Link>
                </div>
            </div>  
      </div>
      <div className='home-mobile-app-container'>
          <div className='home-mobile-app-background'>
            <div className='home-mobile-app-phone'>
              <div className='home-mobile-app-phone-screen'></div>
            </div>
          </div>
          <div className='home-mobile-app-button-container'>
            <HomeButton title="Try Charm App" href = "/download"/>
          </div>
          <div className='home-mobile-app-text'>
             Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore 
          </div>
      </div>
      <div className='home-mobile-procedure-container'>
        <div className='home-mobile-procedure-title-container'>
              <div className='home-mobile-procedure-title-text'>
                  Procedures
              </div>
              <Link to='procedure/breast_augmentation' className='home-mobile-procedure-link'>
                    View All
              </Link>
        </div>
        <div className='home-mobile-procedure-grid'>
            { proceduresGrid}
        </div>
      </div>
     <div className='home-mobile-procedure-container'>
         <div className='home-mobile-procedure-title-container'>
                <div className='home-mobile-procedure-title-text'>
                    Instruments
                </div>
                <Link to='procedure/breast_augmentation' className='home-mobile-procedure-link'>
                    View All
                </Link>
          </div>
          <div className='home-mobile-procedure-grid'>
              {instrumentsGrid}
          </div>
     </div>
       <Footer/>
    </div>
  )
}

export default HomeMobile