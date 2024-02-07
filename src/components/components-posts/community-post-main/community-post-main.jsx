import { useNavigate } from "react-router-dom";

// components
import PostPageTitle from "../../community-post-main-title/community-post-main-title";

// scss
import "./community-post-main.scss";

// image
import ArrowRight from "../../../assets/post/iconoir_arrow-right.svg";
import PhotoGirl from "../../../assets/post/pic.png";
import Photo from "../../../assets/post/decoration-post-1.png";
import Heart from "../../../assets/post/heart_like.svg";
import userInfoQueryStore from "../../../userStore";
const PostPageMain = () => {
  const navigate = useNavigate();
  const userInfo = userInfoQueryStore((state) => state.userInfo);
  const togglePopup = userInfoQueryStore((state) => state.togglePopup);
  const handleCreatePostClick = () => {
    if (!userInfo.token) {
      togglePopup(true, "accountType");
    } else {
      navigate("/posts/create-post");
    }
  };
  return (
    <div>
      <div className="post-main-container-wrapper">
        <div className="post-main-container">
          <div className="post-main-shape">
            <div className="wrapper">
              <div className="post-main-photograph"></div>
            </div>
            <span className="occaecat">#Occaecat</span>
            <span className="adipiscing">#Adipiscing</span>
            <div className="wrapper">
              <span className="lorem">#Lorem</span>
            </div>
            <span className="eiusmod">#Eiusmod</span>
            <span className="excepteur">#Excepteur</span>
            <img src={PhotoGirl} alt="PhotoGraph-1" className="photo-girl" />
            <img src={Photo} alt="Photograph-1" className="photo-1" />
            <img src={Photo} alt="Photograph-2" className="photo-2" />
            <p className="post-main-photograph-caption">
              Top Makeup Trends for Spring 2023
            </p>
            <div className="post-main-likes-container">
              <img src={Heart} alt="Heart-Icon" className="heart-icon" />
              <p className="post-main-photograph-like">1.8k</p>
            </div>
          </div>

          <div className="post-main-inner-container">
            <h1 className="post-main-contents">
              Join a community of beauty and empowerment
            </h1>
            <h6 className="h6val">
              Charm Life lets you share your cosmetic experience with others and
              stay on-trend
            </h6>
            <div className="post-main-link">
              <button
                className="post-main-link-button"
                onClick={handleCreatePostClick}
              >
                Creating a post{" "}
                <img
                  src={ArrowRight}
                  alt="ArrowRight"
                  className="arrow-right-icon"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* <PostPageTitle /> */}
    </div>
  );
};

export default PostPageMain;
