import React from 'react';

// scss
import './community-post-button.scss';

const FormButton = ({ buttonName, handlePostCreation }) => {
  return (
    <div>
      <button class='create-post-button' onClick={handlePostCreation}>
        {buttonName}
      </button>
    </div>
  );
};

export default FormButton;
