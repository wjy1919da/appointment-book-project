import { useNavigate } from "react-router-dom";
import DocotorOwnVoucher from "./doctor-own-voucher";
import DocotorOwnSpecialization from "./doctor-own-specialization";
import DocotorOwnHightLight from "./doctor-HighLight-case-card";
import DocotorOwnReview from "./doctor-own-profile-reviews";
import "./doctor-own-profile-about.scss";

const DocotorOwnAbout = () => {
  return (
    <div className="doctor-own-profile-about-container">
      {/* <DocotorOwnVoucher/> */}
      <DocotorOwnSpecialization />

      <DocotorOwnHightLight />
      {/* <DocotorOwnReview/> */}
    </div>
  );
};

export default DocotorOwnAbout;
