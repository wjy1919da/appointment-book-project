import OriginalFooter from "../../components/footer/footer.component";
import { Link} from 'react-router-dom';
import { useLayoutEffect } from 'react';
import Collapsible from '../../components/Collapsible-FQA/collapsible-FQA.component';
import SubTxt from '../../components/sub-txt/sub-txt.component';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './sub-procedure.styles.scss';
import SubProcedureForm from '../../components/sub-procedure-form/sub-procedure-form.component';
import SubProcedureScroll from '../../components/sub-procedure-scroll/sub-procedure-scroll.component';
import SubProcedureFormV2 from '../../components/sub-procedure-form-v2/sub-procedure-form-v2.component';
import SubProcedureReference from '../../components/sub-procedure-reference/sub-procedure-reference.component';
import useGetProcedures from '../../hooks/useGetProcedures';
import HomeSpinner from '../../components/home-spinner/home-spinner.component';
import SubProcedureMobileExtraBottom from '../../components/sub-procedure-mobile-extra-bottom/sub-procedure-mobile-extra-bottom.component';
import useProcedureQueryStore from '../../procedureStore.ts'
import { useMediaQuery } from 'react-responsive';
import ErrorMsg from "../../components/error-msg/error-msg.component";
import { useState } from 'react';
import ProcedureCard from '../../components/procedure-card/procedure-card.component';
import RecommendationGrid from '../../components/recommendation-grid/recommendation-grid.component';
import { useRef } from 'react';
function safeJsonParse(str) {
    try {
        return JSON.parse(str);
    } catch (e) {
        
        return undefined;
    }
}
const Footer = React.forwardRef((props, ref) => {
    return <OriginalFooter ref={ref} {...props} />;
});

