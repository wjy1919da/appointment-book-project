import React, { useState, useEffect, useRef } from 'react';
// import usePostQueryStore from '../../../postStore.ts';
// import useProcedureQueryStore from '../../../procedureStore';
// import { useNavigate } from 'react-router-dom';

// component
// import PostSearchBoxDropDown from '../community-post-search-box-dropdown/community-post-search-box-dropdown';
// import ProcedureSearchDropDown from '../../procedure-search-dropdown/procedure-search-dropdown.component';

// scss
import './community-post-search-box.scss';

// images
import SearchIcon from '../../../assets/post/search_icon.svg';

const toUrlParam = (text) => {
  if (text === '') return '';
  else return text.replace(/_/g, ' ');
};

const PostSearchBox = ({ value, handleSearch, isMobile, ...otherProps }) => {
  const [isInputVisible, setIsInputVisible] = useState(false);

  // small screens search icon button
  const handleResponsiveButtonClick = () => {
    setIsInputVisible(!isInputVisible);
  };

  return (
    <div className={`community-post-search-box-container ${isInputVisible ? 'active' : ''}`}>
      {isMobile && !isInputVisible && (
        <button
          type='button'
          className='mobile-search-button'
          style={{
            textAlign: 'center',
            border: '1px solid #675D59',
            borderRadius: '8px',
            padding: '7px',
            width: '60px',
          }}
          onClick={handleResponsiveButtonClick}
        >
          <img
            src={SearchIcon}
            alt='Image-Search-Icon'
            className='community-post-search-box-icon'
            style={{ display: 'block', margin: '0 auto' }}
          />
        </button>
      )}
      {(isInputVisible || !isMobile) && (
        <div className='search-input-container'>
          <input
            type='text'
            value={value}
            {...otherProps}
            className='community-post-search-box-input'
          />
          <button type='button' onClick={handleSearch}>
            <img
              src={SearchIcon}
              alt='Image-Search-Icon'
              className='community-post-search-box-icon'
            />
          </button>
        </div>
      )}
    </div>
  );
};

export default PostSearchBox;

// const PostSearchBox = ({ value = '', handleSearch, ...otherProps }) => {
//   return (
//     <div className='community-post-search-box-container'>
//       <input
//         type='text'
//         value={value}
//         {...otherProps}
//         className='community-post-search-box-input'
//       />
//       <button type='button'>
//         <img
//           src={SearchIcon}
//           alt='Image-Search-Icon'
//           className='community-post-search-box-icon'
//           onClick={handleSearch}
//         />
//       </button>
//     </div>
//   );
// };

// export default PostSearchBox;
