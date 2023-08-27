import { Fragment } from 'react';
import './home-instruments.styles.scss';
import HomeSection5Titles from './home-section5-titles/home-section5-titles.component';
import { useMediaQuery } from 'react-responsive';
import { Box, SimpleGrid, Image } from '@chakra-ui/react';
const formatTitle = (title) => {
    return title.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}
const HomeInstruments = () => {
    const isMobile = useMediaQuery({ query: '(max-width: 576px)' });
    const isIpad = useMediaQuery({ query: '(min-width: 576px) and (max-width: 1023px)' });
    const isMobileOrIpad = isMobile || isIpad;
    const procedures_names_mobile = ['botox_injections', 'breast_augmentation','chemical_peels','lip_augmentation','teeth_whitening']
    const procedures_names = ['botox_injections', 'breast_augmentation','chemical_peels','lip_augmentation','teeth_whitening','fox_eyes','laser_hair_removal']
    const instruments_names = ['thermage', 'inmode', 'coolsculpting', 'fraxel_laser'];
    const proceduresToRender = isMobileOrIpad ? procedures_names_mobile : procedures_names;
    const proceduresGrid = proceduresToRender.map((name) => 
        <Box as="div" className='home-procedure' key={name}>
            <Image 
                src={require(`../../../assets/procedure/${name}.svg`)} 
                alt={name} 
                className='home-procedure-pic' 
            />
            {!isMobileOrIpad && <div className = 'title'>{formatTitle(name)}</div> }
        </Box>
    );
    const instrumentsGrid = instruments_names.map((name) => 
        <Box as="div" className='home-instrument' key={name}>
            <Image 
                src={require(`../../../assets/instrument/${name}.svg`)} 
                alt={name} 
                className='home-instrument-pic' 
            />
           {!isMobileOrIpad && <div className = 'title'>{formatTitle(name)}</div> }
        </Box>
    )
    return (
        <div className = 'home-section-container'>
            {/* instruments */}
            <div className = 'home-instrument-container'>
                {!isMobile&&<HomeSection5Titles heading="Featured Instruments" link="View All Instruments" />}
                {isMobile&&<HomeSection5Titles heading="Instruments" link="View All" />}
                <SimpleGrid style={{ marginLeft: '20px',marginTop:'10px', width:'95vw'}} columns={{ base: 5, md:5, lg: 7}} spacing={5}>
                        {proceduresGrid}
                </SimpleGrid>
            </div>
             {/* procedure */}
             <div className = 'home-instrument-container'>
                {!isMobile&& <HomeSection5Titles heading="Popular Cosmetic Procedures" link = "View All Procedures"/>}
                {isMobile&& <HomeSection5Titles heading="Procedures" link = "View All"/>}
                <div>
                    <SimpleGrid style={{ marginLeft: '20px',marginTop:'10px',marginBottom:'10px', width:'95vw'}} columns={ 4 } spacing={8}>
                        {instrumentsGrid}
                    </SimpleGrid>
                </div>
            </div>
        </div>   
    )
}
export default HomeInstruments;