import StyledButtonV3 from '../../components/styled-button-v3/styled-button-v3.component';
import Footer from "../../components/footer/footer.component";
import { Link} from 'react-router-dom';
import { useLayoutEffect } from 'react';
import Collapsible from '../../components/Collapsible-FQA/collapsible-FQA.component';
import SubTxt from '../../components/sub-txt/sub-txt.component';
// import SubProcedurePhotos from '../../components/sub-procedure-photos/sub-procedure-photos.component';
import SubFooter from '../../components/sub-footer/sub-footer.component';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './sub-procedure.styles.scss';
import { getProcedures } from '../../utils/apiService';
import SubProcedureForm from '../../components/sub-procedure-form/sub-procedure-form.component';
import SubProcedureScroll from '../../components/sub-procedure-scroll/sub-procedure-scroll.component';
import SubProcedureFormV2 from '../../components/sub-procedure-form-v2/sub-procedure-form-v2.component';
import HomeLink from '../../components/home-link/home-link.component';
import SubProcedureReference from '../../components/sub-procedure-reference/sub-procedure-reference.component';
const SubProcedure = () => { 
    useLayoutEffect(() => {
        window.scrollTo(0, 0);
    });

    const handleScroll = () => {
        if (window.scrollY >= 280) {
            if (document.getElementById("slide")) {
                document.getElementById("slide").style.top = '60px';
            }
        } else {
            if (document.getElementById("slide")) {
                document.getElementById("slide").style.top = '340px';
            }
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });
    });

    // Mingqi
    const n =50;
    //Jingyi
    const { name } = useParams();
    const videoUrl = "https://www.youtube.com/embed/AZprJCr5FE0";
    // data from remote
    const [data, setData] = useState(null);
    const formatTitle = (title) => {
        return title.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    }
    useEffect(() => {
        const fetchData = async () => {
            // utils/apiService.js
            const response = await getProcedures({ name });
            setData(response); 
        };
        fetchData();
    }, [name]);  
    if (!data) {
        console.log('data is not valid');
        // you may return here or render some fallback UI
        return null; // or <div>Data is not valid</div> or any other fallback UI
    }
    if(!data.optionsForm){
        console.log('data.optionsForm is not valid');
        return null; // or <div>Data is not valid</div> or any other fallback UI
    }
    if(!data.beforeAndAfter){
        console.log('data.beforeAndAfter is not valid');
        // you may return here or render some fallback UI
        return null; // or <div>Data is not valid</div> or any other fallback UI
    }
    if(!data.optionsContent){
        console.log('data.optionsContent is not valid');
        // you may return here or render some fallback UI
        return null; // or <div>Data is not valid</div> or any other fallback UI
    }
    if(!data.sideEffect){
        console.log('data.sideEffect is not valid');
        // you may return here or render some fallback UI
        return null; // or <div>Data is not valid</div> or any other fallback UI
    }
    if(!data.reference){
        console.log('data.reference is not valid');
        // you may return here or render some fallback UI
        return null; // or <div>Data is not valid</div> or any other fallback UI
    }
    if(!data.beforeAndAfterImage){
        console.log('data.beforeAndAfterImage is not valid');
        // you may return here or render some fallback UI
        return null; 
    }
    if(!data.optionsForm){
        console.log('data.optionsForm is not valid');
        // you may return here or render some fallback UI
        return null;
    }
    if(!data.alternativeTreatmentForm){
        console.log('data.optionsForm is not valid');
        // you may return here or render some fallback UI
        return null;
    }
    if(!data.reasonContent){
        console.log('data.reasonContent is not valid');
        // you may return here or render some fallback UI
        return null;
    }   

    return (
    <div className='home-container'>
        <div className='section-container'>
            {/* Minqi part */}
            <div className='sub-procedure-left-container'>
                <div className='sub-procedure-title-container'>
                    <h3 className="sub-procedure-top-text">Procedure</h3>
                    <h1 className='sub-procedure-title-text' >{formatTitle(name)}</h1>
                    <br/>
                    <p className='sub-procedure-normal-text'>
                            Various means to restore a youthful appearance to an aging face. 
                            A high-safety procedure that helps patients regain their best youthful 
                            appearance by removing excess or sagging skin, smoothing deep folds, 
                            and lifting and tightening deep facial tissues.
                    </p>
                </div>
                {/* Ming qi sub text  */}
                <div className='sub-text'> 
                    {/* Minqi what section */}
                    <div className='what-section'>
                        <SubTxt title={'What is ' + formatTitle(name) + '?'} text={data.reasonContent} />
                        <Link className="watch-video" to = {videoUrl}>Watch Video</Link> 
                    </div>
                    {/* consider section */}
                    <div className='consider-section'>
                    <SubTxt title={'Why consider the ' + formatTitle(name) + '?'} text={data.reasonContent} />
                        {/* pros and cons */}
                        <ol className='pros-and-cons'>
                            {/*list-group-item  */}
                            <li class="list-group-item d-flex justify-content-between align-items-start" >
                                <div style={{color: "#A5A6A8"}}>Pros:</div>
                                <div className="ms-2 me-auto" style={{}}>
                                Lorem ipsum dolor sit amet, consectetur 
                                adipiscing elit, sed do eiusmod tempor 
                                incididunt ut labore et dolore magna aliqua
                                </div>
                            </li> 
                            <li class="list-group-item d-flex justify-content-between align-items-start" style={{marginTop:"16px"}}>
                                <div style={{color: "#A5A6A8"}}>Cons:</div>
                                <div class="ms-2 me-auto" style={{color:"#000000"}}>
                                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                                </div>
                            </li> 
                        </ol>
                    </div>
                </div>
         
            {/*Jingyi part  */}
            <div className='sub-procedure-option-form-container'>
                    <SubTxt title={'Procedure options'} text={data.optionsContent}/>
                    {/* option form */}
                    <SubProcedureForm data={data.optionsForm} />  
                </div>
                <div className='sub-procedure-side-effect'>
                    <SubTxt title={'Potential Side Effects'} text={data.sideEffect}/>
                </div>
                <div className='sub-procedure-scroll-container'>
                    <SubTxt title={'Before and After'} text={data.beforeAndAfter}/>
                    {/* scroll bar */}
                    <SubProcedureScroll data={data.beforeAndAfterImage} />
                    <HomeLink title = "View More Post" href = '/instrument/thermage'/>  
                </div>
                <div className='sub-procedure-form-ver'>
                    <div className='sub-title'>
                        Alternative treatments
                    </div>
                    {/* alternative treatment form */}
                    <SubProcedureFormV2 data  = {data.alternativeTreatmentForm}/>
                </div>
               
                {/* Minqi part FQA */}
                <div className="FQA-collapside">
                    <Collapsible/>
                </div>
                <div className='sub-procedure-reference'>
                    <div className='sub-title'>
                        References and resources
                    </div>
                    {/* reference */}
                    <SubProcedureReference reference = {data.reference}/>
                </div>     
            </div>
               {/* Minqi part - right side page*/}
            <div className='sub-procedure-right-container' onScroll={handleScroll}>
                <div className='sub-procedure-right-content'>
                    <div className='sub-procedure-right-board'>
                        <div className="right-board-text">
                            <span style={{color:"#A5A6A8"}}>Cost:</span>
                            <span style={{color:"#000000"}}>1k-2k</span>
                        </div>
                        <div className="right-board-text">
                            <span style={{color:"#A5A6A8"}}>Duration:</span>
                            <span style={{color:"#000000"}}>30 minutes</span>
                        </div>
                        <div className="right-board-text">
                            <span style={{color:"#A5A6A8"}}>Safety:</span>
                            <span style={{color:"#000000"}}>Non-invasive</span>
                        </div>
                        <div className="right-board-text">
                            <span style={{color:"#A5A6A8"}}>Satisfication Rate:</span>
                            <div>
                               <span className={`stars-container stars-${n}`}>★★★★★</span>
                            </div>
                        </div>
                        <div className="right-board-text">
                            <span style={{color:"#A5A6A8"}}>Pain:</span>
                            <span style={{color:"#000000"}}>Pain-Free</span>
                        </div> 
                    </div>
                    {/*Minqi - introduction-slide */}
                    <div className="introduction-slide" id='slide' >
                        <div className="introduction-icon"></div>
                            <div className="introduction-catalog">
                                <span className='introduction-title'>Introduction</span>
                                <span className='introduction-section'>Why consider facial rejuvenation</span>
                                <span className='introduction-section'>Procedure options</span>
                                <span className='introduction-section'>Potential Side Effects</span>
                                <span className='introduction-section'>Before and After</span>
                                <span className='introduction-section'>Alternative Treatments</span>
                                <span className='introduction-section'>FAQ</span>
                                <span className='introduction-section'>Reference</span>
                            </div>
                        </div>
                    </div>    
                </div>
           </div>
        <Footer />
      
    </div>
        
    )
}
export default SubProcedure;

