import StyledButtonV3 from '../../components/styled-button-v3/styled-button-v3.component';
import Footer from "../../components/footer/footer.component";
import { Link} from 'react-router-dom';
import { useLayoutEffect } from 'react';
import Collapsible from '../../components/Collapsible-FQA/collapsible-FQA.component';
import SubTxt from '../../components/sub-txt/sub-txt.component';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './sub-procedure.styles.scss';
import { getProcedures } from '../../utils/apiService';
import SubProcedureForm from '../../components/sub-procedure-form/sub-procedure-form.component';
import SubProcedureScroll from '../../components/sub-procedure-scroll/sub-procedure-scroll.component';
import SubProcedureFormV2 from '../../components/sub-procedure-form-v2/sub-procedure-form-v2.component';
import HomeLink from '../../components/home-link/home-link.component';
import SubProcedureReference from '../../components/sub-procedure-reference/sub-procedure-reference.component';
import useGetProcedures from '../../hooks/useGetProcedures';
import HomeSpinner from '../../components/home-spinner/home-spinner.component';
import useProcedureQueryStore from '../../procedureStore.ts'
function safeJsonParse(str) {
    try {
        return JSON.parse(str);
    } catch (e) {
        return undefined;
    }
}
const SubProcedure = () => { 
    useLayoutEffect(() => {
        window.scrollTo(0, 0);
    });
    const handleScroll = () => {
        if (window.scrollY >= 280) {
            if (document.getElementById("slide")) {
                document.getElementById("slide").style.top = '60px';
                document.getElementById("slide").style.position = 'fixed';
            }
        } else {
            if (document.getElementById("slide")) {
                document.getElementById("slide").style.top = '350px';
                document.getElementById("slide").style.position = 'absolute';
            }
        }
    }
    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });
    });
    const n =50;
    const { name } = useParams();
    const setCategories = useProcedureQueryStore(state=>state.setCategories);
    const videoUrl = "https://www.youtube.com/embed/AZprJCr5FE0";
    const { data, isLoading, error } = useGetProcedures();
    const setCategoryId = useProcedureQueryStore(state=>state.setCategoryId);
    const procedureQuery = useProcedureQueryStore(state=>state.procedureQuery);
    useEffect(() => {
        setCategories(name);

    }, [name]);
    useEffect(() => {
        if (data?.data?.subcategories?.[0]?.categoryId) {
            setCategoryId(data.data.subcategories[0].categoryId);
        }
    }, [data]);

    const formatTitle = (title) => {
        title = title.replace(/_/g, ' ');
        return title.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    }
   
    var prosAndCons, optionsContent, beforeAndAfterImage, reference, alternativeTreatmentForm, cardInfo;

    if (isLoading) {
       return <HomeSpinner />;
    }
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
    }else{
        return <div className='error'>{data.msg}</div>;
    }
    
    return (
     <div className='home-container'>
        <div className='section-container'>
            <div className='sub-procedure-left-container'>
            <div className='sub-procedure-title-container'>
                <h3 className="sub-procedure-top-text">Procedure</h3>
                <h1 className='sub-procedure-title-text' >{formatTitle(name)}</h1>
                <br/>
                {data.data.description &&
                    <p className='sub-procedure-normal-text'>
                        {data.data.description}
                    </p>}
            </div>
            
            <div className='sub-text'> 
            {data.data?.subcategories[0] &&
                <div className='what-section'> 
                { data.data?.subcategories[0].explanation &&<SubTxt title={'What is ' + formatTitle(name) + '?'} text={data.data.subcategories[0].explanation} />}   
                { data.data?.subcategories[0].other &&<Link className="watch-video" to={data.data.subcategories[0].other}>Watch Video</Link>}
               </div>
            } 
                {/* consider section */}
                <div className='consider-section'>
                {data.data?.subcategories[1].explanatio &&<SubTxt title={'Why consider the ' + formatTitle(name) + '?'} text={data.data.subcategories[1].explanation} />}
                    {/* pros and cons */}
                    {prosAndCons && <ol className='pros-and-cons'>
                        {/*list-group-item  */}
                        { prosAndCons[0]&&
                            <li class="list-group-item d-flex justify-content-between align-items-start" >
                            <div style={{color: "#A5A6A8"}}>Pros:</div>
                                <div className="ms-2 me-auto" style={{}}>
                                    {prosAndCons[0]}  {/* Render the first item from the parsed array here */}
                                </div>
                            </li> 
                        }
                        {prosAndCons[1]&&
                            <li class="list-group-item d-flex justify-content-between align-items-start" style={{marginTop:"16px"}}>
                                        <div style={{color: "#A5A6A8"}}>Cons:</div>
                                        <div class="ms-2 me-auto" style={{color:"#000000"}}>
                                    {prosAndCons[1]} 
                                </div>
                            </li> }
                   </ol>}
                </div>
            </div>
            {data.data?.subcategories[2].explanation&&<div className='sub-procedure-option-form-container'>
                <SubTxt title={'Procedure options'} text={data.data.subcategories[2].explanation}/> 
                {optionsContent &&<SubProcedureForm data={optionsContent} />  }
            </div> }
            {data.data?.subcategories[6].explanation &&<div className='sub-procedure-side-effect'>
              <SubTxt title={'Potential Side Effects'} text={data.data.subcategories[6].explanation}/>
            </div>}
            {beforeAndAfterImage &&<div className='sub-procedure-scroll-container'>
                {data.data?.subcategories[3].explanation && <SubTxt title={'Before and After'} text={data.data.subcategories[3].explanation}/>}
                <SubProcedureScroll data={beforeAndAfterImage} />
                {/* <HomeLink title = "View More Post" href = '/posts'/>   */}
            </div>}
            {alternativeTreatmentForm &&<div className='sub-procedure-form-ver'>
                <div className='sub-title'>
                    Alternative treatments
                </div> 
                <SubProcedureFormV2 data  = {alternativeTreatmentForm}/>
            </div>}
           
            <div className="FQA-collapside">
                    <Collapsible/>
            </div>
            {reference &&<div className='sub-procedure-reference'>
                 <div className='sub-title'>
                    References and resources
                </div>
             <SubProcedureReference reference = {reference}/>
            </div>}    
            </div>
            {/* end of left side */}
            <div className='sub-procedure-right-container'  onScroll={handleScroll}>
                <div className='sub-procedure-right-content'>
                {cardInfo &&<div className='sub-procedure-right-board'>
                        <div className="right-board-text">
                            <span style={{color:"#A5A6A8"}}>Cost:</span>
                            <span style={{color:"#000000"}}>{cardInfo.Cost}</span>
                        </div>
                        <div className="right-board-text">
                            <span style={{color:"#A5A6A8"}}>Duration:</span>
                            <span style={{color:"#000000"}}>{cardInfo.Duration}</span>
                        </div>
                        <div className="right-board-text">
                            <span style={{color:"#A5A6A8"}}>Safety:</span>
                            <span style={{color:"#000000"}}>{cardInfo.Safety}</span>
                        </div>
                        <div className="right-board-text">
                            <span style={{color:"#A5A6A8"}}>Satisfication Rate:</span>
                            <div>
                               <span className={`stars-container stars-${n}`}>★★★★★</span>
                            </div>
                        </div>
                        <div className="right-board-text">
                            <span style={{color:"#A5A6A8"}}>Pain:</span>
                            <span style={{color:"#000000"}}>{cardInfo.Pain}</span>
                        </div> 
                    </div>}
                    <div className="introduction-slide" id='slide'>
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