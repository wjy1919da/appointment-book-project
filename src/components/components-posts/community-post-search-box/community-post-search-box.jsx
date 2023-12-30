import React, { useState, useEffect, useRef } from "react";
import usePostQueryStore from "../../../postStore.ts";
import { useNavigate } from "react-router-dom";

// component
import PostSearchBoxDropDown from "../community-post-search-box-dropdown/community-post-search-box-dropdown";
import ProcedureSearchDropDown from "../../procedure-search-dropdown/procedure-search-dropdown.component";

// scss
import "./community-post-search-box.scss";

// images
import SearchIcon from "../../../assets/post/search_icon.svg";
import useProcedureQueryStore from "../../../procedureStore";

const PostSearchBox = ({ value = "", handleSearch, ...otherProps }) => {
  return (
    <div className="community-post-search-box-container">
      <input
        type="text"
        value={value}
        {...otherProps}
        className="community-post-search-box-input"
      />
      <button type="button">
        <img
          src={SearchIcon}
          alt="Image-Search-Icon"
          className="community-post-search-box-icon"
          onClick={handleSearch}
        />
      </button>
    </div>
  );
};

export default PostSearchBox;
