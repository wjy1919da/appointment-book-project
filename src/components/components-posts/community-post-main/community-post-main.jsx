import { useNavigate } from 'react-router-dom';

// components
// import PostPageTitle from "../../community-post-main-title/community-post-main-title";

// scss
import './community-post-main.scss';

// image
import ArrowRight from '../../../assets/post/iconoir_arrow-right.svg';
import GirlPhotoMain from '../../../assets/post/girl_photo_main.png';
import PhotoGirl from '../../../assets/post/pic.png';
import Photo from '../../../assets/post/decoration-post-1.png';
import Heart from '../../../assets/post/heart_like.svg';
import userInfoQueryStore from '../../../userStore';

const PostPageMain = () => {
  const navigate = useNavigate();
  const userInfo = userInfoQueryStore((state) => state.userInfo);
  const togglePopup = userInfoQueryStore((state) => state.togglePopup);

  const handleCreatePostClick = () => {
    if (!userInfo.token) {
      togglePopup(true, 'accountType');
    } else {
      navigate('/posts/create');
    }
  };

  return (
    <div className='community-post-main-container'>
      <div className='community-post-main-pink-background'></div>
      {/* left container */}
      <div className='community-post-main-left-container'>
        <img
          src={GirlPhotoMain}
          alt='Image'
          className='community-post-main-girl-image'
        />
      </div>

      {/* right container */}
      <div className='community-post-main-right-container'>
        <h1 className='community-post-main-title'>
          Join a community of beauty<br />and empowerment
        </h1>
        <h6 className='community-post-main-sub-title'>
          Charm Life lets you share your cosmetic experience with
          <br />others and stay on-trend
        </h6>
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
      </div>
    </div>
  );
};

export default PostPageMain;
