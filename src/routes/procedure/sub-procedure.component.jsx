import StyledButtonV3 from '../../components/styled-button-v3/styled-button-v3.component';
import Footer from "../../components/footer/footer.component";

import { Link, useParams } from 'react-router-dom';
import { useLayoutEffect } from 'react';
import SubTxt from '../../components/sub-txt/sub-txt.component';
// import SubProcedurePhotos from '../../components/sub-procedure-photos/sub-procedure-photos.component';
import SubFooter from '../../components/sub-footer/sub-footer.component';

import './sub-procedure.styles.scss';
import texts from './procedure-text.json';

const SubProcedure = () => {
    useLayoutEffect(() => {
        window.scrollTo(0, 0)
    });

    const { name } = useParams();
    const picSrc = require(`../../assets/procedure/${name}.jpg`);
    
    let textName = name.replaceAll('-', ' ');
    const text = texts.filter(text => text.name === textName)[0];
    const what = text["what"];
    const why = text["why"];
    const options = text["options"];
    const lifeAfter = text["lifeAfter"];

    return (
        <div className='sub-procedure-container'>
            <img className={`sub-procedure-pic animate__animated animate__slideInUp ${name}`} src={picSrc} alt='sub-procedure' />
            <div className='sub-procedure-title-container animate__animated animate__slideInUp'>
                <h1 className='sub-procedure-title-text' >{textName}</h1>
                <br />
                <div className='sub-procedure-title-button-container'>
                    <Link className='sub-procedure-title-button-link' to='/doctor'>
                        <StyledButtonV3 text={"ask a doctor"}/>
                    </Link>
                </div>
            </div>
            <SubTxt title={'What is ' + textName + '?'} 
                    text={what} />
            <SubTxt title={'Why consider the ' + textName + '?'} 
                    text={why} />
            <SubTxt title={'What are the options for ' + textName + '?'} 
                    text={options} />
            <SubTxt title={'Life after the ' + textName} 
                    text={lifeAfter} />
            {/* <SubProcedurePhotos photos={FacialRejuvenationPhoto_1}/> */}
            <SubFooter />
            <Footer />
        </div>
    )
}

export default SubProcedure;