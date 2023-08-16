import React, {useEffect, useLayoutEffect, useState} from 'react';
import "./individual-doctor.styles.scss";
import DoctorProfile from '../component-individual-doctor/doctor-profile/doctor-profile';
import DoctorAbout from '../component-individual-doctor/doctor-about/doctor-about.component';
import DoctorReview from '../component-individual-doctor/doctor-review-card/doctor-review-card';
// import DoctorProfileImage from '../../assets/doctor/profile2.png'
import {useGetDoctorReviews} from '../../hooks/useGetIndividualDoctor';
import HomeSpinner from '../home-spinner/home-spinner.component';
import {useParams} from 'react-router-dom';
import useDoctorQueryStore from '../../store.ts';
import InfiniteScroll from 'react-infinite-scroll-component';
import DoctorPostGrid from '../components-posts/community-post-grid/doctor-post-grid.component';
import Footer from '../footer/footer.component';
const IndividualDoctor = () => {
    useLayoutEffect(() => {
        window.scrollTo(0, 0);
    });
    const {nickname} = useParams(); // Assuming "nickname" is the parameter in the URL
    const setNickName = useDoctorQueryStore((state) => state.setNickName);
    const {
        data,
        error,
        isLoading,
        isFetchingNextPage,
        fetchNextPage,
        hasNextPage
    } = useGetDoctorReviews(); // Destructure the reviews, error, and isLoading from the hook
    const [activeTab, setActiveTab] = useState(0);
    const tabs = ['About', 'Posts', 'Reviews'];
    const fetchedReviewsCount = data?.pages.reduce((acc, page) => acc + page.data.evaRespPage.records.length, 0) || 0;
    useEffect(() => {
        setNickName(nickname);
    }, [nickname]);

    if (isLoading) {
        return <HomeSpinner/>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    const selectTab = (index) => {
        setActiveTab(index);
    }
    return (
        <div className='individual-page-container'>
            <div className="individual-doctor-container">
                <div className="individual-doctor-left-container">
                    {
                        data.pages[0].data && 
                          <DoctorProfile
                            posts={data.pages[0].data.postNumber}
                            follower={data.pages[0].data.followers}
                            following={data.pages[0].data.followings}
                            doctorStars={data.pages[0].data.doctorStars}/>
                    }
                </div>
                <div className="individual-doctor-right-container">
                    <div className='individual-doctor-tabs'>
                        {
                            tabs.map((item, index) => (
                                <div
                                    className={`individual-doctor-tab ${activeTab === index ? 'active' : ''}`}
                                    onClick={() => selectTab(index)}>
                                    {item}
                                    <div className="individual-doctor-tab-underline"></div>
                                </div>
                            ))
                        }
                    </div>
                    <InfiniteScroll
                        dataLength={fetchedReviewsCount}
                        next={fetchNextPage}
                        hasMore={hasNextPage}
                        scrollThreshold={0.1}>
                        {activeTab === 0 && <DoctorAbout/>}
                        {
                            activeTab === 1 && <div className="individual-doctor-posts">
                                <DoctorPostGrid isAbout={true}/> 
                            </div>
                        }
                        {
                            activeTab === 2 && data?.pages.map((page, index) => (
                                        <React.Fragment key={index}>
                                            {
                                                page
                                                    .data
                                                    .evaRespPage
                                                    .records
                                                    .map((review, index) => (
                                                        <DoctorReview
                                                            key={index}
                                                            profileImage={review.img}
                                                            name={review.nickname}
                                                            starRate={review.score}
                                                            reviewText={review.text}
                                                            date={new Date(review.addTime * 1000).toLocaleDateString()}/>
                                                    ))
                                            }
                                        </React.Fragment>
                                    ))
                        }
                    </InfiniteScroll>

                </div>
            </div>
            <Footer/>
        </div>
        
    );
};

export default IndividualDoctor;