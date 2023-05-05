import { Fragment } from 'react';
import InstrumentGrid from '../instrument-grid/instrument-grid.component';

import './home-instruments.styles.scss';

const HomeInstruments = () => {
    return (
        <Fragment>
            <h2 className='home-title'>
                FEATURED INSTRUMENTS
            </h2>
            <hr className='home-divider'/>
            <div className='home-instrument-container'>
                    <InstrumentGrid />
            </div>
        </Fragment>
    )
}

export default HomeInstruments;