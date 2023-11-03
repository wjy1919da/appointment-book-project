import { useLayoutEffect } from 'react';

import FacialProcedurePic from '../../assets/procedure/facial.jpg';

import ProcedureSectionV1 from "../../components/procedure-section/procedure-section-v1.component";
import ProcedureSectionV2 from "../../components/procedure-section/procedure-section-v2.component";

import './procedure.styles.scss';

const FacialProcedure = () => {
    // useLayoutEffect(() => {
    //     window.scrollTo(0, 0)
    // });

    const facialProcedures = ['Facial Rejuvenation', 'Deep Plane Facelift', 'Eye Reshaping', 'Fox Eyes', 'Rhinoplasty', 'Lip Enhancement', 'Lip Augmentation', 'Otoplasty', 'Chin Implants', 'Neck Contouring']
    const sections = facialProcedures.map((procedure, index) => {
        console.log('procedure::', procedure);

        let img;
        try {
            img = require(`../../assets/procedure/${procedure.toLowerCase().replaceAll(' ', '-')}.jpg`);
        } catch (error) {
            img = '' // default image
            console.error(error)
        }
        return (
            index % 2 === 0 ?
            <ProcedureSectionV1 procedureSectionPic={img} title={procedure} key={procedure} />
            :
            <ProcedureSectionV2 procedureSectionPic={img} title={procedure} key={procedure} />
        )
    });

    return (
        <div className='procedure-container animate__animated animate__fadeIn'>
            <div className='procedure-name-container'>
                <h1 className='procedure-name'>Facial Procedure</h1>
            </div>
            <img className='procedure-pic' src={FacialProcedurePic} alt='facial procedure' />
            <h2 className='procedure-title'>
                ASK A DOCTOR
            </h2>
            <hr className='procedure-divider' />
            {sections}
        </div>
    )
}

export default FacialProcedure;