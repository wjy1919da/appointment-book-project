import './sub-instrument.styles.scss';
import SubTxt from '../../components/sub-txt/sub-txt.component';
import Footer from '../../components/footer/footer.component';
import { Link, useParams } from 'react-router-dom';
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
                    {"name":"What it Does"},
                    {"name":"How it work"}
                ]
            },
            {
                "body": [
                    {"name":"Target","value":['You ll work with your provider to determine if you re a  candidate and develop a personalized treatment plan.']},
                    {"name":"Freeze","value":['You ll work with your provider to determine if you re a candidate and develop a personalized treatment plan.']},
                    {"name":"Freeze ","value":['You ll work with your provider to determine if you re a candidate and develop a personalized treatment plan.']}
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
    const isMobile = useMediaQuery({ query: `(max-width: 767px)` });
    const isMedium = useMediaQuery({ query: `(min-width: 768px) and (max-width:1024px)` });
    const isLarge = useMediaQuery({ query: `(min-width: 1280px)` });
    const [selectedSection, setSelectedSection] = useState("description");
    // Todo: video need to be replace
    const videoUrl = "https://www.youtube.com/embed/AZprJCr5FE0";
    const formatTitle = (title) => {
        title = title.replace(/_/g, ' ');
        
        if (isMedium || isLarge) {
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
   
    const handleScroll = () => {
        const slideElement = document.getElementById("slide");
        const recommendationElement = document.getElementById("recommendation");
        const footerTop = footerRef.current ? footerRef.current.getBoundingClientRect().top : 0;
    
        if (window.scrollY >= 280) {
            if (slideElement) {
                slideElement.style.top = '60px';
                slideElement.style.position = 'fixed';
            }
        } else {
            if (slideElement) {
                slideElement.style.top = '370px';
                slideElement.style.position = 'absolute';
            }
        }
    
        if (window.scrollY >= 350) {
            if (recommendationElement && (footerTop - 15 > recommendationElement.getBoundingClientRect().bottom)) {
                recommendationElement.style.top = '220px';
                recommendationElement.style.position = 'fixed';
            } else if (recommendationElement && footerTop - 15 <= recommendationElement.getBoundingClientRect().bottom) {
                recommendationElement.style.top = `${footerTop - recommendationElement.offsetHeight - 15}px`; // 这里减去15px确保了15px的间隔
                recommendationElement.style.position = 'absolute';
            }
        } else {
            if (recommendationElement) {
                recommendationElement.style.top = '530px';
                recommendationElement.style.position = 'absolute';
            }
        }        
        checkWhichSectionInView();
    };
    
    useEffect(() => {
        handleScroll(); 
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => {
            window.removeEventListener('scroll', handleScroll);
        }
    }, []);     
    return (
        <div className='outer-container'>
             <div className='sub-instrument-container'>
            <div className='sub-instrument-left-container'>
                <div className='sub-instrument-title-container'>
                    <h3 className='sub-instrument-top-text'>Instrument</h3>
                  {/* Logo picture */}
                    <img src={imageToUse} alt={`${name} logo`} className='sub-instrument-logo-pic'/>
                    <h1 className='sub-instrument-normal-text' id='description'>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui, molestias. Soluta blanditiis cupiditate sed quibusdam aperiam quo, neque unde quod totam maxime necessitatibus id ipsa dolor alias debitis! Beatae, unde.
                    </h1>
                </div>
                <div className='instrument-sub-text'>
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
                    {isLarge&&<div className='instrument-recommendation-container' id='recommendation' >
                        <div className='instrument-recommendation-tilte'></div>
                        <RecommendationGrid/>
                    </div>}
                </div>
            </div>
         
        </div>
        <div className='instrument-footer-container' ref={footerRef}>
            <Footer />
        </div>
        </div>
       
    )
}

export default SubInstrument;