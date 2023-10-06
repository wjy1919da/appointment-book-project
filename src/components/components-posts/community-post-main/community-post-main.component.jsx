// scss
import './community-post-main.scss';

// image
import ArrowRight from '../../../assets/post/iconoir_arrow-right.svg';
import Ellipse from '../../../assets/post/Ellipse.svg';

const PostPageMain = () => {
  return (
    <div className='post-main-container'>
      <div className='post-main-shape'></div>
      <div className='post-main-inner-container'>
        <h1>Join a community of beauty and empowerment</h1>
        <h6>
          Charm Life lets you share your cosmetic experience with others and
          stay on-trend
        </h6>
        <div className='post-main-link'>
          <p>
            Creating a post{' '}
            <img
              src={ArrowRight}
              alt='ArrowRight'
              className='arrow-right-icon'
            />
          </p>
        </div>
      </div>
      <img src={Ellipse} alt='Ellipse' className='ellipse-icon' />
    </div>
  );
};

export default PostPageMain;
