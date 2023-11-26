import './doctor-review-grid.styles.scss';
import React from 'react';
import { useGetDoctorReviews } from '../../../hooks/useGetIndividualDoctor';
import useDoctorQueryStore from '../../../store.ts';
import DoctorReview from '../doctor-review-card/doctor-review-card';
import InfiniteScroll from 'react-infinite-scroll-component';
const DoctorReviewGrid = () => {
    const doctorQuery = useDoctorQueryStore((state) => state.doctorQuery);
    //console.log('review queryStore: ', doctorQuery);
    const {
        data,
        error,
        isLoading,
        isFetchingNextPage,
        fetchNextPage,
        hasNextPage
    } = useGetDoctorReviews();
    //console.log('review data: ', data);
    const fetchedReviewsCount = data?.pages.reduce((acc, page) => acc + page?.data?.data?.evaRespPage?.records.length, 0) || 0;
    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error loading data</div>;
    }
    console.log('fetchedReviewsCount is: ', fetchedReviewsCount);
    if (fetchedReviewsCount === 0) {
        return (
            <div className='no-reviews-container'>
                <h2 className='no-reviews-text'>No reviews yet, be the first to review them!</h2>
            </div>
        )
    }
    return (
        <div>
            <InfiniteScroll
                dataLength={data?.pages.length || 0}
                next={fetchNextPage}
                hasMore={hasNextPage}
                scrollThreshold={0.1}>
                {
                    data?.pages.map((page, index) => (
                        <React.Fragment key={index}>
                            {
                                page
                                    .data
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
    );
}

export default DoctorReviewGrid;