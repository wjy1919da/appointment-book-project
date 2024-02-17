import { Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

// scss
import "./home-post.styles.scss";
import HomeText from "../home-text/home-text.component";
import HomeButtonPink from "../../home-button-pink/home-button-pink";

import HomePostPic from "../../../assets/home/home-posts-sections.svg";

const HomePost = () => {
  const isMobile = useMediaQuery({ query: `(max-width: 767px)` });
  const isIpad = useMediaQuery({
    query: `(min-width: 768px) and (max-width: 1023px)`,
  });

  // const isMobileOrIpad = isMobile || isIpad;
  // const selectedImage = isIpad ? PostPic : HomePostPic;

  return (
    <div className="Home-post">
      <div className="home-post-pic animate__animated animate__slideInUp">
        <div className="home-post-inner-container">
          <img src={HomePostPic} alt="postPic" className="post-pic" />
        </div>
      </div>

      <div className="home-post-container">
        <HomeText
          title="Share Your Posts"
          content="Our platform is a transparent community where beauty lovers can
        connect and empower each other. Share your cosmetic experience
        and explore others' posts. Know the market and stay on-trend.
        Discover exceptional savings and exclusive offers."
        />
      </div>
      <div className="home-post-button-container">
        <HomeButtonPink title="View more posts" />
      </div>
    </div>
  );
};

export default HomePost;
