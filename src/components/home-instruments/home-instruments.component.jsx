import InstrumentGrid from '../instrument-grid/instrument-grid.component';
import './home-instruments.styles.scss';
import HomeSection5Titles from './home-section5-titles/home-section5-titles.component';

const HomeInstruments = () => {
    const instruments_names = ['thermage', 'inmode', 'coolsculpting', 'fraxel_laser'];
    const instrumentsGrid = instruments_names.map((name) =>
        <div className='home-instrument' key={name}>
            <img src={require(`../../assets/instrument/${name}.svg`)} className='home-instrument-pic' alt={name} />
        </div>
    )
    return (
        <div className = 'home-section-container'>
            <div className = 'home-instrument-container'>
                <HomeSection5Titles heading="Popular Cosmetic Procedures" link = "View All Procedures"/>
                <InstrumentGrid names={['botox_injections', 'breast_augmentation','chemical_peels','lip_augmentation','teeth_whitening','fox_eyes','laser_hair_removal']} option="procedure" />
            </div>
            <div className = 'home-instrument-container'>
                <HomeSection5Titles heading="Featured Instruments" link="View All Instruments" />
                <div className='home-instrument-grid'>
                    {instrumentsGrid}
                </div>
            </div>
        </div>   
    )
}

export default HomeInstruments;