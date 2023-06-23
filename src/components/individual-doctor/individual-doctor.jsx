import React,{ useEffect, useLayoutEffect, useState }from 'react';
import "./individual-doctor.styles.scss";
import DoctorProfile from '../doctor-profile/doctor-profile';
import DoctorAbout from '../doctor-about/doctor-about.component';
import DoctorReviewCard from '../doctor-review-card/doctor-review-card';
import DoctorProfileImage from '../../assets/doctor/profile2.png'
import DoctorProfileImage2 from '../../assets/doctor/profile3.png'
import { useGetDoctorReviews } from '../../hooks/useSearchDoctors';
import HomeSpinner from '../home-spinner/home-spinner.component';
import { useParams } from 'react-router-dom';
import useDoctorQueryStore from '../../store.ts';
import InfiniteScroll from 'react-infinite-scroll-component';
import DoctorPost from '../doctor-post/doctor-post.component';
// const IndividualDoctor = () => {

//     const review = [{profileImage:DoctorProfileImage,name:"reviewer Name",starRate:40,
//     reviewText:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
//     verified:true,date:"2023/05/06"},
//     {profileImage:DoctorProfileImage2,name:"reviewer Name",starRate:50,
//     reviewText:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
//     verified:false,date:"2023/23/05"},{profileImage:DoctorProfileImage,name:"reviewer Name",starRate:40,
//     reviewText:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
//     verified:true,date:"2023/11/05"},
//     {profileImage:DoctorProfileImage2,name:"reviewer Name",starRate:50,
//     reviewText:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
//     verified:false,date:"2023/05/05"}]
//     return (
//         <div className='individual-doctor-container'>
//             <div className="individual-doctor-left-container">
//                 <DoctorProfile/>
//             </div>
//             <div className="individual-doctor-right-container">
//             {review.map((post, index) => (
//                 <div key={index}>
//                 <DoctorReviewCard
//                     key={post.id}
//                     profileImage={post.profileImage}
//                     name={post.name}
//                     starRate={post.starRate}
//                     reviewText={post.reviewText}
//                     date={post.date}
//                     verified={post.verified}
//                 />
//                 </div>
//             ))}
//             </div>
//         </div>
//     )
// }
const IndividualDoctor = () => {

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  });

  const profileImage1 = DoctorProfileImage;
  const { nickname } = useParams(); // Assuming "nickname" is the parameter in the URL
  const doctorQuery = useDoctorQueryStore((state) => state.doctorQuery);
  const setNickName = useDoctorQueryStore((state) => state.setNickName);
  const { data, error, isLoading,isFetchingNextPage, fetchNextPage,hasNextPage} = useGetDoctorReviews(); // Destructure the reviews, error, and isLoading from the hook
  const [activeTab, setActiveTab] = useState(0);
  const tabs = ['About', 'Posts', 'Reviews'];
  const flatData = data ? data.pages.flatMap(page => page.data) : [];
  console.log("data",data)
  console.log("setNickName",nickname)

  useEffect(() => {
      setNickName(nickname);
  }, [nickname]);

  if (isLoading) {
    return <HomeSpinner />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const selectTab = (index) => {
    setActiveTab(index);
  }

  return (
    <div className="individual-doctor-container">
      <div className="individual-doctor-left-container">
        <DoctorProfile />
      </div>
      <div className="individual-doctor-right-container">
        <div className='individual-doctor-tabs'>
          {tabs.map((item, index) => (
            <div 
              className={`individual-doctor-tab ${activeTab === index ? 'active' : ''}`}
              onClick={() => selectTab(index)}>
              {item}
              <div className="individual-doctor-tab-underline"></div>
            </div>
          ))}
        </div>
        <InfiniteScroll
          dataLength={flatData.length}
          next={fetchNextPage}
          hasMore={hasNextPage}
          scrollThreshold={0.1} 
        >
          {activeTab === 0 && 
            <DoctorAbout />}
          {activeTab === 1 &&
            <div className="individual-doctor-posts">
              <DoctorPost  />
            </div>}
          {activeTab === 2 && flatData?.map((review, index) => (
            <DoctorReviewCard
              key={index}
              profileImage={review.img}
              name={review.nickname}
              starRate={review.score}
              reviewText={review.text}
              date={new Date(review.addTime*1000).toLocaleDateString()}
            />
          ))}
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default IndividualDoctor;