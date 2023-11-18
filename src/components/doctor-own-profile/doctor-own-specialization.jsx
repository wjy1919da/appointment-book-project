import { useNavigate } from 'react-router-dom';
import '../components-home/home-instruments/home-instruments.styles.scss';
import { Box, SimpleGrid, Image,Grid } from '@chakra-ui/react';
const DocotorOwnSpecialization = () => {
    const formatTitle = (title) => {
        return title.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    }
    const instruments_names = ['Chin-Implants', 'Chin-Implants', 'Chin-Implants', 'Chin-Implants'];
    const instrumentsGrid = instruments_names.map((name, index) => 
            <Box as="div" className='home-instrument' key={index}>
                <Image 
                    src={require(`../../assets/procedure/${name}.png`)} 
                    alt={name} 
                    className='home-instrument-pic' 
                    style={{width:'150px',height:'150px'}}
                />
                <div className='title' style={{fontSize:'14px'}}>{(name)}</div>
            </Box>
    )
    return (
        <div style={{display:'flex',flexDirection:'column',gap:'30px',marginTop:'50px'}}>
            <span style={{
                fontFamily:'Open Sans',
                fontSize:'20px;',
                fontStyle:'normal',
                fontWeight:'600',
                color:'black'

            }}
            >Specialization</span>
            <div>
                <SimpleGrid style={{ marginTop:'10px', width:'80vw'}} columns={7} spacing={2}>
                        {instrumentsGrid}
                </SimpleGrid>
            </div>
        </div>
    );
};

export default DocotorOwnSpecialization;