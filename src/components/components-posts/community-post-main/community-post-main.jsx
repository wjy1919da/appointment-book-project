import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

// scss
import "./community-post-main.scss";

// image
import ArrowRight from "../../../assets/post/iconoir_arrow-right.svg";
import GirlPhotoMain from "../../../assets/post/girl_photo_main.png";
import userInfoQueryStore from "../../../userStore";
import PinkBackgroundComponent from "../../../mutual_components/pink_background/pink_background";

const PostPageMain = () => {
  const navigate = useNavigate();
  const userInfo = userInfoQueryStore((state) => state.userInfo);
  const togglePopup = userInfoQueryStore((state) => state.togglePopup);
  // const screen1133 = useMediaQuery({ query: "(max-width: 1133px)" });
  // const screen744 = useMediaQuery({ query: "(max-width: 744px)" });
  // const screen375 = useMediaQuery({ query: "(max-width: 743px)" });
  const desktopScreen = useMediaQuery({ query: "(min-width: 1134px)" });
  const ipadScreen = useMediaQuery({
    query: "(max-width: 1133px) and (min-width: 744px)",
  });
  const mobileScreen = useMediaQuery({ query: "(max-width: 743px)" });
  const handleCreatePostClick = () => {
    if (!userInfo.token) {
      togglePopup(true, "accountType");
    } else {
      navigate("/posts/create-post");
    }
  };

  return (
    <div className="community-post-main-container">
      {(mobileScreen || ipadScreen) && (
        <div className="community-post-main-create-button-container">
          <button
            className="community-post-main-create-button"
            onClick={handleCreatePostClick}
          >
            Creating a post
            <img
              src={ArrowRight}
              alt="ArrowRight"
              className="arrow-right-icon"
            />
          </button>
        </div>
      )}
      <div className="community-post-main-left-container">
        <PinkBackgroundComponent renderBothBackgrounds={false} />
        <img
          src={GirlPhotoMain}
          alt="Image"
          className="community-post-main-girl-image"
        />
      </div>

      <div className="community-post-main-right-container">
        {mobileScreen && (
          <>
            <h1 className="community-post-main-title">
              Join a community of beauty and empowerment
            </h1>
            <h6 className="community-post-main-sub-title">
              Charm Life lets you share your cosmetic experience with others and
              stay on-trend
            </h6>
          </>
        )}

        {ipadScreen && (
          <>
            <h1 className="community-post-main-title">
              Join a community
              <br />
              of beauty and
              <br />
              empowerment
            </h1>
            <h6 className="community-post-main-sub-title">
              Charm Life lets you share your cosmetic
              <br />
              experience with others and stay on-trend
            </h6>
          </>
        )}

        {desktopScreen && (
          <>
            <h1 className="community-post-main-title">
              Join a community of beauty
              <br />
              and empowerment
            </h1>
            <h6 className="community-post-main-sub-title">
              Charm Life lets you share your cosmetic experience with
              <br />
              others and stay on-trend
            </h6>
          </>
        )}

        {desktopScreen && (
          <div className="community-post-main-create-button-container">
            <button
              className="community-post-main-create-button"
              onClick={handleCreatePostClick}
            >
              <span className="create-post-text">Creating a post</span>
              <img
                src={ArrowRight}
                alt="ArrowRight"
                className="arrow-right-icon"
              />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostPageMain;
