import React, { useState, useEffect } from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { Link, useParams, useLocation, useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import usePostQueryStore from "../../postStore.ts";
import { Skeleton, useToast } from "@chakra-ui/react";

// components
import CommunityPost from "../components-posts/community-post/community-post.component.jsx";
import PostDetail from "../components-posts/community-post-detail/community-post-detail.component.jsx";
import InfiniteScroll from "react-infinite-scroll-component";
import CommunityPostSkeleton from "../components-posts/community-post/community-post-skeleton.component.jsx";

// scss
import "./community-post-grid.styles.scss";

// images
import Arrow1 from "../../assets/post/arrow1_grid.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesDown } from "@fortawesome/free-solid-svg-icons";
import { set } from "date-fns";
const DoctorPostGrid = ({
  data,
  fetchNextPage,
  hasNextPage,
  isLoading,
  error,
  download,
  breakPoints,
}) => {
  const hasData = data?.pages?.some(
    (page) => page.data && page.data.length > 0
  );
  const navigate = useNavigate();
  const location = useLocation();

  const [IsModalOpen, setIsModelOpen] = useState(false);
  const setPostID = usePostQueryStore((state) => state.setPostID);
  const setUserName = usePostQueryStore((state) => state.setUserName);
  const setIsHighlight = usePostQueryStore((state) => state.setIsHighlight);
  const setIsPrivate = usePostQueryStore((state) => state.setIsPrivate);
  const setIsLike = usePostQueryStore((state) => state.setIsLike);
  const setUserAvatar = usePostQueryStore((state) => state.setUserAvatar);
  const setMemberID = usePostQueryStore((state) => state.setMemberID);
  const setTitle = usePostQueryStore((state) => state.setTitle);
  const flatData = data?.pages?.flatMap((page) => page.data || []) || [];
  // const flatData = [];
  const isMobile = useMediaQuery({ query: `(max-width: 744px)` });
  // const isMobile = useMediaQuery({ query: `(max-width: 1024px)` });
  const iPhoneScreen = useMediaQuery({ query: `(max-width: 375px)` });
  const [gutterwidth, setGutterWidth] = useState("");
  const isMobileOrAbout = isMobile;
  // console.log("flatData", flatData);

  const { postid } = useParams();
  const toast = useToast();

  const handleClickPost = (
    ID,
    avatar,
    username,
    title,
    memberId,
    isHighlight,
    isPrivate,
    isLike,
    highlightStatus
  ) => {
    setIsModelOpen(true);
    setPostID(ID);
    setUserAvatar(avatar);
    setUserName(username);
    setTitle(title);
    setMemberID(memberId);
    setIsHighlight(isHighlight);
    setIsPrivate(isPrivate);
    setIsLike(isLike);
    setIsHighlight(highlightStatus);

    const normalizedPathname = location.pathname.endsWith("/")
      ? location.pathname.slice(0, -1)
      : location.pathname;
    const newPath = `${normalizedPathname}/${ID}`;
    navigate(newPath);
  };
  if (error) {
    navigate("*");
  }
  useEffect(() => {
    setGutterWidth(isMobileOrAbout ? "0px" : "10px");
  }, [isMobile]);
  const skeletons = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const postCardList = isLoading
    ? skeletons.map((skeleton) => <CommunityPostSkeleton key={skeleton} />)
    : flatData.map((post) => (
        <div
          className="btn"
          onClick={() => {
            handleClickPost(
              post.id,
              post.avatar,
              post.nickname || post.username,
              post.title,
              post.memberId,
              post.isHighlight,
              post.isDisplay,
              post.isLike,
              post.highlightStatus
            );
          }}
          key={post.id}
        >
          <CommunityPost
            dummyHighlight={post.highlightStatus}
            dummyPrivate={post.isDisplay}
            id={post.id}
            imageURL={post.coverImg || ""}
            text={post.title || ""}
            profileImage={post.avatar || ""}
            authorName={post.nickname || post.username || ""}
            likes={post.likedCount || post.like_count || 0}
            liked={post.isLike}
            status={post.status}
          />
        </div>
      ));
  return (
    <div className="doctor-post-grid-inner-container">
      <div className="doctor-post-grid-container">
        {hasData || isLoading ? (
          <InfiniteScroll
            dataLength={flatData.length}
            next={fetchNextPage ? () => fetchNextPage() : undefined}
            hasMore={!!hasNextPage}
            scrollThreshold={0.8}
          >
            <div style={{ padding: "0 7%" }}>
              <ResponsiveMasonry
                columnsCountBreakPoints={breakPoints}
                gutter={gutterwidth}
              >
                <Masonry gutter={gutterwidth}>{postCardList}</Masonry>
              </ResponsiveMasonry>
            </div>
          </InfiniteScroll>
        ) : (
          !isLoading && (
            <span className="post-search-no-results">No results here.</span>
          )
        )}
      </div>

      {hasData && download && (
        <div className="down-load-more-container">
          {!isMobile && (
            <FontAwesomeIcon icon={faAnglesDown} className="arrow-containter" />
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
      )}
      {IsModalOpen && (
        <PostDetail
          show={IsModalOpen}
          onHide={() => {
            setIsModelOpen(false);
            navigate(-1);
          }}
          isMobile={isMobile}
          iPhoneScreen={iPhoneScreen}
        />
      )}
    </div>
  );
};

export default DoctorPostGrid;