const SubProcedure = () => { 
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
    //const result = {"optionsForm":[{"header":[{},{"name":"Workstations"},{"name":"Technologies Covered"},{"name":"Technologies Included"}]},{"body":[{"name":"Workstations","value":["InMode Forma","InMode Evoke","InMode Morpheus8","InMode Votiva","InMode Lumecca","InMode DiolazeXL","InMode Triton","InMode Optimas","InMode Avance"]},{"name":"Technologies Covered","value":["Radiofrequency","Microneedling","IPL","Diode Laser","Fractional Coagulation","Temperature Monitoring","Auto-adjusting","Multi-Wavelength","Pulse Control"]},{"name":"Technologies Included","value":["Radiofrequency for skin tightening","Microneedling for collagen production","IPL for pigmentation and vascular lesions","Diode Laser for hair removal","Fractional Coagulation for skin resurfacing","Temperature Monitoring for safety","Auto-adjusting for custom treatment","Multi-Wavelength for various treatments","Pulse Control for optimized output"]}]}]};
    const handleScroll = () => {};
    // const handleScroll = () => {
    //     //console.log('scroll');
    //     const slideElement = document.getElementById("slide");
    //     const recommendationElement = document.getElementById("recommendation");
    //     const footerTop = footerRef.current ? footerRef.current.getBoundingClientRect().top : 0;
        
    //     if (!isMobile) {
    //         if (window.scrollY >= 280) {
    //             if (slideElement) {
    //                 slideElement.style.top = '64px';
    //                 slideElement.style.position = 'fixed';
    //                 if (recommendationElement) {
    //                     recommendationElement.style.top = (parseInt(slideElement.style.top, 10) + 330) + 'px';  // Introduction slide's top + 400px
    //                     recommendationElement.style.position = 'fixed';
    //                 }
    //             }
    //             if (recommendationElement) {
    //                 // 这里隐藏DOM后, 通过 getBoundingClientRect() 再获取DOM的大小和位置都为0，可以改为 visibility
    //                 const recommendationBottom = recommendationElement.getBoundingClientRect().bottom;
    //                 if (footerTop <= recommendationBottom) {
    //                     // recommendationElement.style.display = 'none';
    //                     recommendationElement.style.visibility = 'hidden';
    //                 } else {
    //                     // recommendationElement.style.display = 'block';
    //                     recommendationElement.style.visibility = 'visible';
    //                 }
    //             }
    //         } else 
    //         {
    //             //console.log("window.scrollY < 280",recommendationElement,slideElement);
    //             if (slideElement) {
    //                 slideElement.style.top = '350px';
    //                 slideElement.style.position = 'absolute';

    //                 if (recommendationElement) {
    //                     //console.log("recommendationElement adjust");
    //                     recommendationElement.style.top = (parseInt(slideElement.style.top, 10) + 330) + 'px';
    //                     recommendationElement.style.position = 'absolute';
    //                 }
    //             }
    //         }

    //         checkWhichSectionInView();
    //     }
    // };    
    const [loadingTimeout, setLoadingTimeout] = useState(false);
    const footerRef = useRef(null);
    // useEffect(() => {
    //     const initialize = () => {
    //         //console.log('initialize');
    //         handleScroll();
    //         window.addEventListener('resize', handleResize);
    //         window.addEventListener('scroll', handleScroll, { passive: true });
    //     }
    //     const handleResize = () => {
    //         window.removeEventListener('scroll', handleScroll);
    //         handleScroll(); // 重新调整位置
    //         window.addEventListener('scroll', handleScroll, { passive: true });
    //     }
    //     // 如果页面已加载，则直接调用initialize。否则，等待页面加载完成后再调用。
    //     if (document.readyState === "complete") {
    //         //console.log('complete');
    //         initialize();
    //     } else {
    //         //console.log('not complete');
    //         window.onload = initialize;
    //     }
    
    //     const timeout = setTimeout(() => {
    //         setLoadingTimeout(true);
    //     }, 5000);
    
    //     return () => {
    //         window.removeEventListener('resize', handleResize);
    //         window.removeEventListener('scroll', handleScroll);
    //         clearTimeout(timeout);
    //     };
    // }, []);
    const n =50;
    const [selectedSection, setSelectedSection] = useState("description");
   
    const { name } = useParams();
    const setCategories = useProcedureQueryStore(state=>state.setCategories);
    const videoUrl = "https://www.youtube.com/embed/AZprJCr5FE0";
    const { data, isLoading, error } = useGetProcedures();
    const setCategoryId = useProcedureQueryStore(state=>state.setCategoryId);
    const procedureQuery = useProcedureQueryStore(state=>state.procedureQuery);
    const isPadAndWeb = useMediaQuery({ query: `(min-width: 768px)` });
    const isMobile = useMediaQuery({ query: `(max-width: 767px)` });
    useEffect(() => {
        setCategories(name);
    }, [name]);
    useEffect(() => {
        if (data?.data?.subcategories?.[0]?.categoryId) {
            setCategoryId(data.data.subcategories[0].categoryId);
        }
    }, [data]);
    console.log('procedure-data',data);
    const formatTitle = (title) => {
        title = title.replace(/_/g, ' ');
        
        if (isPadAndWeb) {
            return title.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
        }
        if (isMobile) {
            return title.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('\n');
        }
    }
    var prosAndCons, optionsContent, beforeAndAfterImage, reference, alternativeTreatmentForm, cardInfo;
    if (data.data && data.data.subcategories) {
        if (data.data.subcategories[1]) {
            prosAndCons = data.data.subcategories[1].other ? safeJsonParse(data.data.subcategories[1].other) : undefined;
        }
        if (data.data.subcategories[2]) {
            optionsContent = data.data.subcategories[2].other ? safeJsonParse(data.data.subcategories[2].other) : undefined;

        }
        if (data.data.subcategories[3]) {
            const parsed = safeJsonParse(data.data.subcategories[3].other);
            beforeAndAfterImage = parsed ? parsed.beforeAndAfterImage : undefined;  
        }
        if (data.data.subcategories[4]) {
            reference = data.data.subcategories[4].other ? safeJsonParse(data.data.subcategories[4].other) : undefined;
           
        }
        if (data.data.subcategories[5]) {
            alternativeTreatmentForm = data.data.subcategories[5].other ? safeJsonParse(data.data.subcategories[5].other) : undefined;
          
        }
        if (data.data.subcategories[7]) {
            cardInfo = data.data.subcategories[7].other ? safeJsonParse(data.data.subcategories[7].other) : undefined;
        }
    }
    // else{
    //     //return <HomeSpinner />;
    //     return <ErrorMsg/>;
    // }
    // if (error) {
    //     return <ErrorMsg/>;
    // }
    if (isLoading && !loadingTimeout) {
        // If it's still loading and hasn't timed out, show the spinner
        return <HomeSpinner />;
    } else if (error && loadingTimeout) {
        // If there's an error and it has timed out, show the error message
        return (
            <div>
                <ErrorMsg/>
            </div>
        );
    }
    else if (data.data && data.data.subcategories) {
    return (
    <div>
        <div className='home-container'>
        <div className='section-container'>
            <div className='sub-procedure-left-container'>
            <div className='sub-procedure-title-container'>
                <h3 className="sub-procedure-top-text">Procedure</h3>
                <h1 className='sub-procedure-title-text' id = 'description'>{formatTitle(name)}</h1>
                {/* {data.data.description &&
                    <p className='sub-procedure-normal-text' >
                        {data.data.description}
                    </p>} */}
                <div className="sub-procedure-normal-text">
                    {data.data.description && <SubTxt text={data.data.description}/>}
                </div>   
            </div>

            {cardInfo &&
            <div className='sub-procedure-right-board-mobile'>
                            <ProcedureCard cardInfo={cardInfo}/>
                    </div>
                    }
            <div className='sub-text'> 
            {data.data?.subcategories[0] &&
                <div className='what-section'id = 'consider'> 
                { data.data?.subcategories[0].explanation &&<SubTxt title={'What is ' + formatTitle(name) + '?'} text={data.data.subcategories[0].explanation} />}   
                { data.data?.subcategories[0].other &&<Link className="watch-video" to={data.data.subcategories[0].other}>Watch Video</Link>}
               </div>
            } 
                {/* consider section */}
                <div className='consider-section' >
                {data.data?.subcategories[1].explanation &&<SubTxt title={'Why consider the ' + formatTitle(name) + '?'} text={data.data.subcategories[1].explanation} />}
                    {/* pros and cons */}
                    {prosAndCons && <ol className='pros-and-cons'>
                        {/*list-group-item  */}
                        { prosAndCons[0]&&
                            <li className="list-group-item d-flex justify-content-between align-items-start" >
                            <div style={{color: "#A5A6A8"}}>Pros:</div>
                                <div className="ms-2 me-auto" style={{}}>
                                    {prosAndCons[0]}  {/* Render the first item from the parsed array here */}
                                </div>
                            </li> 
                        }
                        {prosAndCons[1]&&
                            <li className="list-group-item d-flex justify-content-between align-items-start" style={{marginTop:"16px"}}>
                                        <div style={{color: "#A5A6A8"}}>Cons:</div>
                                        <div className="ms-2 me-auto" style={{color:"#000000"}}>
                                    {prosAndCons[1]} 
                                </div>
                            </li> }
                   </ol>}
                </div>
            </div>
            {data.data?.subcategories[2].explanation&&<div className='sub-procedure-option-form-container' id = 'options'>
                <SubTxt title={'Procedure options'} text={data.data.subcategories[2].explanation}/> 
                {optionsContent &&<SubProcedureForm data={optionsContent} />  }
            </div> }
            {data.data?.subcategories[6].explanation &&<div className='sub-procedure-side-effect' id = 'sideEffects'>
              <SubTxt title={'Potential Side Effects'} text={data.data.subcategories[6].explanation}/>
            </div>}
            {beforeAndAfterImage &&<div className='sub-procedure-scroll-container' id = 'beforeAndAfter'>
                {data.data?.subcategories[3].explanation && <SubTxt title={'Before and After'} text={data.data.subcategories[3].explanation}/>}
                <SubProcedureScroll data={beforeAndAfterImage} />
                {/* <HomeLink title = "View More Post" href = '/posts'/>   */}
            </div>}
            {alternativeTreatmentForm &&<div className='sub-procedure-form-ver' id = 'alternative'>
                <div className='sub-title'>
                    Alternative treatments
                </div> 
                <SubProcedureFormV2 data  = {alternativeTreatmentForm}/>
            </div>}
           
            <div className="FQA-collapside" id = 'faq'>
                    <Collapsible/>
            </div>
            {reference &&<div className='sub-procedure-reference' id = 'reference'> 
                 <div className='sub-title'>
                    References and resources
                </div>
             <SubProcedureReference reference = {reference} id = ''/>
            </div>}   
            </div>
            {/* end of left side */}
            <div className='sub-procedure-right-container'  onScroll={handleScroll}>
                {cardInfo &&
                    <div className='procedure-card-container-outer'>
                         <ProcedureCard cardInfo={cardInfo}/>
                    </div>
                }
                    <div className="introduction-slide-container">
                        <div className="introduction-slide" id='slide'>
                            <div className="introduction-icon"></div>
                            <div className="introduction-catalog">
                                <a
                                    href="#description"
                                    className={selectedSection === "description" ? 'introduction-section active ' : 'introduction-section'}
                                    //onClick={() => setSelectedSection("description")}
                                    >Introduction</a>
                                <a
                                    href="#consider"
                                    className={selectedSection === "consider" ? 'introduction-section active' : 'introduction-section'}
                                    //onClick={() => setSelectedSection("consider")}
                                    >Why consider {formatTitle(name)}</a>
                                {optionsContent &&
                                <a
                                    href="#options"
                                    className={selectedSection === "options" ? 'introduction-section active'  : 'introduction-section'}
                                    //onClick={() => setSelectedSection("options")}
                                    >Procedure options</a>}
                                <a
                                    href="#sideEffects"
                                    className={selectedSection === "sideEffects" ? 'introduction-section active' : 'introduction-section'}
                                    //onClick={() => setSelectedSection("sideEffects")}
                                    >Potential Side Effects</a>
                                {beforeAndAfterImage &&
                                <a
                                    href="#beforeAndAfter"
                                    className={selectedSection === "beforeAndAfter" ? 'introduction-section active' : 'introduction-section'}
                                    //onClick={() => setSelectedSection("beforeAndAfter")}
                                    >Before and After</a>} {alternativeTreatmentForm &&
                                <a
                                    href="#alternative"
                                    className={selectedSection === "alternative" ?  'introduction-section active ' :'introduction-section'}
                                    //onClick={() => setSelectedSection("alternative")}
                                    >Alternative Treatments</a>}
                                {/* NOTICE: Window.innerHeight can not access to these 2 sections */}
                                <a
                                    href="#faq"
                                    className={selectedSection === "faq" ? 'introduction-section active' :'introduction-section'}
                                    //onClick={() => setSelectedSection("faq")}
                                >FAQ</a>

                                {/* <a
                                    href="#reference"
                                    className={selectedSection === "reference" ? 'introduction-section active ' : 'introduction-section'}
                                    onClick={() => setSelectedSection("reference")}>Reference</a> */}
                            </div>
                        </div>
                        {isPadAndWeb && <div className='procedure-recommendation-container' id='recommendation'>
                            <RecommendationGrid isMobile={false} height={'210px'} />
                        </div>}
                    </div>
                </div>
            </div> 
            <SubProcedureMobileExtraBottom />  
            {isMobile && <div className='procedure-recommendation-container'>
                            <RecommendationGrid isMobile={false}  height={'300px'} />
            </div>}     
      </div>
     </div>
    )
}}
export default SubProcedure;