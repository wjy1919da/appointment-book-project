import { useNavigate } from "react-router-dom";
import "./home-button-pink.styles.scss";
// button with link
// props: link title, link href, onClick handler
const HomeButtonPink = (props) => {
  const navigate = useNavigate();
  const handleClick = async () => {
    if (props.href) {
      await navigate(props.href);

      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: "smooth",
      });
    }
    if (props.onClick) {
      props.onClick();
    }
  };
  const hasIcon = props.isIcon;
  const buttonStyle = {
    width: props.width || "auto",
    height: props.height || "auto",
    // if width is not provided, it defaults to 'auto'
    // Other styles can be added here
  };

  return (
    <button className="home-button-pink" onClick={handleClick}>
      {props.isIcon && (
        <img src={props.isIcon} className="HomeButton-icon" alt="search" />
      )}
      {props.title}
    </button>
  );
};

export default HomeButtonPink;
