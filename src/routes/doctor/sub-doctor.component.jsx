import { useParams } from 'react-router-dom';
import DoctorDetail from '../../components/doctor-detail/doctor-detail.component';

import './sub-doctor.styles.scss';
import { useState } from 'react';
import { useEffect } from 'react';
import DoctorAboutSection from '../../components/doctor-about-section/doctor-about-section.component';

const SubDoctor = () => {
    const { doctorId } = useParams();
    const [doctor, setDoctor] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchDoctor();
        // window.scrollTo(0, 0);
        // eslint-disable-next-line
    }, []);

    async function fetchDoctor() {
        // const apiData = await API.graphql({ query: getDoctor, variables: { id: doctorId } });
        // const doctorFromAPI  = apiData.data.getDoctor;
        // setDoctor(doctorFromAPI);
        // setIsLoading(false);
    }

    const doctorName = doctor.firstName + ' ' + doctor.lastName;


    const abouts = [
        {'title': 'Coupons',
         'items': [
            {'pic': '',
             'name': 'coupon1'},
            {'pic': '',
             'name': 'coupon2'}
         ]},
         {'title': 'Highlights',
         'items': [
            {'pic': '',
             'name': 'highlight1'},
            {'pic': '',
             'name': 'highlight2'},
            {'pic': '',
             'name': 'highlight3'},
            {'pic': '',
             'name': 'highlight4'}
         ]},
         {'title': 'Specializations',
         'items': [
            {'pic': '',
             'name': 's1'},
            {'pic': '',
             'name': 's2'},
            {'pic': '',
             'name': 's3'},
         ]},
         {'title': 'Consult',
         'items': [
            {'pic': '',
             'name': 'c1'},
            {'pic': '',
             'name': 'c2'}
         ]},
    ]

    return (
        <div className='sub-doctor-container'>
            <DoctorAboutSection title={abouts[0].title} items={abouts[0].items}></DoctorAboutSection>
            <DoctorAboutSection title={abouts[1].title} items={abouts[1].items}></DoctorAboutSection>
            <DoctorAboutSection title={abouts[2].title} items={abouts[2].items}></DoctorAboutSection>
            <DoctorAboutSection title={abouts[3].title} items={abouts[3].items}></DoctorAboutSection>
            {/* {isLoading ? 
            <div className="spinner-container">
                <div className="d-flex justify-content-center">
                    <div className="spinner-grow" role="status">
                    </div>
                </div>
                <div className="spinner-text">
                    Loading...
                </div>
            </div> :
            <div> 
                <img src={doctor.bkgdPic} className='sub-doctor-pic animate__animated animate__slideInUp' alt={doctorName}/>
                <div className='sub-doctor-title animate__animated animate__slideInUp'>
                    <h1 className='sub-doctor-name'>{doctorName}</h1>
                    <p className='sub-doctor-label'>{`Excellent ${doctor.field} plastic surgeon`}</p>
                    <p className='sub-doctor-intro'>{doctor.info}</p>
                </div>
                <div className='sub-doctor-detail-container'>
                    <DoctorDetail doctorImg={doctor.profilePic} doctorName={doctorName} doctorIntro={doctor.intro} />
                </div> 
                 />
            </div> } */}
        </div>
    )
}

export default SubDoctor;