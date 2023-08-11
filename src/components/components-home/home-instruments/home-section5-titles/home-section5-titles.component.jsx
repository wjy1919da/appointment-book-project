import HomeLink from '../../home-link/home-link.component';
import './home-section5-titles.styles.scss';
import { useMediaQuery } from 'react-responsive';
import { Link } from 'react-router-dom';
const HomeSectionTitles = (props) => {
  const isMobile = useMediaQuery({ query: '(max-width: 576px)' });
    return (
      <div className="home-section5-titles-container">
        <div className="home-section5-title-heading3">
           {props.heading}
        </div>
        {!isMobile&&<HomeLink title={props.link} href = "procedure/facial-rejuvenation"/>} 
        {isMobile&&<Link to='procedure/breast_augmentation' className='home-mobile-procedure-link'>
                    View All
              </Link>}       
      </div>
    );
  };
  
export default HomeSectionTitles;