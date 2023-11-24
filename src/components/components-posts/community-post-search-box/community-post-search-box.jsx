import React from 'react';
import useProcedureQueryStore from '../../../procedureStore';

// scss
import './community-post-search-box.scss';

// images
import SearchIcon from '../../../assets/post/search_icon.svg';

const toUrlParam = (text) => {
  return text.toLowerCase().replace(/\s+/g, '_');
};

const PostSearchBox = ({
  className,
  handleSearch,
  value,
  onChange,
  onClick,
}) => {
  return (
    <div className={`community-post-search-box-container ${className}`}>
      <input
        type='text'
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onClick={onClick}
        className='community-post-search-box-input'
      />
      <button type='button'>
        <img
          src={SearchIcon}
          alt='Image-Search-Icon'
          className='community-post-search-box-icon'
          onClick={handleSearch}
        />
      </button>
    </div>
  );
};

export default PostSearchBox;
