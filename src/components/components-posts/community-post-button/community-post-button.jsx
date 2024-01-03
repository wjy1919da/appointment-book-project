import React from 'react';

// scss
import './community-post-button.scss';

const FormButton = ({ buttonName, onClick, className }) => {
  return (
    <button
      type='submit'
      className={`create-post-button ${className}`}
      onClick={onClick}
    >
      {buttonName}
    </button>
  );
};

export default FormButton;
