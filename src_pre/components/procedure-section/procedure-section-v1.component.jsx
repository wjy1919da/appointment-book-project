import ProcedureSectionCard from './procedure-section-card/procedure-section-card.component';

import './procedure-section.styles.scss';
// 和home page 无关 features 点开之后的UI
const ProcedureSectionV1 = ({ procedureSectionPic, title }) => {
    return (
        <div className='procedure-section-v1-container'>
            <img className='procedure-section-v1-pic' 
                 src={procedureSectionPic} 
                 alt={title}/>
            <div className='procedure-section-v1-card-container'>
                <ProcedureSectionCard title={title}/>
            </div>
        </div>
    )
}

export default ProcedureSectionV1;