import React from 'react';

// scss
import './community-post-button.scss';

const FormButton = ({ handlePostCreation }) => {
  return (
    <div>
      <button class='create-post-button' onClick={handlePostCreation}>
        Post
      </button>
    </div>
  );
};

export default FormButton;
