import StyledButtonV3 from '../../components/styled-button-v3/styled-button-v3.component';
import HomePic from '../../assets/home/home-pic.jpg';
import HomeFeatures from '../../components/home-features/home-features.component';
import HomeProcedure from '../../components/home-procedure/home-procedure.component';
import HomeDoctors from '../../components/home-doctors/home-doctors.component';
import HomeInstruments from '../../components/home-instruments/home-instruments.component';
import Footer from '../../components/footer/footer.component';

import './home.styles.scss';

import { Link } from 'react-router-dom';
import { useLayoutEffect } from 'react';

const Home = () => {
    useLayoutEffect(() => {
        window.scrollTo(-250, 0);
    });

    return (
        <div className='home'>
            <img className='home-pic animate__animated animate__slideInUp' src={HomePic} alt='homepage' />
            <div className='home-title-container animate__animated animate__slideInUp'>
                <h1 className='home-title-name'>charm community</h1>
                <p className='home-title-label'>One platform for all personal care seekers</p>
                <div className='home-title-btn-container'>
                    <Link className='home-title-btn-link'>
                        <StyledButtonV3 text='coming soon'/>
                    </Link>
                </div>
            </div>
            <HomeFeatures/>
            <div className='video-container'>
                <iframe 
                    className='video'
                    title='charm-video' 
                    src='https://www.youtube.com/embed/AZprJCr5FE0' 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen />
            </div>
            <HomeProcedure />
            <HomeDoctors />
            <HomeInstruments />
            <Footer />
        </div>
    )
}

export default Home;