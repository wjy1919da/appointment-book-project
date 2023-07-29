import heartIcon from "../../assets/post/heart.png"
import "./community-post-mobile.styles.scss";

const CommunityPostMobile = ({imageURL,text,profileImage,authorName,likes}) => {
  return (
    <div className="post-mobile-container">
         <div >
            <img src={imageURL[0]} className="postImage-mobile"></img>
        </div>
        <div className="postInformation-mobile">
            <span className="post-text-mobile">{text}</span>
           
            <div className="post-profile-mobile">
                    <div className="post-profile-container-mobile">
                        <img className = 'post-profile-pic-mobile' src={profileImage}></img>
                        <span className="gray-text-mobile">{authorName}</span>
                    </div>
                    <div className="likeNumber-mobile">
                        <img src={heartIcon} className="heartIcon-mobile"></img>
                        <span className="gray-text-mobile">{likes}</span>
                    </div>
            </div>
        </div>
    </div>
  )
}

export default CommunityPostMobile;