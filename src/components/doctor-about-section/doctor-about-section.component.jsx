import './doctor-about-section.styles.scss';
import holder from '../../assets/doctor/iconoir_verified-user.png'

const DoctorAboutSection = ({title, items}) => {
    const itemsGrid = items.map((item) => 
        <div className='about-item-grid' key={item.name}>
            <img className='about-item-pic' src={holder}></img>
            <p className='about-item-name'>{item.name}</p>
        </div>
    );

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