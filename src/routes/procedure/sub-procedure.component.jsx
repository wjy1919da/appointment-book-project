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
const SubProcedure = () => { 
   // Mingqi
   const n =50;
   //Jingyi
   const { name } = useParams();
   const videoUrl = "https://www.youtube.com/embed/AZprJCr5FE0";
   // data from remote
   const [localData, setLocalData] = useState(null);
   const [page] = useState(1); // Set your desired initial page here

   const { data, isLoading, error } = useGetProcedures(name,page);

   const formatTitle = (title) => {
       return title.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
   }
// local data 有必要吗
   useEffect(() => {
       window.scrollTo(0, 0);
       // Here you set localData when data is updated
       if (data) {
         setLocalData(data.data);
       }
   }, [name, data]);  // Added data as a dependency here
   console.log(localData);
   // 此处需要替换
   if (isLoading) {
       return <div>Loading...</div>;
   }
    if (error) {
        return <div>Error: {error.message}</div>;
    }
    if (!localData || !localData.subcategories) {
        return <div>No data available</div>;
    }
    if(!localData.subcategories[2] || !localData.subcategories[2].other){
        return <div>No option form available</div>;
    }
    if(!localData.subcategories[3] || !localData.subcategories[3].other){
        return <div>No before and after image available</div>;
    }
    if(!localData.subcategories[4] || !localData.subcategories[4].other){
        return <div>No reference available</div>;
    }
    const prosAndCons = JSON.parse(localData.subcategories[1].other);
    const optionsContent = JSON.parse(localData.subcategories[2].other);
    const beforeAndAfterImage = JSON.parse(localData.subcategories[3].other).beforeAndAfterImage;
    const reference = JSON.parse(localData.subcategories[4].other);
    console.log("reference",reference);
    
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
         
            {/*Jingyi part  */}
            <div className='sub-procedure-option-form-container'>
                    <SubTxt title={'Procedure options'} text={localData.subcategories[2].explanation}/>
                    {/* option form */}
                    <SubProcedureForm data={optionsContent} />  
                </div>
                <div className='sub-procedure-side-effect'>
                    {/* <SubTxt title={'Potential Side Effects'} text={data.sideEffect}/> */}
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
                    {/* <SubProcedureFormV2 data  = {data.alternativeTreatmentForm}/> */}
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
               {/* Minqi part - right side page*/}
            <div className='sub-procedure-right-container'>
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
                        <div className="introduction-slide">
                            <div className="introduction-icon"></div>
                            <div className="introduction-catalog">
                                <span className='introduction-title'>Introduction</span>
                                <span className='introduction-section'>why consider facial rejuvenation</span>
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

