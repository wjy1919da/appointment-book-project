import "./comment-card.styles.scss";
import SendIcon from "../../assets/post/send_icon.svg";
const CommentReplyInput = ({ onClick, ...otherPros }) => {
  return (
    <div className="textarea-with-icon">
      <textarea
        {...otherPros}
        type="text"
        placeholder="Type Something..."
        className="comment-card-input"
      />
      <button onClick={onClick}>
        <img src={SendIcon} alt="sendIcon" className="textarea-icon" />
      </button>
    </div>
  );
};

export default CommentReplyInput;
