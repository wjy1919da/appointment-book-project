import React from 'react';

// scss
import './community-post-button.scss';

const FormButton = ({ buttonName }) => {
  return (
    <div>
      <button type='submit' class='create-post-button'>
        {buttonName}
      </button>
    </div>
  );
};

export default FormButton;
