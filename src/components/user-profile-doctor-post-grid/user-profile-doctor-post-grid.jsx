// import React, { useState, useEffect } from "react";
// import usePostQueryStore from "../../postStore";
// import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
// import { Link } from "react-router-dom";
// import { useMediaQuery } from "react-responsive";

// // components
// import CommunityPost from "../components-posts/community-post/community-post.component";
// import PostDetail from "../components-posts/community-post-detail/community-post-detail.component";
// import HomeSpinner from "../home-spinner/home-spinner.component";
// import InfiniteScroll from "react-infinite-scroll-component";
// import ErrorMsg from "../error-msg/error-msg.component";

// // hook
// import { useGetDoctorPost } from "../../hooks/useApiRequestPostFilter.js";

// // images
// import Arrow from "../../assets/post/arrow_grid.png";
// import Arrow1 from "../../assets/post/arrow1_grid.png";

// // scss
// import "./user-profile-doctor-post-grid.scss";

// const UserProfileDoctorPostGrid = () => {
//   const { data, isLoading, error, fetchNextPage, hasNextPage } =
//     useGetDoctorPost();

//   // console.log(data);

//   const [IsModalOpen, setIsModelOpen] = useState(false);
//   const setMemberID = usePostQueryStore((state) => state.setMemberID);
//   const setTitle = usePostQueryStore((state) => state.setTitle);
//   const setUserName = usePostQueryStore((state) => state.setUserName);
//   const setUserAvatar = usePostQueryStore((state) => state.setUserAvatar);
//   const setPostID = usePostQueryStore((state) => state.setPostID);
//   const flatData = data?.pages?.flatMap((page) => page.data || []) || [];
//   const isMobile = useMediaQuery({ query: `(max-width: 1024px)` });
//   const [gutterwidth, setGutterWidth] = useState("");

//   const isMobileOrAbout = isMobile;

//   useEffect(() => {
//     setGutterWidth(isMobileOrAbout ? "0px" : "10px");
//   }, [isMobile]);

//   if (isLoading) return <HomeSpinner />;
//   if (error) return <ErrorMsg />;

//   const handleClickPost = (ID, avatar, username, title, memberId) => {
//     setIsModelOpen(true);
//     setPostID(ID);
//     setUserAvatar(avatar);
//     setUserName(username);
//     setTitle(title);
//     setMemberID(memberId);
//   };

//   const postCardList = flatData.map((post) => (
//     <div
//       className="btn"
//       onClick={() =>
//         handleClickPost(post.id, post.avatar, post.username, post.memberId)
//       }
//       key={post.id}
//     >
//       <CommunityPost
//         imageURL={post.coverImg || []}
//         text={post.title || ""}
//         profileImage={post.avatar || ""}
//         authorName={post.nickname || ""}
//         likes={post.likedCount || 0}
//       />
//     </div>
//   ));

//   return (
//     <div className="doctor-post-grid-inner-container">
//       {data && (
//         <InfiniteScroll
//           dataLength={flatData.length}
//           next={fetchNextPage}
//           hasMore={hasNextPage}
//           scrollThreshold={0.8}
//         >
//           <ResponsiveMasonry
//             columnsCountBreakPoints={{
//               default: 3,
//               2500: 6,
//               2047: 5,
//               1700: 4,
//               1024: 3,
//               600: 2,
//             }}
//             gutter={gutterwidth}
//           >
//             <Masonry gutter={gutterwidth}>{postCardList}</Masonry>
//           </ResponsiveMasonry>
//         </InfiniteScroll>
//       )}
//       {IsModalOpen && (
//         <PostDetail
//           show={IsModalOpen}
//           onHide={() => setIsModelOpen(false)}
//           isMobile={isMobile}
//         />
//       )}

//       {flatData.length > 0 && flatData[0].coverImg && (
//         <div className="down-load-more-container">
//           {!isMobile && (
//             <img src={Arrow} alt="arrow" className="arrow-containter" />
//           )}
//           {isMobile && (
//             <img src={Arrow1} alt="arrow1" className="arrow1-containter" />
//           )}
//           <div className="download-text">Join Charm community to view more</div>
//           <Link to="/download">
//             <button className="download-button">
//               <div className="download-button-text">DownLoad APP</div>
//             </button>
//           </Link>
//         </div>
//       )}
//     </div>
//   );
// };

// export default UserProfileDoctorPostGrid;
