import { useState, useEffect } from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import usePostQueryStore from "../../../postStore.ts";
import { useMediaQuery } from "react-responsive";

// components
import CreatePostOfUser from "../../create-post/create-post";
import CommunityPost from "../../components-posts/community-post/community-post.component";
import PostDetail from "../../components-posts/community-post-detail/community-post-detail.component";

// scss
import "./doctor-own-profile-grid.scss";

// images
import post1 from "../../../assets/doctor/post3.png";
import creatPostIcon from "../../../assets/post/create-post-icon.png";
import userPostAvatar from "../../../assets/post/user-profile-avatar.png";

const DoctorProfileGrid = ({ showCreatePost, setShowCreatePost }) => {
  let data = {
    pages: [
      {
        data: [
          {
            id: 13,
            title: "哈哈哈",
            coverImg:
              "http://dxm72.longcai.pw/uploads/20220403/5235ed292a68dc6e07fe8b11e49af30a.png",
            memberId: 262,
            nickname: "DrJohnDoe",
            likedCount: 2,
          },
          {
            id: 72,
            title: "11",
            coverImg:
              "http://dxm72.zihai.shop/uploads/20220725/a26366a3b047841bf7c8fe24f50c200e.jpg",
            memberId: 84,
            nickname: "rgwyq1",
            likedCount: 4,
          },
          {
            id: 74,
            title: "hajs",
            coverImg:
              "http://dxm72.zihai.shop/uploads/20220819/3b33d04748999acf876fc17a761c3c6d.png",
            memberId: 94,
            nickname: "zbzm",
            likedCount: 2,
          },
          {
            id: 75,
            title: "我们的生活方式是什么意思123",
            coverImg:
              "http://dxm72.zihai.shop/uploads/20220819/7399be71bbdacc8037682ef726e5d45a.png",
            memberId: 94,
            nickname: "zbzm",
            likedCount: 2,
          },
        ],
        pageInfo: {
          currentPage: 1,
          totalPage: 6,
          pageSize: 12,
          totalRecords: 62,
        },
      },
    ],
    pageParams: [null],
  };

  const [userAvatar, setUserAvatar] = useState("");
  const [userName, setUserName] = useState("");
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [IsModalOpen, setIsModelOpen] = useState(false);
  const setPostID = usePostQueryStore((state) => state.setPostID);
  const setMemberID = usePostQueryStore((state) => state.setMemberID);
  const setTitle = usePostQueryStore((state) => state.setTitle);
  const setDescription = usePostQueryStore((state) => state.setDescription);
  const flatData = data?.pages?.flatMap((page) => page.data || []) || [];

  // create a post + icon button
  const handleIconClick = () => {
    setShowCreatePost(true);
  };

  // width
  const isMobile = useMediaQuery({ query: `(max-width: 1024px)` });

  const [gutterwidth, setGutterWidth] = useState("20px");

  const breakPoint = {
    default: 4,
    2500: 4,
    2047: 4,
    1700: 4,
    1024: 4,
    767: 3,
    430: 2,
  };

  const handleClickPost = (ID, avatar, username, title, memberId) => {
    setIsModelOpen(true);
    setPostID(ID);
    setUserAvatar(avatar);
    setUserName(username);
    setTitle(title);
    setMemberID(memberId);
  };

  const postList = flatData.map((post, index) => (
    <div
      key={index}
      onClick={() =>
        handleClickPost(
          post.id,
          post.avatar,
          post.username,
          post.title,
          post.memberId
        )
      }
    >
      <CommunityPost
        imageURL={post.coverImg || []}
        text={post.title || ""}
        profileImage={post.avatar || ""}
        authorName={post.username || ""}
        likes={post.like_count || 0}
      />
    </div>
  ));

  useEffect(() => {
    const images = [creatPostIcon, post1, userPostAvatar];

    let loadedImagesCount = 0;

    images.forEach((src) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        loadedImagesCount += 1;
        if (loadedImagesCount === images.length) {
          setImagesLoaded(true);
        }
      };
    });
  }, []);

  return (
    <div className="doctor-profile-post-grid-container">
      {!showCreatePost && imagesLoaded && (
        <div className="doctor-profile-post-grid-choose-picture-conatiner-post">
          <ResponsiveMasonry
            columnsCountBreakPoints={breakPoint}
            gutter={gutterwidth}
          >
            <Masonry gutter={gutterwidth}>
              <div className="doctor-profile-post-grid-choose-picture-section-image-post">
                <img
                  src={creatPostIcon}
                  onClick={handleIconClick}
                  className="doctor-profile-post-grid-choose-picture-section-image"
                  alt="Create Post"
                />
              </div>
              {postList}
            </Masonry>
          </ResponsiveMasonry>
        </div>
      )}

      {showCreatePost && <CreatePostOfUser />}

      {IsModalOpen && (
        <PostDetail
          show={IsModalOpen}
          onHide={() => setIsModelOpen(false)}
          isMobile={isMobile}
        />
      )}
    </div>
  );
};

export default DoctorProfileGrid;
