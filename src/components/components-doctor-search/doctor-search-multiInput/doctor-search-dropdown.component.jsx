import {useSearchLocation} from '../../../hooks/useSearchDoctors.js';
import useDoctorQueryStore from '../../../store.ts';
import {Text} from '@chakra-ui/react';
import mapImg from '../../../assets/doctor/map.png';
import './doctor-search-multiInput.styles.scss'
const DoctorSearchDropDown = () => {
  const {error,data,isLoading} = useSearchLocation();
  const setLocation  = useDoctorQueryStore(state => state.setLocation);
  if (error) return <Text>{error.message}</Text>;
  if (!data || !data.result) return null;
  const groupedData = [];
  const handleClick = (item) => {
     setLocation(item);
  }
  // group data into groups of 3, because we want to display 3 items per row
  for (let i = 0; i < data.result.length; i += 3) { 
    groupedData.push(data.result.slice(i, i + 3));
  }
  return (
    <div className='doctor-search-drop-down-container'> 
        <div className = 'doctor-search-drop-down-frame'>
            {groupedData.map((group, index) => (
                <div key={index} className='doctor-search-drop-down-row-container'>
                    {group.map(item => (
                        <div key={item.id}> 
                            <button  
                                className='doctor-search-drop-down-item'
                                onClick={() => handleClick(item)}
                            >
                                <span>{item}</span>
                            </button>
                        </div>
                    ))}
                </div>
            ))}
        </div>
        <div className='doctor-search-drop-down-map-container'>
            <img src={mapImg} alt="map" className='doctor-search-drop-down-map-pic' />  
        </div>
    </div>
  );
}

export default DoctorSearchDropDown;