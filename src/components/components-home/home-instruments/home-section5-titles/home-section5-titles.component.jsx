import HomeLink from '../../home-link/home-link.component';
import DropdownMenu from '../../../dropdown-menu/dropdown-menu';
import './home-section5-titles.styles.scss';
import { useMediaQuery } from 'react-responsive';
import { Link } from 'react-router-dom';
import { useState } from 'react';
const HomeSectionTitles = (props) => {
  const isMobile = useMediaQuery({ query: '(max-width: 576px)' });
  const [IsModalOpen, setIsModelOpen] = useState(false);
 
    return (
      <div className="home-section5-titles-container">
        <div className="home-section5-title-heading3">
           {props.heading}
        </div>
        {!props.isInstruments && !isMobile && <HomeLink title={props.link} onClick={()=>setIsModelOpen(true)} />} 
        {!props.isInstruments && isMobile && <div className='home-mobile-procedure-link'>View All</div>}  
        {IsModalOpen && 
              <DropdownMenu
                  show={IsModalOpen}
                  onHide={() => setIsModelOpen(false)}
              />}      
      </div>
    );
  };
  
export default HomeSectionTitles;
