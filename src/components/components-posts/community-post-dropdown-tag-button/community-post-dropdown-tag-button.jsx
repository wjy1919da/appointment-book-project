import React from 'react';

const PostDropDownTagButton = ({ buttonTagName, className, onClick }) => {
  return (
    <div>
      <button type='button' onClick={onClick} className={className}>
        {buttonTagName}
      </button>
    </div>
  );
};

export default PostDropDownTagButton;
