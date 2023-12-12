import { useNavigate } from 'react-router-dom';
import DoctorProfileSubArea from './doctor-own-profile-subArea';
import DocotorOwnBasic from './doctor-own-profile-Basic';
const DocotorOwnMain = () => {
    return (
        <div className='doctor-own-profile-main-conatiner container'>
            <DocotorOwnBasic/>
            <DoctorProfileSubArea/>
        </div>
    );
};

export default DocotorOwnMain;
