import BenifitIcon_1 from '../../assets/instrument/sub-instrument-icon-01.png';
import BenifitIcon_2 from '../../assets/instrument/sub-instrument-icon-02.png';
import BenifitIcon_3 from '../../assets/instrument/sub-instrument-icon-03.png';
import BenifitIcon_4 from '../../assets/instrument/sub-instrument-icon-04.png';
import BenifitIcon_5 from '../../assets/instrument/sub-instrument-icon-05.png';

import BenefitCard from './benefit-card/benefit-card.component';

import './instrument-benefits.styles.scss';

const InstrumentBenifits = ({ instrumentName }) => {
    return (
        <div className='instrument-benefits-container'>
            <h3 className='instrument-benefits-title'>
                {'key benefits of ' + instrumentName}
            </h3>
            <hr className='instrument-benefits-divider' />
            <div className='instrument-benefits-cards'>
                <BenefitCard icon={BenifitIcon_1}
                             title={'patient comfort'}
                             content={'Integrated colling with pulsed RF and vibration to aid in patient comfort'} /> 
                <BenefitCard icon={BenifitIcon_2}
                             title={'patient comfort'}
                             content={'Integrated colling with pulsed RF and vibration to aid in patient comfort'} />
                <BenefitCard icon={BenifitIcon_3}
                             title={'patient comfort'}
                             content={'Integrated colling with pulsed RF and vibration to aid in patient comfort'} />
                <BenefitCard icon={BenifitIcon_4}
                             title={'patient comfort'}
                             content={'Integrated colling with pulsed RF and vibration to aid in patient comfort'} />
                <BenefitCard icon={BenifitIcon_5}
                             title={'patient comfort'}
                             content={'Integrated colling with pulsed RF and vibration to aid in patient comfort'} />
            </div>
        </div>
    )
}

export default InstrumentBenifits;