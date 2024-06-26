import HomeLink from '../../home-link/home-link.component';
import './home-section5-titles.styles.scss';

// link 需要加link
const HomeSectionTitles = (props) => {
    return (
      <div className="home-section5-titles-container">
        <div className="home-section5-title-heading3">
           {props.heading}
        </div>
        <HomeLink title={props.link} href = "procedure/facial-rejuvenation"/>       
      </div>
    );
  };
  
export default HomeSectionTitles;