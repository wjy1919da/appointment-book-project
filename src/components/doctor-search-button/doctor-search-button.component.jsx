import './doctor-search-button.styles.scss'
import SearchIcon from '../../assets/doctor/doctor-search-button-icon.png';
const DoctorSearchButton = ({title, onClick}) => {
    const handleClick = () => {onClick()};
    return (
        <div className='doctor-search-button-container'>
            <button className='doctor-search-button' onClick={handleClick}>
                <img src={SearchIcon} alt="Search" className='doctor-search-icon' />
                {title}
            </button>
        </div>
    )
};
export default DoctorSearchButton;