import DoctorProfileSubArea from "./doctor-own-profile-subArea";
import DocotorOwnBasic from "./doctor-own-profile-Basic";

const DocotorOwnMain = () => {
  return (
    <div className="doctor-own-profile-main-conatiner">
      <DocotorOwnBasic />
      <DoctorProfileSubArea />
    </div>
  );
};

export default DocotorOwnMain;
