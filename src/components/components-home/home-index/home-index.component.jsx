import { useState } from "react";
import "./home-index.styles.scss";
import VectorPink from "../../../assets/home/Vector-pink.png";
import HomeButtonPink from "../../home-button-pink/home-button-pink";
import HomeMobileSubText from "../home-text-mobile/home-mobile-subText.component";
import Modal from "react-bootstrap/Modal";
import videoUrl from "../../../assets/home/App-Demo-V10.mp4";
import HomePic from "../../../assets/home/home-pic1.png";
import HomePicIpad from "../../../assets/home/5-ipad.png";
import HomePicMobile from "../../../assets/home/5.png";
import { useMediaQuery } from "react-responsive";
const HomeIndex = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const isMobile = useMediaQuery({ query: `(max-width: 767px)` });
  const isIpad = useMediaQuery({ query: `(min-width: 768px) and (max-width: 1023px)` });
  const isMobileOrIpad = isMobile || isIpad;
  return (
    <div className="home">
      <div className="home-mobile-intro-container">
        <div className="home-title-container">
          {/* Web */}
          {!isMobileOrIpad && (
            <>
              <div className="home-title-text">
                Charm Community
                <br />
                For All Beauty Lovers
              </div>
              <div className="home-title-subText">
                <p className="ptext">
                  {" "}
                  Charm is more than just a platform; it's a thriving community that embraces the diversity of beauty and offers a seamless experience for all beauty enthusiasts.
                  From subtle enhancements to bold transformations, our platform is designed to cater to your unique needs and desires.
                </p>
              </div>
            </>
          )}
          {isMobileOrIpad && (
            <div className="home-mobile-text-container">
              <HomeMobileSubText
                title="Charm"
                content="Charm is a thriving community that embraces the diversity of beauty and offers a seamless experience for all beauty enthusiasts."
              ></HomeMobileSubText>
            </div>
          )}
          <div className="home-title-buttons">
            {/* <button type="button" className=' button home-title-button1' >Start Charm life</button> */}
            {!isMobile && <HomeButtonPink height="56px" title="Start Charm life" href="/download" />}
            <button type="button" onClick={handleShow} className="button home-title-button2">
              <img src={VectorPink} alt="Button" className="button-image"></img>
              {!isMobile && <span className="button-text">Video</span>}
              {isMobile && <span className="button-text">Watch Video</span>}
            </button>
            <Modal show={show} onHide={handleClose} size="xl">
              <div className="home-buttom-modal-container" style={{ position: "absolute", top: "100px", width: "100%" }}>
                <iframe src={videoUrl} style={{ width: "100%", height: "600px", border: "10px solid white" }} />
              </div>
            </Modal>
          </div>
        </div>
        <div className="home-mobile-intro-pic-container">
          {!isMobileOrIpad && <img src={HomePic} className="home-pic animate__animated animate__slideInDown"></img>}
          {isIpad && <img src={HomePicIpad} className="home-pic animate__animated animate__slideInDown"></img>}
          {isMobile && <img src={HomePicMobile} className="home-pic animate__animated animate__slideInDown"></img>}
        </div>
      </div>
    </div>
  );
};

export default HomeIndex;
