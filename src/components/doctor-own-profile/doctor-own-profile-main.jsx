import { useNavigate } from 'react-router-dom';
import DoctorProfileSubArea from './doctor-own-profile-subArea';
import DocotorOwnBasic from './doctor-own-profile-Basic';
import DoctorProfileGrid from './doctor-profile-edit/doctor-own-profile-grid';

const DocotorOwnMain = () => {
  return (
    <div className='doctor-own-profile-main-conatiner container'>
      <DocotorOwnBasic />
      <DoctorProfileSubArea />
      <DoctorProfileGrid />
    </div>
  );
};

export default DocotorOwnMain;
