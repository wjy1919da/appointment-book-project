import { Link } from "react-router-dom";
import "./home-recommende.styels.scss";
import ProcedureCard from "../../procedure-card/procedure-card.component";
import HomeText from "../home-text/home-text.component";
import HomeLink from "../home-link/home-link.component";
const HomeRecommande = () => {
  const cardInfo = [
    {
      Cost: "1k-2k",
      Duration: "30 minutes",
      Safety: "Non-invasive",
      Pain: "Pain Free",
    },
  ];
  return (
    <div className="home-recommande-container">
      <HomeText title="Recommended Cosmetic Procedures" />
      <div className="recommendation-inner-container">
        <div className="home-recommande-procedureCard">
          <ProcedureCard cardInfo={cardInfo[0]} />
        </div>
        <div className="recommendation-text-container">
          <HomeText
            title="Facial Rejuvenation"
            content="Various means to restore a youthful appearance to an aging face A high-safety procedure that helps patients regain their best youthful appearance by removing excess or sagging skin, smoothing deep folds, and lifting and tightening deep facial tissues."
          />
          <HomeText
            title="What is Facial Rejuvenation?"
            content="Various means to restore a youthful appearance to an aging face. A high-safety procedure that helps patients regain their best youthful appearance by removing excess or sagging skin, smoothing deep folds, and lifting and tightening deep facial tissues."
          />
          <div>
            <HomeLink title="Watch Video" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeRecommande;
