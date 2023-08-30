import React, {useEffect, useLayoutEffect, useState} from 'react';
import "./individual-doctor.styles.scss";
import Hashids from 'hashids';
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
import {useGetDoctorInfo} from '../../hooks/useGetIndividualDoctor.js';
import DoctorReviewGrid from '../component-individual-doctor/doctor-review-grid/doctor-review-grid.component';
//import { useGetDoctorInfo } from '../../hooks/useGetIndividualDoctor';
import Footer from '../footer/footer.component';
const IndividualDoctor = () => {
    useLayoutEffect(() => {
        window.scrollTo(0, 0);
    });
    const {encodedMemberId} = useParams(); 
    const doctorQuery = useDoctorQueryStore((state) => state.doctorQuery);
    const setMemberId = useDoctorQueryStore((state) => state.setMemberId);
    const setNickName = useDoctorQueryStore((state) => state.setNickName);
    const {data,error,isLoading,} = useGetDoctorInfo();
    const {nickname} = data?.nickname || {};
    const [activeTab, setActiveTab] = useState(0);
    const tabs = ['About', 'Posts', 'Reviews'];
    useEffect(() => {
        setMemberId(encodedMemberId);
        if (data) {
           setNickName(data.nickname);
        }
     }, [encodedMemberId, data]);     
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
                {/* Evaluation hook */}
                <div className="individual-doctor-left-container">
                    {
                        data && 
                          <DoctorProfile
                            nickname={data.nickname}
                            projects={data.name}
                            mechName={data.mechName}
                            address = {data.address}
                        />
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
                    {activeTab === 0 && <DoctorAbout/>}
                    {activeTab === 1 && <div className="individual-doctor-posts">
                            <DoctorPostGrid isAbout={true}/> 
                    </div>}
                    {activeTab === 2 && < DoctorReviewGrid/>}
                </div>
            </div>
            <Footer/>
        </div>
        
    );
};

export default IndividualDoctor;