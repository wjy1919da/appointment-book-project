import DoctorProfileSubArea from "./doctor-own-profile-subArea";
import DocotorOwnBasic from "./doctor-own-profile-Basic";
import DoctorProfileGrid from "./doctor-own-profile-grid";

const DocotorOwnMain = () => {
  return (
    <div className="doctor-own-profile-main-conatiner container">
      <DocotorOwnBasic />
      <DoctorProfileSubArea />
    </div>
  );
};

export default DocotorOwnMain;
