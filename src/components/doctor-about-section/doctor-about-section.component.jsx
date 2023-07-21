import './doctor-about-section.styles.scss';

import consultVideo from '../../assets/doctor/consult-video.png';
import consultPhone from '../../assets/doctor/consult-phone.png';
import consultInfo from '../../assets/doctor/consult-info.png';
import consultOffline from '../../assets/doctor/consult-offline.png';

const DoctorAboutSection = ({title, items}) => {
    var itemsGrid = items?.map((item) => 
        <div className='about-item-grid' key={item.title}>
            <img className='about-item-pic' src={item.content}></img>
            <p className='about-item-name'>{item.title}</p>
        </div>
    );

    if (title === 'Consult') {
        itemsGrid = items?.map((item) => 
            {
                var pic = consultVideo;
                var name = 'Video consultation';
                if (item.title == 2) {
                    pic = consultPhone;
                    name = 'Telephone consultation';
                } else if (item.title == 3) {
                    pic = consultInfo;
                    name = 'Information consultation';
                } else if (item.title == 4) {
                    pic = consultOffline;
                    name = 'Offline consultation';
                }
                return (
                    <div className='about-item-grid' key={item.title}>
                        <img className='about-item-pic' src={pic}></img>
                        <p className='about-item-name'>{name}</p>
                    </div>
                )
            }
        );
    }

    return (
        <div className='about-container'>
            <p className='about-title'>{title}</p>
            <div className='about-items'>
                {itemsGrid}
            </div>
        </div>   
    )
}

export default DoctorAboutSection;