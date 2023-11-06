import './sub-instrument.styles.scss';
import SubTxt from '../../components/sub-txt/sub-txt.component';
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
import ProcedureCard from '../../components/procedure-card/procedure-card.component';
import InstrumentFAQ from '../../components/instrument-FQA/instrument-FQA.component'
import SubProcedureMobileExtraBottom from '../../components/sub-procedure-mobile-extra-bottom/sub-procedure-mobile-extra-bottom.component';
import useGetProcedures from '../../hooks/useGetProcedures';
import { useGetInstruments } from '../../hooks/useGetInstruments';
import { GetDetailedInstruments } from '../../hooks/useGetDetailedInstruments';
import useProcedureQueryStore from '../../procedureStore.ts'
function safeJsonParse(str) {
    try {
        return JSON.parse(str);
    } catch (e) {
        console.log('jsonproblem',e)
        return undefined;
    }
}
const SubInstrument = () => {
    const [data, setData] = useState({});
    const [subcategories, setSubcategories] = useState([]);
    const [error, setError] = useState(false);
    const images = {
        coolsculpting,
        inmode,
        thermage,
        fraxel_laser
    };
    const test_json = {"optionsForm":[{"header":[{},{"name":"Forehead Lines"},{"name":"Crow's Feet"},{"name":"Glabellar Lines"}]},{"body":[{"name":"Treatment Area","value":["Forehead","Outer corners of the eyes","Between the eyebrows"]},{"name":"Injection Depth","value":["Superficial","Medium","Medium"]},{"name":"Dose","value":["10-20 units","5-15 units","10-25 units"]},{"name":"Duration of Effect","value":["3-6 months","3-6 months","3-6 months"]}]}]}
    const result = {"optionsForm":[{"header":[{"name":"Workstations"},{"name":"Technologies Covered"},{"name":"Technologies Included"}]},{"body":[{"name":"InMode Forma","value":["Radiofrequency","Radiofrequency for skin tightening"]},{"name":"InMode Evoke","value":["Microneedling","Microneedling for collagen production"]},{"name":"InMode Morpheus8","value":["IPL","IPL for pigmentation and vascular lesions"]},{"name":"InMode Votiva","value":["Diode Laser","Diode Laser for hair removal"]},{"name":"InMode Lumecca","value":["Fractional Coagulation","Fractional Coagulation for skin resurfacing"]},{"name":"InMode DiolazeXL","value":["Temperature Monitoring","Temperature Monitoring for safety"]},{"name":"InMode Triton","value":["Auto-adjusting","Auto-adjusting for custom treatment"]},{"name":"InMode Optimas","value":["Multi-Wavelength","Multi-Wavelength for various treatments"]},{"name":"InMode Avance","value":["Pulse Control","Pulse Control for optimized output"]}]}]};
    const { name } = useParams();
    const setCategories = useProcedureQueryStore(state=>state.setCategories);
    // const { data, isLoading, error } = useGetProcedures();
    // const data = GetDetailedInstruments(name);
    // console.log('Data is: ', data);
    // let subcategories = data?.data?.data?.subcategories;
    // console.log('Subcategories is: ', subcategories);
    useEffect(() => {
        window.scroll(0, 0);
        setCategories(name);
        const getData = async () => {
            try {
                const res = await GetDetailedInstruments(name);
                console.log('res is: ', res);
                if (res?.code === 104) throw new Error();
                setData(res);
                setSubcategories(res.data.subcategories);
            } catch (err) {
                setError(true);
            }
        }
        getData();
    }, [name]);

    const imageToUse = images[name];
    function getSubCategory(index) {
        if (data && subcategories.length > index) {
            return subcategories[index];
        }
        return null;
    }
    var prosAndCons, mechanism,optionsContent, potentialAffetc,beforeAndAfterImage, reference, alternativeTreatmentForm, cardInfo;
    if (data && subcategories) {
       //console.log('optionsContentdata',data.data.subcategories[2].other)
       console.log('Creating subcategories!');
       const subCategory1 = getSubCategory(1);
       if (subCategory1) {
            // prosAndCons = subCategory1.explanation ? safeJsonParse(subCategory1.explanation) : undefined;
            prosAndCons = subCategory1.explanation ? subCategory1.explanation : undefined;
        }
       const subCategory2 = getSubCategory(2);
         if (subCategory2) {
            //  mechanism = subCategory2.other ? safeJsonParse(subCategory2.other) : undefined;
             mechanism = subCategory2.other ? safeJsonParse(subCategory2.other) : undefined;
              //console.log('optionsContentdata',optionsContent)
          }
        const subCategory3 = getSubCategory(3);
        if (subCategory3) {
            // optionsContent = subCategory3.other ? safeJsonParse(subCategory2.other) : undefined;
            optionsContent = subCategory3.other ? safeJsonParse(subCategory3.other) : undefined;
        }
        const subCategory4 = getSubCategory(4);
        if (subCategory4) {
            // potentialAffetc  = subCategory4.explanation ? safeJsonParse(subCategory2.explanation) : undefined;
            potentialAffetc  = subCategory4.explanation ? subCategory4.explanation : undefined;
        }
        // const subCategory4 = getSubCategory(4);
        // if (subCategory4) {
        //     reference = subCategory4.other ? safeJsonParse(subCategory4.other) : undefined;
           
        // }
        const subCategory5 = getSubCategory(5);
        if (subCategory5) {
            // const parsed = safeJsonParse(subCategory5.other);
            beforeAndAfterImage = subCategory5.other ? subCategory5.other : undefined;  
            // console.log('Before and After: ', beforeAndAfterImage);
        }
        const subCategory6 = getSubCategory(6);
        if (subCategory6) {
            reference = subCategory6.other ? [subCategory6.other] : undefined;
        }
        const subCategory7 = getSubCategory(7);
        if (subCategory7) {
            cardInfo = subCategory7.other ? safeJsonParse(subCategory7.other) : undefined;
        }
    }

    const isMobile = useMediaQuery({ query: `(max-width: 767px)` });
    const isMedium = useMediaQuery({ query: `(min-width: 768px) and (max-width:1023px)` });
    const isLarge = useMediaQuery({ query: `(min-width: 1024px)` });
    const isMediumOrLarge = isMedium || isLarge;
    const [selectedSection, setSelectedSection] = useState("description");
    const [screenAtBottom, setScreenAtBottom] = useState(false);
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
        if(!isMobile){
            if (window.scrollY >= 280) {
                if (slideElement) {
                    slideElement.style.top = '60px';
                    slideElement.style.position = 'fixed';
                }
            } else {
                if (slideElement) {
                    slideElement.style.top = '300px';
                    slideElement.style.position = 'absolute';
                }
            }
        
            if (window.scrollY >= 350) {
                if (recommendationElement && (footerTop - 15 > recommendationElement.getBoundingClientRect().bottom)) {
                    recommendationElement.style.top = '270px';
                    recommendationElement.style.position = 'fixed';
                    //console.log('HERE HERE HERE!')
                    // console.log('ScreenAtBottom is: ', screenAtBottom);
                    setScreenAtBottom(false);

                    // recommendationElement.style.display = 'block';  // 确保元素是可见的
                } else if (recommendationElement && footerTop <= recommendationElement.getBoundingClientRect().bottom) {
                    setScreenAtBottom(true);
                    // console.log('recommendationElement.getBoundingClientRect().bottom: ', recommendationElement.getBoundingClientRect().bottom);
                    // console.log('footerTop: ', footerTop);
                    // if (footerTop - recommendationElement.getBoundingClientRect().top < 15) {
                    //     // recommendationElement.style.display = 'none';  // 如果间隔小于15px，隐藏元素
                    //     console.log('Setting screenAtBottom to TRUE');
                    //     setScreenAtBottom(true);
                    // } else {
                    //     // recommendationElement.style.top = `${footerTop - recommendationElement.offsetHeight - 15}px`;
                    //     // recommendationElement.style.position = 'absolute';
                    //     // recommendationElement.style.display = 'block';  // 确保元素是可见的
                    //     console.log('Setting screen at bottom to FALSE');
                    //     setScreenAtBottom(false);
                    // }
                }
            } else {
                if (recommendationElement) {
                    recommendationElement.style.top = '510px';
                    recommendationElement.style.position = 'absolute';
                    //recommendationElement.style.display = 'block';  // 确保元素是可见的
                }
            }
            checkWhichSectionInView();
        }
    };
    
    useEffect(() => {
        const handleResize = () => {
            window.removeEventListener('scroll', handleScroll);
            handleScroll(); // 重新调整位置
            window.addEventListener('scroll', handleScroll, { passive: true });
        }
    
        const initialize = () => {
            handleScroll();
            window.addEventListener('resize', handleResize);
            window.addEventListener('scroll', handleScroll, { passive: true });
        }
    
        // 如果页面已加载，则直接调用initialize。否则，等待页面加载完成后再调用。
        if (document.readyState === "complete") {
            initialize();
        } else {
            window.onload = initialize;
        }
    
        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('scroll', handleScroll);
        }
    }, []);


    if (error) {
        return (
            <div className='instrument-error-page'>
                <h1 className='instrument-error-title'>Unable to find this instrument. Please try again later.</h1>
            </div>
        )
    }    

    return (
        <div className='outer-container'>
        <div className='sub-instrument-container'>
        <div className='sub-instrument-left-container'>
           <div className='sub-instrument-title-container'>
               <h3 className='sub-instrument-top-text'>Instrument</h3>
             {/* Logo picture */}
               <img src={imageToUse} alt={`${name} logo`} className='sub-instrument-logo-pic' id='description'/>
               {data?.data?.description&&
               <div style={{ marginTop: '-40px' }}>
                   <SubTxt text={data?.data?.description}/>
               </div>
               }
           </div>
           {isMobile&&<div className='instrument-card-mobile-container'>
               <ProcedureCard cardInfo={cardInfo}/>
           </div>}
           {subcategories[0] &&
           <div className='instrument-sub-text'>
               <div className='sub-instrument-what' id='consider'>
               { data.data?.subcategories[0].explanation &&<SubTxt title={'What is ' + formatTitle(name) + '?'} text={data.data.subcategories[0].explanation} />}   
               </div>
               { data.data?.subcategories[0].other && <Link className="sub-instrument-watch-video" to={data.data.subcategories[0].other}>Watch Video</Link>}
           </div>
        }
           {/* Form */}
           {
            prosAndCons&&
                <div className='instrument-sub-text'>
                        <SubTxt title={subcategories[1].subCategoryTitle} text={subcategories[1].explanation} />
                </div>
          }   
          {
            mechanism &&
            <div className='sub-instrument-option-form-container' id='options'>
                {mechanism&&<SubProcedureForm data ={mechanism}/>} 
            </div>
          }

           {optionsContent&&
           <div>
                <div className='instrument-sub-text'>
                    <SubTxt title={subcategories[3].subCategoryTitle} text={subcategories[3].explanation} />
                </div>
                <div className='sub-instrument-option-form-container' id = 'options'>
                        <SubProcedureForm data={optionsContent} />  
                </div>
           </div>
            }  
            {
                potentialAffetc &&
                <div>
                    <SubTxt title={subcategories[4].subCategoryTitle} text={subcategories[4].explanation} />
                </div>
            } 

           {beforeAndAfterImage&&
           <div className='sub-instrument-scroll-container' id = 'beforeAndAfter'>
              <SubTxt title={subcategories[5].subCategoryTitle} text={subcategories[5].explanation}/>
              {/* <SubProcedureScroll data={beforeAndAfterImage.beforeAndAfterImage} /> */}
              {/* <SubProcedureScroll data={beforeAndAfterImage} /> UNCOMMENT THIS AFTER WE ACTUALLY HAVE PICTURES! */}  
              <HomeLink title = "View More Post" href = '/posts'/>  
           </div>
            }
           <div className='instrument-FQA' id='faq'>
               <InstrumentFAQ/>
           </div>
           {reference
           &&
           <div className='sub-instrument-reference' id = 'reference'> 
               <div className='sub-instrument-title'>
                   References and resources
               </div>
               <SubProcedureReference reference={reference} id = ''/>
           </div>
           }
           {isMobile && <SubProcedureMobileExtraBottom />  }
           {isMobile && <div className='instrument-recommendation-container'>
                   <RecommendationGrid isMobile={false}  height={'250px'} />
           </div>}
       </div>
       <div className='sub-instrument-right-container'>
        {/* Card of right container */}
        {isMediumOrLarge && cardInfo &&<div className='instrument-card-container'><ProcedureCard cardInfo={cardInfo}/></div>}
        {isMediumOrLarge &&<div className="instrument-introduction-slide" id='slide' >
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
                        // onClick={() => setSelectedSection("consider")}
                        >Why consider {formatTitle(name)}</a>

                    {optionsContent &&
                    <a
                        href="#options"
                        className={selectedSection === "options" ? 'introduction-section active'  : 'introduction-section'}

                        //onClick={() => setSelectedSection("options")}
                        >Procedure options</a>}

                       {beforeAndAfterImage &&
                       <a
                           href="#beforeAndAfter"
                           className={selectedSection === "beforeAndAfter" ? 'introduction-section active' : 'introduction-section'}
                           //onClick={() => setSelectedSection("beforeAndAfter")}
                           >Before and After</a>} 
                       <a
                           href="#faq"
                           className={selectedSection === "faq" ? 'introduction-section active' : 'introduction-section'}
                           //onClick={() => setSelectedSection("faq")}
                           >FAQ</a>
                    </div>  
               </div>}
              
               {isMediumOrLarge && <div className='instrument-recommendation-container' id='recommendation'>
                   <RecommendationGrid isMobile={false} height={'250px'} />
               </div>}
           </div>
       </div>
   </div>
   </div>
  
)
}

export default SubInstrument;