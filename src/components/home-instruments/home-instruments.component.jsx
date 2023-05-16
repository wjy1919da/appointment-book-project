import InstrumentGrid from '../instrument-grid/instrument-grid.component';
import './home-instruments.styles.scss';
import HomeSection5Titles from './home-section5-titles/home-section5-titles.component';

const HomeInstruments = () => {
    return (
        <div className = 'home-section-container'>
            <div className = 'home-instrument-container'>
                <HomeSection5Titles heading="Popular Cosmetic Procedures" link = "View All Procedures"/>
                <InstrumentGrid names={['botox-injections', 'breast-augmentation','chemical-peels','lip-augmentation','teeth-whitening','fox-eyes','laser-hair-removal']} option="procedure" />
            </div>
            <div className = 'home-instrument-container'>
                <HomeSection5Titles heading="Featured Instruments" link="View All Instruments" />
                <InstrumentGrid names={['thermage', 'inmode', 'coolsculpting', 'fraxel-laser']} option="instrument" />
            </div>
        </div>   
    )
}

export default HomeInstruments;