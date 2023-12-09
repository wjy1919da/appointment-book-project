import React from "react";

// scss
import "./community-post-button.scss";

const FormButton = ({ buttonName, onClick, type }) => {
  return (
    <button type="submit" class="create-post-button" onClick={onClick}>
      {buttonName}
    </button>
  );
};

export default FormButton;
