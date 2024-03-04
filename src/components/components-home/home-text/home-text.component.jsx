import "./home-text.styles.scss";
const HomeText = (props) => {
  const titleStyles = {
    fontSize: props.titleFontSize,
  };

  const contentStyles = {
    fontSize: props.contentFontSize,
  };
  return (
    <div className="home-text-container">
      <div className="home-text-title" style={titleStyles}>
        {props.title}
      </div>
      <div className="home-text-content" style={contentStyles}>
        {props.content}
      </div>
    </div>
  );
};
export default HomeText;
