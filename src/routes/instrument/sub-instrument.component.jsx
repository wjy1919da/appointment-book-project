import SubInstrumentPic from '../../assets/instrument/sub-instrument-pic.jpg';
import texts from './instrument-text.json';
// import ThermagePhoto_1 from '../../assets/thermage/thermage-01.png';
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

const SubInstrument = () => {
    useLayoutEffect(() => {
        window.scrollTo(0, 0);
    });

    const { name } = useParams();

    let textName = name.replace('-', ' ');
    const text = texts.filter(text => text.name === textName)[0];
    const shownName = text["shownName"];
    const what = text["what"];
    const why = text["why"];

    return (
        <div className='sub-instrument-container'>
            <img className='sub-instrument-pic animate__animated animate__slideInUp' src={SubInstrumentPic} alt={textName} />
            <div className='sub-instrument-title-container animate__animated animate__slideInUp'>
                <h1 className='sub-instrument-title-text' >{shownName}</h1>
                <br />
                <div className='sub-instrument-title-button-container'>
                    <Link className='sub-instrument-title-button-link' to='/doctor'>
                        <StyledButtonV3 text={"ask a doctor"}/>
                    </Link>
                </div>
            </div>
            <SubTxt title={'What is ' + shownName + '?'}
                    text={what} />
            <SubTxt title={'Why consider ' + shownName + '?'}
                    text={why} />
            {/* <InstrumentBenifits instrumentName={textName} /> */}
            {/* <SubInstrumentPhotos photo_1={ThermagePhoto_1} photo_2={ThermagePhoto_2} /> */}
            <SubFooter />
            <Footer />
        </div>
    )
}

export default SubInstrument;