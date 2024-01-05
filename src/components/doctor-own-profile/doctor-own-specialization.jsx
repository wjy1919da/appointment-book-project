import '../components-home/home-instruments/home-instruments.styles.scss';
import { Box, SimpleGrid, Image } from '@chakra-ui/react';

const DocotorOwnSpecialization = () => {
  const formatTitle = (title) => {
    return title
      .split('_')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };
  const instruments_names = [
    'Chin-Implants',
    'Chin-Implants',
    'Chin-Implants',
    'Chin-Implants',
  ];
  const instrumentsGrid = instruments_names.map((name, index) => (
    <Box as='div' className='home-instrument' key={index}>
      <Image
        src={require(`../../assets/procedure/${name}.png`)}
        alt={name}
        className='home-instrument-pic'
        style={{ width: '150px', height: '150px' }}
      />
      <div style={{ fontSize: '18px', fontWeight: '400', textAlign: 'center', marginTop: '10px' }}>
        {name}
      </div>
    </Box>
  ));
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '30px',
        marginTop: '50px',
      }}
    >
      <span
        style={{
          fontFamily: 'Open Sans',
          fontSize: '24px',
          fontStyle: 'normal',
          fontWeight: '600',
          color: '#000',
        }}
      >
        Specialization
      </span>
      <div>
        <SimpleGrid
          minChildWidth='120px'
          style={{
            marginTop: '10px',
          }}
        >
          {instrumentsGrid}
        </SimpleGrid>
      </div>
    </div>
  );
};

export default DocotorOwnSpecialization;
