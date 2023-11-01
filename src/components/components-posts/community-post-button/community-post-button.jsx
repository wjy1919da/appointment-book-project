import React from 'react';

// scss
import './community-post-button.scss';

const FormButton = ({ buttonName, onClick }) => {
  return (
    <div>
      <button type='submit' class='create-post-button' onClick={onClick}>
        {buttonName}
      </button>
    </div>
  );
};

export default FormButton;
