import { useLayoutEffect } from 'react';
import InstrumentPic from '../../assets/instrument/instrument-pic.jpg';
import HomeTitle from '../../components/home-title/home-title.component';
import { useMediaQuery } from 'react-responsive';
import { Link } from 'react-router-dom';
import InstrumentGrid from '../../components/instrument-grid/instrument-grid.component';
import InstrumentDoctor from '../../assets/doctor/featureDoctor1.png'
import './instrument.styles.scss';
import instrumentJSONData from './instrument-text-reduced.json';  // revert back to other json file when we add other backend instrument data!
import MainPageIntro from '../../components/main-page-intro/main-page-intro.component';

const Instrument = () => {
    // useLayoutEffect(() => {
    //     window.scrollTo(0, 0);
    // });
    //const isMobile = useMediaQuery({ query: `(max-width:1024px)` });
    console.log(instrumentJSONData);
    // const thermageObj = instrumentJSONData[0];

    return (
        <div className='instrument-container animate__animated animate__fadeIn'>
            <div>
                {/* {isMobile ? 
                (
                    'Mobile Component here!'
                ) : 
                (   <> */}
                        {/* <div className='instrument-top-container'>
                            <div className='instrument-title-container'>
                                <h2 className='instrument-text instrument-page-title'>Discover our most up-to-date instruments</h2>
                            </div>
                            <div className='instrument-title-container instrument-subtitle-container'>
                                <h4 className='instrument-text instrument-page-subtitle'>CharmLife helps you discover our instruments.</h4>
                            </div>
                            <div className='instrument-top-row'>
                                <div className='instrument-top-img-container animate__animated animate__slideInUp'>
                                    <div className='instrument-doctor-img-container'>
                                        <img src={InstrumentDoctor} alt='Doctor' className='instrument-doctor-img'/>
                                    </div>
                                </div>
                            </div>
                        </div> */}
                        <MainPageIntro 
                            title="Discover our most up-to-date instruments"
                            description="CharmLife helps you discover our instruments." />
                        <div className='instrument-body-container'>
                            <div className='instrument-body-title-container'>
                                <h2 className='instrument-text instrument-body-title'>Our Instruments</h2>
                            </div>
                            {instrumentJSONData.map((obj, index) => (
                                <div className='instrument-card' key={index}>
                                    <InstrumentCard instrumentObj={obj} />
                                </div>
                            ))}
                        </div>
                    {/* </>
                )} */}
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
        </div>
    )
}

const InstrumentCard = ({instrumentObj}) => {
    return (
        <div className='instrument-display-container'>
            <div className='instrument-display'>
                <div className='instrument-display-img-container'>
                    <img src={require(`../../assets/instrument/${instrumentObj?.name}Logo.png`)} alt='instrument logo' className='instrument-display-img' />
                </div>
                <div className='instrument-display-info-container'>
                    <div className='instrument-display-heading-container'>
                        <h3 className='instrument-display-heading'>{instrumentObj?.heading}</h3>
                    </div>
                    <div className='instrument-display-subheading-container'>
                        <h3 className='instrument-display-subheading'>{instrumentObj?.subheading}</h3>
                    </div>
                    {instrumentObj?.hasSubImage &&
                    <div className='instrument-display-subimage-container'>
                        <img src={require(`../../assets/instrument/${instrumentObj?.name}ProcessIcon.png`)} alt='instrument subimage' className='instrument-display-subimage' />
                    </div>}
                    <div className='instrument-learn-more-link-container'>
                        <Link to={`/instrument/${instrumentObj?.name}`} className='instrument-link'>Click to Learn More</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Instrument;