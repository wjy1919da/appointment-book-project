import { useLayoutEffect } from 'react';
import InstrumentPic from '../../assets/instrument/instrument-pic.jpg';

import Footer from '../../components/footer/footer.component';
import InstrumentGrid from '../../components/instrument-grid/instrument-grid.component';
import './instrument.styles.scss';

const Instrument = () => {
    useLayoutEffect(() => {
        window.scrollTo(0, 0);
    });

    return (
        <div className='instrument-container'>
            {/* <img className='instrument-pic' src={InstrumentPic} alt='instrument' /> */}
            {/* <div className='slide-in-animation'>
                <h2 className='instrument-title'>
                    FEATURED INSTRUMENTS
                </h2>
                <hr className='instrument-divider'/>
            </div> */}

            <div className='instrument-grid-container'>
                <InstrumentGrid />
            </div>
            <Footer />
        </div>
    )
}

export default Instrument;