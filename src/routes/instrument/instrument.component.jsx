import { useLayoutEffect } from 'react';
import InstrumentPic from '../../assets/instrument/instrument-pic.jpg';
import HomeTitle from '../../components/home-title/home-title.component';
import { useMediaQuery } from 'react-responsive';
import Footer from '../../components/footer/footer.component';
import InstrumentGrid from '../../components/instrument-grid/instrument-grid.component';
import InstrumentDoctor from '../../assets/doctor/featureDoctor1.png'
import './instrument.styles.scss';

const Instrument = () => {
    useLayoutEffect(() => {
        window.scrollTo(0, 0);
    });
    const isMobile = useMediaQuery({ query: `(max-width: 1024px)` });

    return (
        <div className='instrument-container animate__animated animate__fadeIn'>
            <div>
                {isMobile ? 
                (
                    'Mobile Component here!'
                ) : 
                (
                    <div className='instrument-top-container'>
                        <div className='instrument-title-container'>
                            <h2 className='instrument-text instrument-page-title'>Discover our most up-to-date instruments</h2>
                        </div>
                        <div className='instrument-title-container instrument-subtitle-container'>
                            <h4 className='instrument-text instrument-page-subtitle'>CharmLife helps you discover out instruments.</h4>
                        </div>
                        <div className='instrument-top-row'>
                            <div className='instrument-top-img-container animate__animated animate__slideInUp'>
                                <div className='instrument-doctor-img-container'>
                                    <img src={InstrumentDoctor} alt='Doctor' className='instrument-doctor-img'/>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            {/* <img className='instrument-pic' src={InstrumentPic} alt='instrument' />
            <div className='slide-in-animation'>
                <h2 className='instrument-title'>
                    FEATURED INSTRUMENTS
                </h2>
                <hr className='instrument-divider'/>
            </div>

            <div className='instrument-grid-container'>
                <InstrumentGrid />
            </div> */}
            <Footer isMobile={isMobile} />
        </div>
    )
}

export default Instrument;