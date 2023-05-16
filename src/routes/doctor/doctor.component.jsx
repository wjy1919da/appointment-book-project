import './doctor.styles.scss'
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import HomeButton from '../../components/home-button/home-button.component';
const Doctor = () => {
    const [doctorOrTreatment, setDoctorOrTreatment] = useState('');
    const [city, setCity] = useState('');
    const navigate = useNavigate();
    const handleSearch = async () => {
        try {
          const response = await axios.get('http://your-backend-url.com/api/search', {
            params: {
              doctorOrTreatment,
              city
            }
          });    
          switch (response.data.status) {
            case 'not_logged_in':
              // case 1: user does not login, return to login page
              navigate('/sign-in');
              break;
            case 'invalid_input':
              // case 2: doctorOrTreatment is empty, return invalid input
              alert('Invalid input!');
              break;
            case 'city_empty':
              // case 3: city is empty, return city cannot be empty
              alert('City cannot be empty!');
              break;
            case 'no_result':
              // case 4: doctorOrTreatment is not empty, city is not empty, can not find any doctor or treatment, return no search result
              alert('No search result!');
              break;
            case 'result':
              // case 5: doctorOrTreatment is not empty, city is not empty, find doctor or treatment, return search result
              console.log('Search result:', response.data.result);
              break;
            case 'error':
              // case 6: server return 404 error
              console.error('Server error:', response.data.error);
              break;
            default:
              console.error('Unexpected status:', response.data.status);
          }
        } catch (error) {
          console.error('Error during search:', error);
        }
      };
    return (
       <div>
             <input
                type="text"
                placeholder="search treatment,doctor"
                value={doctorOrTreatment}
                onChange={(e) => setDoctorOrTreatment(e.target.value)}
            />
            <input
                type="text"
                placeholder="City"
                value={city}
                onChange={(e) => setCity(e.target.value)}
            />
            <HomeButton title="search" onClick={handleSearch} />
       </div> 
        
        
    );

};
export default Doctor;