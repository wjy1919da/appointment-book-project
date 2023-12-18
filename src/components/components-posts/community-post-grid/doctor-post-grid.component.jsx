import React, { useState, useEffect } from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import usePostQueryStore from "../../../postStore.ts";

// components
import CommunityPost from "../community-post/community-post.component";
import PostDetail from "../community-post-detail/community-post-detail.component";
import HomeSpinner from "../../home-spinner/home-spinner.component";
import InfiniteScroll from "react-infinite-scroll-component";
import ErrorMsg from "../../error-msg/error-msg.component";

// hook
import { useApiRequestPostFilter } from "../../../hooks/useApiRequestPostFilter";
import { useGetLikesPost } from "../../../hooks/useGetPosts";

// scss
import "./doctor-post-grid.styles.scss";

// images
import Arrow from "../../../assets/post/arrow_grid.png";
import Arrow1 from "../../../assets/post/arrow1_grid.png";
import { set } from "date-fns";

// import userInfoQueryStore from '../../../userStore.ts';
// import Cookie from 'js-cookie';

const DoctorPostGrid = ({ isAbout }) => {
  const navigate = useNavigate();

  // hook
  const { data, error, isLoading, fetchNextPage, hasNextPage } =
    useApiRequestPostFilter();

  const [IsModalOpen, setIsModelOpen] = useState(false);
  const setPostID = usePostQueryStore((state) => state.setPostID);
  const setUserName = usePostQueryStore((state) => state.setUserName);
  const setIsHighlight = usePostQueryStore((state) => state.setIsHighlight);
  const setIsPrivate = usePostQueryStore((state) => state.setIsPrivate);
  const setUserAvatar = usePostQueryStore((state) => state.setUserAvatar);
  // const postQuery = usePostQueryStore((state) => state.postQuery);
  const setMemberID = usePostQueryStore((state) => state.setMemberID);
  const setTitle = usePostQueryStore((state) => state.setTitle);
  // const [title, setTitle] = useState("");
  const flatData = data?.pages?.flatMap((page) => page.data || []) || [];
  const isMobile = useMediaQuery({ query: `(max-width: 1024px)` });
  const [gutterwidth, setGutterWidth] = useState("");
  const isMobileOrAbout = isMobile || isAbout;
  // console.log("flatData", flatData);

  const { postid } = useParams();

  const handleClickPost = (
    ID,
    avatar,
    username,
    title,
    memberId,
    isHighlight,
    isPrivate
  ) => {
    setIsModelOpen(true);
    setPostID(ID);
    setUserAvatar(avatar);
    setUserName(username);
    setTitle(title);
    setMemberID(memberId);
    // setIsHighlight(isHighlight);
    setIsPrivate(isPrivate);
  };

  useEffect(() => {
    setGutterWidth(isMobileOrAbout ? "0px" : "10px");
  }, [isMobile]);
  if (isLoading) return <HomeSpinner />;
  if (error) return <ErrorMsg />;

  const postCardList = flatData.map((post) => (
    <div
      className="btn"
      onClick={() => {
        handleClickPost(
          post.id,
          post.avatar,
          post.username,
          post.title,
          post.memberId
        );
        navigate("/posts/" + post.id);
      }}
      key={post.id}
    >
      <CommunityPost
        dummyPrivate={post.isDisplay}
        id={post.id}
        imageURL={post.coverImg || []}
        text={post.title || ""}
        profileImage={post.avatar || ""}
        authorName={post.nickname || ""}
        likes={post.likedCount || 0}
      />
    </div>
  ));

  return (
    <div className="doctor-post-grid-inner-container">
      {flatData && (
        <InfiniteScroll
          dataLength={flatData.length}
          next={fetchNextPage}
          hasMore={hasNextPage}
          scrollThreshold={0.8}
        >
          <ResponsiveMasonry
            columnsCountBreakPoints={{
              default: 5,
              2500: 8,
              2047: 7,
              1700: 6,
              1024: 5,
              767: 3,
              430: 2,
            }}
            gutter={gutterwidth}
          >
            <Masonry gutter={gutterwidth}>{postCardList}</Masonry>
          </ResponsiveMasonry>
        </InfiniteScroll>
      )}
      {IsModalOpen && (
        <PostDetail
          show={IsModalOpen}
          onHide={() => setIsModelOpen(false)}
          isMobile={isMobile}
        />
      )}
      <div className="down-load-more-container">
        {!isMobile && (
          <img src={Arrow} alt="arrow" className="arrow-containter" />
        )}
        {isMobile && (
          <img src={Arrow1} alt="arrow1" className="arrow1-containter" />
        )}
        <div className="download-text">Join Charm community to view more</div>
        <Link to="/download">
          <button className="download-button">
            <div className="download-button-text">DownLoad APP</div>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default DoctorPostGrid;
