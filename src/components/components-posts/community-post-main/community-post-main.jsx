import { useNavigate } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';

// scss
import './community-post-main.scss';

// image
import ArrowRight from '../../../assets/post/iconoir_arrow-right.svg';
import GirlPhotoMain from '../../../assets/post/girl_photo_main.png';
import userInfoQueryStore from '../../../userStore';
import PinkBackgroundComponent from '../../../mutual_components/pink_background/pink_background';

const PostPageMain = () => {
  const navigate = useNavigate();
  const userInfo = userInfoQueryStore((state) => state.userInfo);
  const togglePopup = userInfoQueryStore((state) => state.togglePopup);
  const isIpadScreen = useMediaQuery({ query: '(max-width: 1133px)' });
  const isSmallScreen = useMediaQuery({ query: '(max-width: 744px)' });

  const handleCreatePostClick = () => {
    if (!userInfo.token) {
      togglePopup(true, 'accountType');
    } else {
      navigate('/posts/create-post');
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

      {/* right container */}
      <div className='community-post-main-right-container'>
        {isIpadScreen ? (
          ''
        ) : (
          <>
            <h1 className='community-post-main-title'>
              Join a community of beauty
              <br />
              and empowerment
            </h1>
            <h6 className='community-post-main-sub-title'>
              Charm Life lets you share your cosmetic experience with
              <br />
              others and stay on-trend
            </h6>
          </>
        )}
        {isIpadScreen && (
          <>
            <h1 className='community-post-main-title'>
              Join a community
              <br />
              of beauty and
              <br />
              empowerment
            </h1>
            <h6 className="h6val">
              Charm Life lets you share your cosmetic experience with others and
              stay on-trend
            </h6>
          </>
        )}
        {isSmallScreen ? (
          ''
        ) : (
          <div className='community-post-main-create-button-container'>
            <button
              className='community-post-main-create-button'
              onClick={handleCreatePostClick}
            >
              Creating a post
              <img
                src={ArrowRight}
                alt='ArrowRight'
                className='arrow-right-icon'
              />
            </button>
          </div>
        )}
      </div>

      {isSmallScreen && (
        <div className='community-post-main-create-button-container'>
          <button
            className='community-post-main-create-button'
            onClick={handleCreatePostClick}
          >
            Creating a post
            <img
              src={ArrowRight}
              alt='ArrowRight'
              className='arrow-right-icon'
            />
          </button>
        </div>
      )}
    </div>
  );
};

export default PostPageMain;
