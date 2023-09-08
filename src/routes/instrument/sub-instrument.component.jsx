import SubInstrumentPic from '../../assets/instrument/sub-instrument-pic.jpg';
import texts from './instrument-text.json';
//import ThermagePhoto_1 from '../../assets/thermage/thermage-01.png';
// import ThermagePhoto_2 from '../../assets/thermage/thermage-02.png';
import './sub-instrument.styles.scss';
import SubTxt from '../../components/sub-txt/sub-txt.component';
import SubFooter from '../../components/sub-footer/sub-footer.component';
import Footer from '../../components/footer/footer.component';
// import SubInstrumentPhotos from '../../components/sub-instrument-photos/sub-instrument-photos.component';
import { Link, useParams } from 'react-router-dom';
// import InstrumentBenifits from '../../components/instrument-benefits/instrument-benefits.component';
import StyledButtonV3 from '../../components/styled-button-v3/styled-button-v3.component';
import { useLayoutEffect } from 'react';
import coolsculpting from '../../assets/instrument/coolsculpting.svg';
import thermage from '../../assets/instrument/thermage.svg';
import fraxel_laser from '../../assets/instrument/fraxel_laser.svg';
import inmode from '../../assets/instrument/inmode.svg';
import { useMediaQuery } from 'react-responsive';
import SubProcedureForm from '../../components/sub-procedure-form/sub-procedure-form.component';
import SubProcedureScroll from '../../components/sub-procedure-scroll/sub-procedure-scroll.component';
import HomeLink from '../../components/components-home/home-link/home-link.component';
import SubProcedureReference from '../../components/sub-procedure-reference/sub-procedure-reference.component';
import { useState,useEffect } from 'react';
import RecommendationGrid from '../../components/recommendation-grid/recommendation-grid.component';
import { useRef } from 'react';

