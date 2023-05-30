import { useParams } from 'react-router-dom';
import DoctorDetail from '../../components/doctor-detail/doctor-detail.component';
import Footer from '../../components/footer/footer.component';
import { API } from 'aws-amplify';
import { getDoctor } from '../../graphql/queries';

import './sub-doctor.styles.scss';
import { useState } from 'react';
import { useEffect } from 'react';

const SubDoctor = () => {
    const { doctorId } = useParams();
    const [doctor, setDoctor] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchDoctor();
        window.scrollTo(0, 0);
        // eslint-disable-next-line
    }, []);

    async function fetchDoctor() {
        const apiData = await API.graphql({ query: getDoctor, variables: { id: doctorId } });
        const doctorFromAPI  = apiData.data.getDoctor;
        setDoctor(doctorFromAPI);
        setIsLoading(false);
    }

    const doctorName = doctor.firstName + ' ' + doctor.lastName;

    return (
        <div className='sub-doctor-container'>
            {isLoading ? 
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
                <Footer />
            </div> }
        </div>
    )
}

export default SubDoctor;