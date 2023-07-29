import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import './sub-procedure-scroll.styles.scss'
import SubProcedureScrollCard from './sub-procedure-scroll-card/sub-procedure-scroll-card.component';
// import { Fragment } from "react";
const SubProcedureScroll = (props) => {
  console.log("SubProcedureScroll", props);
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 1000 },
      items: 2
    },
    desktop: {
      breakpoint: { max: 1000, min: 500 },
      items: 2
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };
  const {data} = props;
  let cards = data.map((item, index) => (
     <SubProcedureScrollCard before={item.before} after={item.after} />
  ));

  return (
    // <Fragment>
      <div className="carousel-container">
         <Carousel responsive={responsive}>
            {cards}      
        </Carousel>
      </div>

      /*  
        <div className="pic-container-mobile">
          {cards}
        </div>
      */
    // </Fragment>
  )
};
export default SubProcedureScroll;