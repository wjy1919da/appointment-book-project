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
  const isIpadScreen = useMediaQuery({ query: '(max-width: 1132.50px)' });
  const isSmallScreen = useMediaQuery({ query: '(max-width: 743.50px)' });
  const screen375 = useMediaQuery({ query: '(max-width: 374.50px)' });
  const screen1440 = useMediaQuery({ query: '(max-width: 1439.5px)' });

  const handleCreatePostClick = () => {
    if (!userInfo.token) {
      togglePopup(true, 'accountType');
    } else {
      navigate('/posts/create-post');
    }
  };

  return (
    <div className='community-post-main-container'>
      {/* left container */}
      <div className='community-post-main-left-container'>
        <PinkBackgroundComponent renderBothBackgrounds={false} />
        <img
          src={GirlPhotoMain}
          alt='Image'
          className='community-post-main-girl-image'
        />
      </div>

      {/* right container */}
      <div className='community-post-main-right-container'>
        {isIpadScreen || screen375 ? 
          //under 1133px print nothing
        (
          ''
        ) :
          //over 1133px
          (
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

        {/* {isIpadScreen && !screen375 ?  */}
        {isSmallScreen && !screen375?             
          //from greater than 375px to 744px  
        (
          <>
            {/* <h1 className='community-post-main-title'>
              Join a community
              <br />
              of beauty and
              <br />
              empowerment
            </h1>
            <h6 className='community-post-main-sub-title'>
              Charm Life lets you share your cosmetic
              <br />
              experience with others and stay on-trend
            </h6> */}
            <h1 className='community-post-main-title'>
              Join a community of beauty and empowerment
            </h1>
            <h6 className='community-post-main-sub-title'>
              Charm Life lets you share your cosmetic
              <br />
              experience with others and stay on-trend
            </h6>
          </>
        ) : null}
        {isIpadScreen && !isSmallScreen?             
          //from greater than 744px to 1133px  
          (
            <>
              {/* <h1 className='community-post-main-title'>
                Join a community
                <br />
                of beauty and
                <br />
                empowerment
              </h1>
              <h6 className='community-post-main-sub-title'>
                Charm Life lets you share your cosmetic
                <br />
                experience with others and stay on-trend
              </h6> */}
              <h1 className='community-post-main-title'>
                Join a community 
                <br/>
                of beauty and 
                <br/>
                empowerment
              </h1>
              <h6 className='community-post-main-sub-title'>
                Charm Life lets you share your cosmetic
                <br />
                experience with others and stay on-trend
              </h6>
            </>
          ) : null}
        {screen375 && (
          <>
            <h1 className='community-post-main-title'>
              Join a community of beauty and empowerment
            </h1>
            <h6 className='community-post-main-sub-title'>
              Charm Life lets you share your cosmetic
              <br />
              experience with others and stay on-trend
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
              <span className='create-post-text'>Creating a post</span>
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
