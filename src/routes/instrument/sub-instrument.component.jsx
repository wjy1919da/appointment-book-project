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

const SubInstrument = () => {
    useLayoutEffect(() => {
        window.scrollTo(0, 0);
    });
    
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
    const reference = ["https://www.runoob.com/html/html-lists.html","https://www.runoob.com/html/html-lists.html","https://www.example.com/xz2c5pd","https://www.example.com/qw7e3rf","https://www.example.com/vt1n6ml"];
    const beforeAndAfterImage = {"beforeAndAfterImage":[{"before":"facial_injection_before_group1.png","after":"facial_injection_after_group1.png"},{"before":"facial_injection_before_group2.png","after":"facial_injection_after_group2.png"},{"before":"facial_injection_before_group1.png","after":"facial_injection_after_group1.png"},{"before":"facial_injection_before_group2.png","after":"facial_injection_after_group2.png"},{"before":"facial_injection_before_group1.png","after":"facial_injection_after_group1.png"}]}
    const isPadAndWeb = useMediaQuery({ query: `(min-width: 768px)` });
    const isMobile = useMediaQuery({ query: `(max-width: 767px)` });
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
    return (
        
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
                <div className='sub-instrument-right-container-card'>

                </div>
            </div>
            {/* <Footer /> */}
        </div>
    )
}

export default SubInstrument;