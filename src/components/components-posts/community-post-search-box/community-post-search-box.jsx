import React, { useState, useEffect, useRef } from 'react';
import usePostQueryStore from '../../../postStore.ts';
import { useNavigate } from 'react-router-dom';

// component
import PostSearchBoxDropDown from '../community-post-search-box-dropdown/community-post-search-box-dropdown';
import ProcedureSearchDropDown from '../../procedure-search-dropdown/procedure-search-dropdown.component';

// scss
import './community-post-search-box.scss';

// images
import SearchIcon from '../../../assets/post/search_icon.svg';
import useProcedureQueryStore from '../../../procedureStore';
const toUrlParam = (text) => {
  return text.toLowerCase().replace(/\s+/g, '_');
};

const toDisplayFormat = (param) => {
  return param.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
};
const PostSearchBox = ({ className, isProcedure }) => {
  // console.log('isProcedure', procedureQuery);

  // const closeContainer = (e) => {
  //   if (containerRef.current && !containerRef.current.contains(e.target)) {
  //     setIsSearchContainerVisible(false);
  //   }
  // };


  // const handleTagChange = (input) => {
  //   usePostQueryStore.getState().setTag(input);
  // };
  const navigate = useNavigate();
  const [isSearchContainerVisible, setIsSearchContainerVisible] = useState(false);
  const procedureQuery = useProcedureQueryStore((state) => state.procedureQuery);
  const setProcedureSearchParam = useProcedureQueryStore((state) => state.setProcedureSearchParam);
  const containerRef = useRef(null);
  
  const handleSearch = () => {
    let searchParam = toUrlParam(procedureQuery.procedureSearchParam);
    let historyParam = toDisplayFormat(procedureQuery.procedureSearchParam)
    if (!searchParam) {
      alert('Error: input can not be empty!');
    } else {
      const searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
      if (!searchHistory.includes(historyParam)) {
        searchHistory.push(historyParam);
        localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
      }
      navigate(`/procedure/${searchParam}`);
      setProcedureSearchParam("");
    }  
  }

  const handleShowContainer = () => {
     setIsSearchContainerVisible(!isSearchContainerVisible);
  };
  const handleInputChange = (e) => {
    setProcedureSearchParam(e.target.value);
    setIsSearchContainerVisible(true);
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsSearchContainerVisible(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [containerRef]);  

  return (
    <div
      className={`community-post-search-box-container ${className}`}
      ref={containerRef}
    >
      <input
        type='text'
        value={toDisplayFormat(procedureQuery.procedureSearchParam)}
        onChange={handleInputChange}
        onClick={handleShowContainer}
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
      <div className='search-dropdown-container'>
        {isSearchContainerVisible && isProcedure && <ProcedureSearchDropDown />}
      </div>
      {/* {isSearchContainerVisible && !isProcedure && <PostSearchBoxDropDown />} */}
    </div>
  );
};

export default PostSearchBox;