const SubInstrument = () => {
    const images = {
        coolsculpting,
        inmode,
        thermage,
        fraxel_laser
    };
    const { name } = useParams();
    const imageToUse = images[name];
    const optionsContent = {
        "optionsForm": [
            {
                "header": [
                    {"name":"Silicone Implants"},
                    {"name":"Saline Implants"},
                    {"name":"Fat Transfer"}
                ]
            },
            {
                "body": [
                    {"name":"Procedure Type","value":["Surgical","Surgical","Non-Surgical"]},
                    {"name":"Anesthesia","value":["General","General","Local or General"]},
                    {"name":"Recovery Time","value":["6-8 weeks","6-8 weeks","Variable"]}
                ]
            }
        ]
    };
    const cardInfo = {
        Cost: "$5000 - $10000",
        Duration: "2 - 3 hours",
        Safety: "Generally Safe",
        SatisfactionRate: 4, // Assuming this is out of 5, hence '★★★★☆'
        Pain: "Mild to Moderate"
    };    
    const reference = ["https://www.runoob.com/html/html-lists.html","https://www.runoob.com/html/html-lists.html","https://www.example.com/xz2c5pd","https://www.example.com/qw7e3rf","https://www.example.com/vt1n6ml"];
    const beforeAndAfterImage = {"beforeAndAfterImage":[{"before":"facial_injection_before_group1.png","after":"facial_injection_after_group1.png"},{"before":"facial_injection_before_group2.png","after":"facial_injection_after_group2.png"},{"before":"facial_injection_before_group1.png","after":"facial_injection_after_group1.png"},{"before":"facial_injection_before_group2.png","after":"facial_injection_after_group2.png"},{"before":"facial_injection_before_group1.png","after":"facial_injection_after_group1.png"}]}
    const isPadAndWeb = useMediaQuery({ query: `(min-width: 768px)` });
    const isMobile = useMediaQuery({ query: `(max-width: 767px)` });
    const [selectedSection, setSelectedSection] = useState("description");
    // Todo: video need to be replace
    const videoUrl = "https://www.youtube.com/embed/AZprJCr5FE0";
    const formatTitle = (title) => {
        title = title.replace(/_/g, ' ');
        
        if (isPadAndWeb) {
            return title.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
        }
        if (isMobile) {
            return title.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('\n');
        }
    }
    const checkWhichSectionInView = () => {
        const sections = ['description', 'consider', 'options', 'sideEffects', 'beforeAndAfter', 'alternative', 'faq', 'reference'];
        for (const section of sections) {
            const element = document.getElementById(section);
            if (element) {
                const bounding = element.getBoundingClientRect();
                if ((bounding.top >= 0 && bounding.top <= window.innerHeight) || (bounding.bottom >= 0 && bounding.bottom <= window.innerHeight)) {
                    setSelectedSection(section);
                    break;
                }
            }
        }
    };
    const slideRef = useRef(null);
    const recommendationGridRef = useRef(null);
    const footerRef = useRef(null);
   
    let lastScrollTop = 0;  // 使用这个变量来存储上一次的滚动位置

    const handleScroll = () => {
        
        if (window.scrollY >= 280) {
            if (document.getElementById("slide")) {
                document.getElementById("slide").style.top = '60px';
                document.getElementById("slide").style.position = 'fixed';
            }
        } else {
            if (document.getElementById("slide")) {
                document.getElementById("slide").style.top = '370px';
                document.getElementById("slide").style.position = 'absolute';
            }
        }
        
        if (window.scrollY >= 350) {
            if (document.getElementById("recommendation")) {
                document.getElementById("recommendation").style.top = '220px';
                document.getElementById("recommendation").style.position = 'fixed';
            }
        } else {
            if (document.getElementById("recommendation")) {
                document.getElementById("recommendation").style.top = '530px';
                document.getElementById("recommendation").style.position = 'absolute';
            }
        }
        checkWhichSectionInView();

    };
    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });
    }, []); 
    return (
        <div className='outer-container'>
             <div className='sub-instrument-container'>
            <div className='sub-instrument-left-container'>
                 {/* <img src={logo2} alt="testing" /> */}
                <div className='sub-instrument-title-container'>
                    <h3 className='sub-instrument-top-text'>Instrument</h3>
                  {/* Logo picture */}
                    <img src={imageToUse} alt={`${name} logo`} className='sub-instrument-logo-pic'/>
                    <h1 className='sub-instrument-normal-text' id='description'>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui, molestias. Soluta blanditiis cupiditate sed quibusdam aperiam quo, neque unde quod totam maxime necessitatibus id ipsa dolor alias debitis! Beatae, unde.
                    </h1>
                </div>
                <div className='sub-text'>
                    <div className='sub-instrument-what' id='consider'>
                        <SubTxt title={'What is ' + formatTitle(name) + '?'} text={'Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui, molestias. Soluta blanditiis cupiditate sed quibusdam aperiam quo, neque unde quod totam maxime necessitatibus id ipsa dolor alias debitis! Beatae, unde.'} />
                    </div>
                    <Link className="sub-instrument-watch-video" to={videoUrl}>Watch Video</Link>
                </div>
                {/* Form */}
                <div className='sub-instrument-option-form-container' id = 'options'>
                    <SubProcedureForm data={optionsContent} /> 
                </div>
                <SubTxt title={'How long does ' + formatTitle(name) + ' take?'} text={'Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui, molestias. Soluta blanditiis cupiditate sed quibusdam aperiam quo, neque unde quod totam maxime necessitatibus id ipsa dolor alias debitis! Beatae, unde.'} />
                <div className='sub-instrument-scroll-container' id = 'beforeAndAfter'>
                   <SubTxt title={'Before and After'} text={'Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui, molestias. Soluta blanditiis cupiditate sed quibusdam aperiam quo, neque unde quod totam maxime necessitatibus id ipsa dolor alias debitis! Beatae, unde.'}/>
                   <SubProcedureScroll data={beforeAndAfterImage.beforeAndAfterImage} />
                   <HomeLink title = "View More Post" href = '/posts'/>  
                </div>
                <div className='sub-instrument-reference' id = 'reference'> 
                    <div className='sub-instrument-title'>
                        References and resources
                    </div>
                    <SubProcedureReference reference = {reference} id = ''/>
                </div>
            </div>
            <div className='sub-instrument-right-container'>
                <div>
                <div className='sub-instrument-right-container-card'>
                        <div className="sub-instrument-right-board-text">
                            <span style={{color:"#A5A6A8"}}>Cost:</span>
                            <span style={{color:"#000000"}}>{cardInfo.Cost}</span>
                        </div>
                        <div className="sub-instrument-right-board-text">
                            <span style={{color:"#A5A6A8"}}>Duration:</span>
                            <span style={{color:"#000000"}}>{cardInfo.Duration}</span>
                        </div>
                        <div className="sub-instrument-right-board-text">
                            <span style={{color:"#A5A6A8"}}>Safety:</span>
                            <span style={{color:"#000000"}}>{cardInfo.Safety}</span>
                        </div>
                        <div className="sub-instrument-right-board-text">
                            <span style={{color:"#A5A6A8"}}>Satisfication Rate:</span>
                            <div>
                               <span className={`stars-container stars`}>★★★★★</span>
                            </div>
                        </div>
                        <div className="sub-instrument-right-board-text">
                            <span style={{color:"#A5A6A8"}}>Pain:</span>
                            <span style={{color:"#000000"}}>{cardInfo.Pain}</span>
                        </div>  
                </div>
                <div className="instrument-introduction-slide" id='slide' >
                        <div className="introduction-icon"></div>
                        <div className="introduction-catalog">
                            <a
                                href="#description"
                                className={selectedSection === "description" ? 'introduction-section active ' : 'introduction-section'}
                                onClick={() => setSelectedSection("description")}>Introduction</a>
                            <a
                                href="#consider"
                                className={selectedSection === "consider" ? 'introduction-section active' : 'introduction-section'}
                                onClick={() => setSelectedSection("consider")}>Why consider {formatTitle(name)}</a>
                            {optionsContent &&
                            <a
                                href="#options"
                                className={selectedSection === "options" ? 'introduction-section active'  : 'introduction-section'}
                                onClick={() => setSelectedSection("options")}>Procedure options</a>}
                            {beforeAndAfterImage &&
                            <a
                                href="#beforeAndAfter"
                                className={selectedSection === "beforeAndAfter" ? 'introduction-section active' : 'introduction-section'}
                                onClick={() => setSelectedSection("beforeAndAfter")}>Before and After</a>} 
                        
                         </div>
                        
                    </div>
                    <div className='instrument-recommendation-container' id='recommendation' >
                        <RecommendationGrid/>
                    </div>
                    
                </div>
            </div>
         
        </div>
        <div className='instrument-footer-container'>
            <Footer />
        </div>
        </div>
       
    )
}

export default SubInstrument;