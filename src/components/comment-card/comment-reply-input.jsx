import "./comment-card.styles.scss";
import SendIcon from "../../assets/post/send_icon.svg";
const CommentReplyInput = ({ textareaRef, onSubmit, ...otherPros }) => {
  return (
    <form onSubmit={onSubmit}>
      <div className="textarea-with-icon">
        <textarea
          {...otherPros}
          ref={textareaRef}
          type="text"
          placeholder="Type Something..."
          className="comment-card-input"
        />
        <button type="submit">
          <img src={SendIcon} alt="sendIcon" className="textarea-icon" />
        </button>
      </div>
    </form>
  );
};

export default CommentReplyInput;
