import FilterIcon from '../../assets/doctor/doctor-filter-icon.png';

import './doctor-filter.styles.scss';

const DoctorFilterLocation = ({ text, location, setLocationFilterParam, setLocation, setPage, setPageFilterParam }) => {
    return (
        <div className="doctor-filter-container doctor-filter-location-container">
            <select className='form-select-sm doctor-filter' onChange={(e) => {setLocationFilterParam(e.target.value); setLocation(e.target.value); setPage(1); setPageFilterParam(1);}}>
                <option selected={location[0] === 'all'} value='all'>{text}</option>
                <option selected={location[0] === 'los angeles'} value='los angeles'>Los Angeles</option>
                <option selected={location[0] === 'new york'} value='new york'>New York</option>
            </select>
            <img src={FilterIcon} className='doctor-filter-icon' alt='filter'/>
        </div>
    )
}

export default DoctorFilterLocation;