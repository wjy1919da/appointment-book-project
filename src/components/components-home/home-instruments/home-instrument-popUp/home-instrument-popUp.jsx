import HomeLink from '../../home-link/home-link.component';
import DropdownMenu from '../../../dropdown-menu/dropdown-menu';
import './home-instrument-popUp.styles.scss';
import { useMediaQuery } from 'react-responsive';
import { Link } from 'react-router-dom';
import { Box, SimpleGrid, Image,Grid } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import { useGetInstruments } from '../../../../hooks/useGetInstruments';
const HomeInstrumentPopUP = (props) => {
  const isMobile = useMediaQuery({ query: '(max-width: 576px)' });
  const [IsModalOpen, setIsModelOpen] = useState(false);
  const { data, isLoading, error } = useGetInstruments();
  console.log("pass-indata", data);
  console.log("pass-indata-name", data.data.name);
  const [logoSrc, setLogoSrc] = useState(null);
  const [procedureIcon,setProcedureIcon] = useState(null);
   useEffect(() => {
     // This will re-calculate the logoSrc every time data.data.logo changes
   if (data && data.data && data.data.logo) {
        console.log("Checking data.data.logo:", data.data.logo);
       try {
            const newLogoSrc = require(`../../../../assets/instrument/${data.data.logo}`);
            console.log("New logo source:", newLogoSrc);
            setLogoSrc(newLogoSrc);

         
      } catch (err) {
        console.error("Error loading logo image:", err);
        setLogoSrc(null); // set to a default/fallback image if you have one
      }
   }
 }, [data.data.logo]);
 useEffect(() => {
    // This will re-calculate the logoSrc every time data.data.logo changes
  if (data && data.data && data.data.procedure) {
      try {
       const newprocedureSrc = require(`../../../../assets/instrument/${data.data.procedure}`);
       setProcedureIcon(newprocedureSrc);
     } catch (err) {
       console.error("Error loading logo image:", err);
       setLogoSrc(null); // set to a default/fallback image if you have one
     }
  }
}, [data.data.procedure]);
if (data && data.data && data.data.procedure) {
    console.log("procedure",data.data.procedure[0]);
}
 let instrumentsGrid;
 if (data && data.data && data.data.procedure) {
    instrumentsGrid = data.data.procedure.map((item, index) => (
        <Box as="div" className='home-instrument-popUp-procedure' key={index}>
            <img 
                src={item} 
                alt={`Instrument ${index}`} // consider adding an alt text for accessibility
                className='home-instrument-popUp-procedure-pic' 
            />
            <div className='home-instrument-popUp-proceudre-title'>{data.data.procedureDes[index]}</div> 
        </Box>
    ));
}
const numCombinations = instrumentsGrid ? instrumentsGrid.length : 0;
 
    return (
      <div>
        <Modal
            dialogClassName='instrument-popUp-modal'
            show={props.show} 
            onHide={props.onClose} 
            size='lg'
            aria-labelledby="example-custom-modal-styling-title"
            style={{ marginTop: '100px' }}
        >
            <div className="instrument-popUp-container">
                {data.data.logo && 
                    <div className={`instrument-logo-${data.data.hasProcedure ? 'with-procedure' : 'without-procedure'}`}>
                        <img src = {data.data.logo} ></img>
                    </div>
                }
                {data.data.title && 
                <div className={`instrument-popUp-title ${data.data.name.toLowerCase() === 'thermage' ? 'thermage-title' : ''}`}>
                    <span>{data.data.title}</span>
                </div>
                }
                {data.data.text &&
                    <div className='instrument-popUp-text'>
                        <span style={{width:'491px'}}>{data.data.text}</span>
                    </div>
                }
                {data.data.subtext&&
                    <div className='instrument-popUp-subtext'>
                         <span>{data.data.subtext}</span>
                    </div>
                }
                {data.data.procedure &&
                    <div className='instrument-popUp-procedure' style={{
                        display: 'grid',
                        gridTemplateColumns: `repeat(${numCombinations}, 1fr)`,
                        gap: '10px',  // Or whatever gap you desire
                        width: '410px'
                    }}
                    >
                        {/* <img src = {require(`../../../../assets/instrument/${data.data.procedure}`)} ></img> */}
                        {/* <img src = {procedureIcon} ></img> */}
                        {instrumentsGrid}
                    </div>
                }
                <div className='instrument-popUp-clickMore'>
                    <Link to={`/instrument/${data.data.name}`}>
                      Click to learn more
                    </Link>
                </div>

            </div>
        </Modal>
      </div>
    );
  };
  
export default HomeInstrumentPopUP;