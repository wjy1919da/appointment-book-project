import { useEffect, useState } from "react";
import './create-appointment.scss';

// import DoctorAppointmentPage1 from "../../components/doctor-appointment/doctor-appointment-page-1";
// import DoctorAppointmentPage2 from "../../components/doctor-appointment/doctor-appointment-page-2";
import AppEditDetail from "../../components/user-appointment/app-edit-detail";
import AppDetailDescription from "../../components/user-appointment/appointment-detail-description";
import AppConsultationType from "../../components/user-appointment/app-choose-consultation-type";
import AppStripePage from "./appointment-stripe-page";

import Button from '../../components/components-posts/community-post-button/community-post-button';
import Arrow from '../../assets/post/iconoir_arrow-right.svg';

const CreateAppointment = () => {
    const [page, setPage] = useState(1);
    const pages = [<AppDetailDescription isNewApp={true} />, <AppEditDetail isNewApp={true} />, <AppConsultationType />, <AppStripePage />];
    const maxPages = pages.length;
    const handleNextButton = () => {
        // console.log('going next!');
        if (page !== maxPages) setPage(page + 1);
        console.log(page + 1);
    }
    const handlePrevButton = () => {
        // console.log('going prev!');
        if (page !== 1) setPage(page - 1);
        console.log(page - 1);
    }
    return (
        <div className="create-appointment-container" >
            <div className="create-appointment-title-container">
                <h1 className="create-appointment-title">Appointment</h1>
            </div>
            <div className="create-appointment-appointment-info-container">
                <div className="create-appointment-page-container">
                    {pages[page-1]}
                </div>
                <NavigationBar goBack={handlePrevButton} goForward={handleNextButton} maxPages={maxPages} currPage={page} />
            </div>
            
        </div>
    )
}

const NavigationBar = ({goBack, goForward, maxPages, currPage}) => {
    const radioButtons = [];
    for (let i = 1; i <= maxPages; i++) {
        if (i <= currPage) radioButtons.push(<div className="create-appointment-filled-radio-button"></div>);
        else radioButtons.push(<div className="create-appointment-unfilled-radio-button"></div>);
    }
    return (
        <div className="create-appointment-navigation-bar">
        <Button
            buttonName='Back'
            icon={Arrow}
            rotateIcon={true}
            className={`create-appointment-back-button ${currPage === 1 && 'create-appointment-disabled-button'}`}
            onClick={goBack}
        />
        <div className="create-appointment-radio-navigation-buttons">
            {radioButtons.map((item, index) => {
                return (<div key={index} className="create-appointment-radio-button-container">{item}</div>);
            })}
        </div>
        <Button
            buttonName='Next'
            icon={Arrow}
            // rotateIcon={true}
            className={`create-appointment-next-button ${currPage === maxPages && 'create-appointment-disabled-button'}`}
            onClick={goForward}
        />
    </div>
    )
}

export default CreateAppointment;