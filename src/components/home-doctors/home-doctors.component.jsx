import { useEffect, useState } from 'react';
import { API } from 'aws-amplify';
import { listDoctors } from '../../graphql/queries';
import HomeDoctorsCard from './home-doctors-card/home-doctors-card.component';
import './home-doctors.styles.scss';

const HomeDoctors = () => {
    const [doctors, setDoctors] = useState([]);
    const [renderCards, setRenderCards] = useState(false);

    useEffect(() => {
        fetchDoctors();
        // eslint-disable-next-line
    }, []);

    async function fetchDoctors() {
        const apiData = await API.graphql({ query: listDoctors });
        const doctorsFromAPI = apiData.data.listDoctors.items;
        setDoctors(doctorsFromAPI.slice(0, 5));
        setRenderCards(true);
    }

    const doctorsCarouselActive = 
        <div className="carousel-item active">
            {renderCards && <HomeDoctorsCard doctor={doctors[0]} />}
        </div>;
    const doctorsCarousel = doctors.slice(1, 5).map((doctor) => 
        <div className="carousel-item" key={doctor.id}>
            {renderCards && <HomeDoctorsCard doctor={doctor} />}
        </div>
    );

    return (
        <div className='home-doctors-container'>
            <h2 className='home-title'>
                FEATURED DOCTORS
            </h2>
            <hr className='home-divider'/>
            <div id="carouselIndicators" className="carousel slide" data-bs-ride="true">
                <div className="carousel-indicators">
                    <button type="button" className='indicator active' data-bs-target="#carouselIndicators" data-bs-slide-to="0" aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" className='indicator' data-bs-target="#carouselIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                    <button type="button" className='indicator' data-bs-target="#carouselIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                    <button type="button" className='indicator' data-bs-target="#carouselIndicators" data-bs-slide-to="3" aria-label="Slide 2"></button>
                    <button type="button" className='indicator' data-bs-target="#carouselIndicators" data-bs-slide-to="4" aria-label="Slide 3"></button>
                </div>
                <div className="carousel-inner">
                    {doctorsCarouselActive}
                    {doctorsCarousel}
                </div>
            </div>
        </div>
    )
}

export default HomeDoctors;