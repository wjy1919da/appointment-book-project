import { Link, useNavigate } from 'react-router-dom';
import './home-link.styles.scss';

const HomeLink = (props) => {
  const navigate = useNavigate();

  const handleClick = async () => {
    if (props.href) {
      await navigate(props.href);

      // Scroll to the element with ID 'community-posts'
      const element = document.getElementById('community-posts');
      if (element) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
          inline:'nearest'
        });
      }
    }

    if (props.onClick) {
      props.onClick();
    }
  };

  return (
    <button onClick={handleClick} className="home-link">
      {props.title}
    </button>
  );
};

export default HomeLink;
