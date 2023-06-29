import ProcedureSectionCard from './procedure-section-card/procedure-section-card.component';

import './procedure-section.styles.scss';

const ProcedureSectionV2 = ({ procedureSectionPic, title }) => {
    return (
        <div className='procedure-section-v2-container'>
            <img className='procedure-section-v2-pic' 
                 src={procedureSectionPic} 
                 alt={title}/>
            <div className='procedure-section-v2-card-container'>
                <ProcedureSectionCard title={title}/>
            </div>
        </div>
    )
}

export default ProcedureSectionV2;