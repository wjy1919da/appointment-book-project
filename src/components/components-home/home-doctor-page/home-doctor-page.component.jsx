import DoctorImg from "../../../assets/home/home_doctor.svg";
import "./home-doctor-page.styles.scss";
import { useMediaQuery } from "react-responsive";
import HomeText from "../home-text/home-text.component";
import HomeButtonPink from "../../home-button-pink/home-button-pink";

const HomeDoctorPage = () => {
  const isMobile = useMediaQuery({ query: `(max-width: 767px)` });
  const isIpad = useMediaQuery({
    query: `(min-width: 768px) and (max-width: 1023px)`,
  });
  const isMobileOrIpad = isMobile || isIpad;
  return (
    <div className="Home-doctor-page">
      <div className="home-doctor-page-pic animate__animated animate__slideInUp">
        <img src={DoctorImg} alt="doctorImg" className="doctor-page-img"></img>
      </div>
      <div className="home-doctor-page-container">
        <HomeText
          title="Our Doctor"
          content="Our platform collaborates with top professionals and institutions
            to provide you with expert advice and support. Consult with our
            trusted partners about surgery procedures, coupons, and more."
        />
      </div>
      <div className="home-doctor-button-container">
        <HomeButtonPink title="Consult a doctor" />
      </div>
    </div>
  );
};
export default HomeDoctorPage;
