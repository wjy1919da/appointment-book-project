import "./doctor-own-profile-Basic.styles.scss";
import React from "react";
import { Link } from "react-router-dom";
const DoctorOwnProfileEditButton = ({ onClick, title }) => {
  return (
    <div className="top-edit-button-1" onClick={onClick}>
      {title}
    </div>
  );
};

export default DoctorOwnProfileEditButton;
