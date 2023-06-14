import './doctor-search-button.styles.scss'
import SearchIcon from '../../assets/doctor/doctor-search-button-icon.png';
const DoctorSearchButton = ({title}) => {
    return <button className='doctor-search-button'>
        <img src={SearchIcon} className='doctor-search-icon' />
        {title}
    </button>;
};
export default DoctorSearchButton;