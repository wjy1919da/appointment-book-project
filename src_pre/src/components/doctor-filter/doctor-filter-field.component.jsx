import FilterIcon from '../../assets/doctor/doctor-filter-icon.png';

import './doctor-filter.styles.scss';

const DoctorFilterField = ({ text, field, setFieldFilterParam, setField, setPage, setPageFilterParam }) => {
    return (
        <div className="doctor-filter-container">
            <select className='form-select-sm doctor-filter' onChange={(e) => {setFieldFilterParam(e.target.value); setField(e.target.value); setPage(1); setPageFilterParam(1);}}>
                <option selected={field[0] === 'all'} value='all'>{text}</option>
                <option selected={field[0] === 'facial'} value='facial'>Facial</option>
                <option selected={field[0] === 'breast'} value='breast'>Breast</option>
                <option selected={field[0] === 'body'} value='body'>Body</option>
            </select>
            <img src={FilterIcon} className='doctor-filter-icon' alt='filter' />
        </div>
    )
}

export default DoctorFilterField;