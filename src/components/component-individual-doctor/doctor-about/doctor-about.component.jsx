import "./doctor-about.styles.scss";
import { useState } from "react";
import { useMediaQuery } from "react-responsive";
import DoctorAboutSection from "../../doctor-about-section/doctor-about-section.component";
import DocotorOwnVoucherCard from "../../doctor-own-profile/doctor-profile-voucher-card";
import DoctorReviewGrid from "../../../components/component-individual-doctor/doctor-review-grid/doctor-review-grid.component";
import CommunityPost from "../../components-posts/community-post/community-post.component";
import PostDetail from "../../components-posts/community-post-detail/community-post-detail.component";
import { useGetDoctorAbout } from "../../../hooks/useGetIndividualDoctor";
import { useApiRequestPostFilter } from "../../../hooks/useApiRequestPostFilter";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import usePostQueryStore from "../../../postStore.ts";
import APIClient from "../../../services/api-client";

import highlightYear from "../../../assets/doctor/highlight-year.png";
import highlightVerified from "../../../assets/doctor/highlight-verified.png";
import highlightAppointment from "../../../assets/doctor/highlight-appointment.png";
import backArrow from "../../../assets/doctor/left_back.png";

const DoctorAbout = ({encodedMemberId}) => {
    // const [voucherExpanded, setVoucherExpanded] = useState(false);
    const [specializations, setSpecializations] = useState([]);
    const [highlights, setHighlights] = useState([]);
    const [loadingPosts, setLoadingPosts] = useState(true);
    const [postCounter, setPostCounter] = useState(0);
    // const [selectedPosts, setSelectedPosts] = useState([]);
    const { data, error, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage } = useGetDoctorAbout();
    // UNCOMMENT FOR 2.0 RELEASE
    // const [vouchers, setVouchers] = useState([{'FakeKey': "FakeValue"}]);
    const navigate = useNavigate();
    const isMobilePhone = useMediaQuery({ query: `(max-width: 744px)` });
    // console.log('doctor about data is: ', data);

    const objArray = [{
        "id": 13,
        "title": "哈哈哈",
        "coverImg": "http://dxm72.longcai.pw/uploads/20220403/5235ed292a68dc6e07fe8b11e49af30a.png",
        "memberId": 262,
        "nickname": "DrJohnDoe",
        "avatar": "http://example.com/path-to-user-image.jpg",
        "likedCount": 4
    }, {
        "id": 96,
        "title": "test",
        "coverImg": "http://charm.zihai.shop/uploads/20230309/c901c6b01512a69bb47d71ba661f9dde.png",
        "memberId": 108,
        "nickname": "lmlyb",
        "avatar": "http://dxm72.zihai.shop/uploads/20220321/baf4631f46ca84d67baefc36657f95e8.png",
        "likedCount": 4
    }, {
        "id": 97,
        "title": "e",
        "coverImg": "http://charm.zihai.shop/uploads/20230311/f735a4a8be791b70c5dc3688671ef421.png",
        "memberId": 85,
        "nickname": "dd2",
        "avatar": "http://dxm72.zihai.shop/uploads/20220321/baf4631f46ca84d67baefc36657f95e8.png",
        "likedCount": 5
    }, {
        "id": 113,
        "title": "这次又有",
        "coverImg": "http://charm.zihai.shop/uploads/20230410/0ae250dbac59a798b7c72abd4f12f9cf.png",
        "memberId": 106,
        "nickname": "用户1",
        "avatar": "http://dxm72.zihai.shop/uploads/20220321/baf4631f46ca84d67baefc36657f95e8.png",
        "likedCount": 1
    }
]

    useEffect(() => {  // for grabbing specializations
        if (data?.pages[0]?.data?.interesteds) {
            setSpecializations(data?.pages[0]?.data?.interesteds);
        }
        const retrieveHighlightedPosts = async () => {
            const apiClient = new APIClient(`/post/highlight/${encodedMemberId}`);
            try {
                const res = await apiClient.get();
                // console.log('doctor highlights returned as: ', res);
                if (res?.data?.data?.length === 0) {
                    throw new Error;
                } else {
                    // console.log('HERE1000!')
                    setHighlights(res?.data?.data);
                }
            } catch (err) {
                console.log('unable to retrieve doctor highlights: ', err);
                // setHighlights(objArray);
            } finally {
                setLoadingPosts(false);
            }
      };
      retrieveHighlightedPosts();
    }, [data]);

    const getSelectedPosts = () => {
        let holder = [];
        console.log('isMobilePhone is: ', isMobilePhone);
        if (highlights.length > 0) {
            if (isMobilePhone) {  // only want to show 2 highlighted posts when user is on mobile
                if (highlights.length === 1 || highlights.length === 2) {
                    holder = [...highlights]
                } else {
                    holder = [highlights[postCounter], highlights[(postCounter + 1) % (highlights.length)]];
                }
            } else {
                if (highlights.length === 1 || highlights.length === 2 || highlights.length === 3) {
                    holder = [...highlights]
                } else {
                    holder = [highlights[postCounter], highlights[(postCounter + 1) % (highlights.length)], highlights[(postCounter + 2) % (highlights.length)]];
                }
            }
            
        }
        console.log('returning holder as: ', holder);
        return holder;
    }

  const highlightMoveForward = () => {
    setPostCounter((postCounter + 1) % highlights.length);
  };

  const highlightMoveBack = () => {
    setPostCounter(
      (((postCounter - 1) % highlights.length) + highlights.length) %
        highlights.length
    );
  };

  //UNCOMMENT FOR 2.0 RELEASE
  // useEffect(() => {
  //     setVouchers(programs);
  // }, [])

  if (isLoading || loadingPosts) {
    return <div>Loading...</div>;
  }

  if (error) {
    navigate("*");
  }

  // if (!data || !data.pages[0]?.data) {
  //     return <div>No data available</div>;
  // }

  // UNCOMMENT FOR 2.0 RELEASE!
  // const voucherClick = (item) => {
  //     console.log('item is: ', item);
  //     const holder = vouchers.filter((voucher) => voucher === item);
  //     setVouchers(holder);
  // }

  return (
    <div className="indv-doctor-about-container">
      {/* UNCOMMENT FOR 2.0 RELEASE */}
      {/* <div className='indv-vouchers-big-container' >
                <div className='vouchers-title-container' >
                    <h3 className='indv-vouchers-title' >Vouchers</h3>
                </div>
                <div className='vouchers-container' >
                    {vouchers?.length > 0 ? vouchers?.map((item, index) => {
                        return <DocotorOwnVoucherCard key={index} onClick={() => voucherClick(item)}/>
                    }) : <h3 className='indv-no-vouchers-title' >No vouchers currently available, check back later for more great deals!</h3>}
                </div>
            </div> */}
      <div className="indv-specialization-big-container">
        <div className="specialization-title-container">
          <h3 className="indv-specialization-title">Specialization</h3>
        </div>
        <div className="specialization-tabs-container">
          {specializations?.map((item, index) => {
            return <SpecializationIcon specialization={item} key={index} />;
          })}
        </div>
      </div>
      <HighlightCases
        selected={getSelectedPosts()}
        moveBack={highlightMoveBack}
        moveForward={highlightMoveForward}
      />
      {/* UNCOMMENT FOR 2.0 RELEASE */}
      {/* <div className='indv-customer-review-container' >
                <div className='customer-review-section-title-container' >
                    <h3 className='customer-review-section-title' >Customer Review</h3>
                </div>
                <div className='customer-review-review-container' >
                    <DoctorReviewGrid />
                </div>
            </div> */}
    </div>
  );
};

