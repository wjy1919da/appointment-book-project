import DoctorProfileSubArea from "./doctor-own-profile-subArea";
import DocotorOwnBasic from "./doctor-own-profile-Basic";

const DocotorOwnMain = () => {
  return (
    <div className='home-container'>
      <div className='section container'>
        <DocotorOwnBasic />
      </div>
      <div className='section container'>
        <DoctorProfileSubArea />
      </div>
    </div>
  );
};

export default DocotorOwnMain;
