import DoctorProfileSubArea from './doctor-own-profile-subArea';
import DocotorOwnBasic from './doctor-own-profile-Basic';
// import DoctorProfileGrid from './doctor-own-profile-grid';

const DocotorOwnMain = () => {
  return (
    <div className='home-container'>
      <div className='section container'>
        <DocotorOwnBasic />
      </div>
      <div className='section-container'>
        <DoctorProfileSubArea />
      </div>
    </div>
  );
};

export default DocotorOwnMain;
