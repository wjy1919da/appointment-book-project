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
import useGetProcedures from '../../hooks/useSearchDoctors';
import HomeSpinner from '../../components/home-spinner/home-spinner.component';
const SubProcedure = () => { 
   // Mingqi
   //console.log("sub-procedure");
   const n =50;
   //Jingyi
   const { name } = useParams();
   const videoUrl = "https://www.youtube.com/embed/AZprJCr5FE0";
   // data from remote
   const [localData, setLocalData] = useState(null);
   const [page] = useState(1); // Set your desired initial page here
   const [reFetchCount, setReFetchCount] = useState(0);

   

   const { data, isLoading, error } = useGetProcedures(name,page);

   const formatTitle = (title) => {
       return title.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
   }
   const reFetchData = () => {
    if (reFetchCount >= 1) {
      // We have tried enough, stop here
      return <div className='error'>No available data</div>;
    }
    setReFetchCount(reFetchCount + 1);
  };
  // 这部分的处理可以简化吗？
  useEffect(() => {
    window.scrollTo(0, 0);
    // Here you set localData when data is updated
    if (data && data.data) {
        setLocalData(data.data);

        if(!data.data.subcategories || 
           !data.data.subcategories[2] || !data.data.subcategories[2].other ||
           !data.data.subcategories[3] || !data.data.subcategories[3].other ||
           !data.data.subcategories[4] || !data.data.subcategories[4].other||
           !data.data.subcategories[5] || !data.data.subcategories[5].other||
           !data.data.subcategories[7] || !data.data.subcategories[7].other||
            !data.data.subcategories[6] || !data.data.subcategories[6].other) {
            reFetchData();
        }
    } else {
        reFetchData();
    }
   }, [name, data, reFetchCount]);  // Added data as a dependency here// Added data as a dependency here
   //console.log(localData);
   if (isLoading) {
       return <HomeSpinner />;
    }
    if (!localData || !localData.subcategories) {
        return <div className='error'>Error: Data is not available</div>;
    }    
    const prosAndCons = JSON.parse(localData.subcategories[1].other);
    const optionsContent = JSON.parse(localData.subcategories[2].other);
    const beforeAndAfterImage = JSON.parse(localData.subcategories[3].other).beforeAndAfterImage;
    const reference = JSON.parse(localData.subcategories[4].other);
    const alternativeTreatmentForm = JSON.parse(localData.subcategories[5].other);
    const cardInfo = JSON.parse(localData.subcategories[7].other);
    //console.log("cardInfo",cardInfo.Cost);
    
    return (
     <div className='home-container'>
        <div className='section-container'>
           
           
          
            <div className='sub-procedure-left-container'>
            <div className='sub-procedure-title-container'>
                <h3 className="sub-procedure-top-text">Procedure</h3>
                <h1 className='sub-procedure-title-text' >{formatTitle(name)}</h1>
                <br/>
                <p className='sub-procedure-normal-text'>
                        {localData.description}
                </p>
            </div>
            
            <div className='sub-text'> 
              
                <div className='what-section'> 
                    <SubTxt title={'What is ' + formatTitle(name) + '?'} text={localData.subcategories[0].explanation} />   
                    <Link className="watch-video" to={localData.subcategories[0].other}>Watch Video</Link>
                </div>
                {/* consider section */}
                <div className='consider-section'>
                <SubTxt title={'Why consider the ' + formatTitle(name) + '?'} text={localData.subcategories[1].explanation} />
                    {/* pros and cons */}
                   <ol className='pros-and-cons'>
                        {/*list-group-item  */}
                        <li class="list-group-item d-flex justify-content-between align-items-start" >
                            <div style={{color: "#A5A6A8"}}>Pros:</div>
                            <div className="ms-2 me-auto" style={{}}>
                                {prosAndCons[0]}  {/* Render the first item from the parsed array here */}
                            </div>
                        </li> 
                        <li class="list-group-item d-flex justify-content-between align-items-start" style={{marginTop:"16px"}}>
                                    <div style={{color: "#A5A6A8"}}>Cons:</div>
                                    <div class="ms-2 me-auto" style={{color:"#000000"}}>
                                {prosAndCons[1]} 
                            </div>
                        </li> 
                   </ol>
                </div>
            </div>
        <div className='sub-procedure-option-form-container'>
                <SubTxt title={'Procedure options'} text={localData.subcategories[2].explanation}/>
                {/* option form */}
                <SubProcedureForm data={optionsContent} />  
            </div>
            <div className='sub-procedure-side-effect'>
                <SubTxt title={'Potential Side Effects'} text={localData.subcategories[6].explanation}/>
            </div>
            <div className='sub-procedure-scroll-container'>
                <SubTxt title={'Before and After'} text={localData.subcategories[3].explanation}/>
                {/* scroll bar */}
                <SubProcedureScroll data={beforeAndAfterImage} />
                <HomeLink title = "View More Post" href = '/instrument/thermage'/>  
            </div>
            <div className='sub-procedure-form-ver'>
                <div className='sub-title'>
                    Alternative treatments
                </div>
                {/* alternative treatment form */}
                <SubProcedureFormV2 data  = {alternativeTreatmentForm}/>
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
                <SubProcedureReference reference = {reference}/>
            </div>     
             </div>
            {/* end of left side */}
            <div className='sub-procedure-right-container'>
                <div className='sub-procedure-right-content'>
                    <div className='sub-procedure-right-board'>
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