const SpecializationIcon = ({ specialization }) => {
  const imgUrl = specialization.content;
  const title = convertTitle(specialization.title);
  return (
    <div className="indv-procedure-icon-container">
      <div className="indv-procedure-icon-img-container">
        <img className="indv-procedure-icon-img" src={imgUrl} alt="procedure" />
      </div>
      <div className="indv-procedure-icon-title-container">
        <h3 className="indv-procedure-icon-title">{title}</h3>
      </div>
    </div>
  );
};

const HighlightCases = ({ selected, moveBack, moveForward }) => {
  const isMobile = useMediaQuery({ query: `(max-width: 1024px)` });
  const [IsModalOpen, setIsModelOpen] = useState(false);
  const setPostID = usePostQueryStore((state) => state.setPostID);
  const setUserName = usePostQueryStore((state) => state.setUserName);
  const setIsHighlight = usePostQueryStore((state) => state.setIsHighlight);
  const setIsPrivate = usePostQueryStore((state) => state.setIsPrivate);
  const setUserAvatar = usePostQueryStore((state) => state.setUserAvatar);
  // const postQuery = usePostQueryStore((state) => state.postQuery);
  const setMemberID = usePostQueryStore((state) => state.setMemberID);
  const setTitle = usePostQueryStore((state) => state.setTitle);
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
  return (
    <div className="indv-highlight-cases-container">
      <div className="highlight-cases-top-row">
        <div className="highlight-cases-title-container">
          <h3 className="highlight-cases-title">Highlight Cases</h3>
        </div>
        <div className="highlight-cases-arrows-container">
          <div className="highlight-cases-arrow-container">
            <img
              src={backArrow}
              className="highlight-cases-back-arrow highlight-cases-arrow"
              onClick={moveBack}
              alt="back arrow"
            />
          </div>
          <div className="highlight-cases-arrow-container">
            <img
              src={backArrow}
              className="highlight-cases-forward-arrow highlight-cases-arrow"
              onClick={moveForward}
              alt="forward arrow"
            />
          </div>
        </div>
      </div>
      <div
        className={`highlight-cases-cases-container ${
          selected?.length > 0 ? "highlight-cases-container-space-around" : ""
        }`}
      >
        {IsModalOpen && (
          <PostDetail
            show={IsModalOpen}
            onHide={() => setIsModelOpen(false)}
            isMobile={isMobile}
          />
        )}
        {selected.length > 0 ? (
          selected.map((item) => {
            return (
              <div className="highlight-cases-highlights-container">
                {" "}
                <HighlightPost
                  post={item}
                  handlePostClick={handleClickPost}
                  key={item?.id}
                />{" "}
              </div>
            );
          })
        ) : (
          <div className="highlight-cases-no-posts-text-container">
            <h2 className="highlight-cases-no-posts-text">
              This doctor has no highlighted posts. Check back later!
            </h2>
          </div>
        )}
      </div>
    </div>
  );
};

const HighlightPost = ({ post, handlePostClick }) => {
  return (
    <div className="highlight-post-container">
      <div
        className="btn"
        onClick={() => {
          handlePostClick(
            post.id,
            post.avatar,
            post.nickname,
            post.title,
            post.memberId
          );
        }}
      >
        <CommunityPost
          dummyPrivate={post?.isDisplay}
          id={post?.id}
          imageURL={post?.coverImg || []}
          text={post?.title || ""}
          profileImage={post?.avatar || ""}
          authorName={post?.nickname || ""}
          likes={post?.likedCount || 0}
        />
      </div>
    </div>
  );
};

const convertTitle = (string) => {
  const splitItem = string.split("_");
  const upperCased = splitItem.map(
    (word) => word.charAt(0).toUpperCase() + word.slice(1)
  );
  const procedureTitle = upperCased.join(" ");
  return procedureTitle;
};
export { HighlightCases };
export default DoctorAbout;
