import React, { useState, useEffect, useRef } from "react";
// import usePostQueryStore from '../../../postStore.ts';
// import useProcedureQueryStore from '../../../procedureStore';
// import { useNavigate } from 'react-router-dom';

// component
// import PostSearchBoxDropDown from '../community-post-search-box-dropdown/community-post-search-box-dropdown';
// import ProcedureSearchDropDown from '../../procedure-search-dropdown/procedure-search-dropdown.component';

// scss
import "./community-post-search-box.scss";

// images
import SearchIcon from "../../../assets/post/search_icon.svg";
import { useMediaQuery } from 'react-responsive';

const PostSearchBox = (
  
  {
  
  value,
  isScreen375,
  handleSearch,
  isMobile,
  handleResponsiveButtonClick,
  isInputVisible,
  ...otherProps
}) => {
  const below1133 = useMediaQuery({ query: `(max-width: 1133px)` });
  return (
    <div className="community-post-search-box-container">
      {below1133 && !isInputVisible && (
        <button
          type="button"
          className="mobile-search-button"
          // style={{
          //   display: "flex",
          //   border: "1px solid #675D59",
          //   borderRadius: "8px",
          //   padding: "7px",
          //   position: isScreen375 ? "absolute" : "static",
          //   width: isScreen375 ? "40px" : "88px",
          //   height: isScreen375? "auto" : "54px",
          //   top: isScreen375 ? "-520px" : "auto", 
          //   right: isScreen375 ? "-15px" : "15px",
          // }}
          onClick={handleResponsiveButtonClick}
        >
          <img
            src={SearchIcon}
            alt="Image-Search-Icon"
            className="community-post-search-box-icon"
            style={{ display: "block", margin: "0 auto" }}
          />
        </button>
      )}
      {(isInputVisible || !below1133) && (
        <div className="search-input-container">
          <input
            type="text"
            value={value}
            {...otherProps}
            className="community-post-search-box-input"
          />
          <button type="button" onClick={handleSearch}>
            <img
              src={SearchIcon}
              alt="Image-Search-Icon"
              className="community-post-search-box-icon"
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
