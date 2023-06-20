import './doctor-search-button.styles.scss'
import SearchIcon from '../../assets/doctor/doctor-search-button-icon.png';
const DoctorSearchButton = ({title,handleOnClick}) => {
    return <button className='doctor-search-button' onClick = {handleOnClick}>
        <img src={SearchIcon} className='doctor-search-icon' />
         {title}
    </button>;
};
export default DoctorSearchButton;