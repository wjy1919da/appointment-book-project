import { Link } from 'react-router-dom';

import './instrument-grid.styles.scss';

const InstrumentGrid = () => {
    const instruments = ['thermage', 'inmode', 'coolsculpting', 'fraxel-laser', 'vaserlipo', 'clear+brilliant'];
    const instrumentsGrid = instruments.map((name) => 
        <div className='col-lg-4 col-md-6 col-sm-12 instruments-col' key={name}>
            <Link className='sub-instrument-link' to={'/instrument/' + name}>
                <img src={require(`../../assets/instrument/${name}.png`)} className='instruments-pic' alt={name} />
            </Link>
        </div>
    );

    return (
        <div className='instruments-container container'>
            <div className='row'>
                {instrumentsGrid}
            </div>
        </div>
    )
}

export default InstrumentGrid;