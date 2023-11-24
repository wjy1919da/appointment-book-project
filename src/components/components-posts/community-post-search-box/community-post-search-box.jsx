import React, { useState, useEffect, useRef } from 'react';
import usePostQueryStore from '../../../postStore.ts';
import { useNavigate, useLocation } from 'react-router-dom';

// component
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
  if (typeof param !== 'string') {
    return param;
  }
  return param.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());
};

// const toDisplayFormat = (param) => {
//   return param.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());
// };

const PostSearchBox = ({ className }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const isProcedure = useLocation().pathname.includes('/procedure');
  const isPost = useLocation().pathname.includes('/post');

  const [isSearchContainerVisible, setIsSearchContainerVisible] =
    useState(false);
  const procedureQuery = useProcedureQueryStore(
    (state) => state.procedureQuery
  );
  const postQuery = usePostQueryStore((state) => state.postQuery);

  const setProcedureSearchParam = useProcedureQueryStore(
    (state) => state.setProcedureSearchParam
  );
  const setPostSearchParam = usePostQueryStore(
    (state) => state.setPostSearchParam
  );
  const setTempSearchParam = usePostQueryStore(
    (state) => state.setTempSearchParam
  );

  const containerRef = useRef(null);

  const handleShowContainer = () => {
    setIsSearchContainerVisible(!isSearchContainerVisible);
  };

  const handleInputChange = (e) => {
    if (isProcedure) {
      setProcedureSearchParam(e.target.value);
    } else {
      setTempSearchParam(e.target.value);
    }
    setIsSearchContainerVisible(true);
  };

  const handleSearch = () => {
    const searchParam = toUrlParam(
      isProcedure
        ? procedureQuery.procedureSearchParam
        : postQuery.postSearchParam
    );

    if (!searchParam) {
      alert('Error: input can not be empty!');
    } else {
      const searchHistory =
        JSON.parse(localStorage.getItem('searchHistory')) || [];
      if (!searchHistory.includes(searchParam)) {
        searchHistory.push(searchParam);
        localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
      }

      const basePath = isProcedure ? '/procedure' : '/post';
      navigate(`${basePath}/${searchParam}`);

      if (isProcedure) {
        setProcedureSearchParam('');
      } else {
        setTempSearchParam('');
      }
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setIsSearchContainerVisible(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [containerRef]);

  return (
    <div
      className={`community-post-search-box-container ${className}`}
      ref={containerRef}
    >
      <input
        type='text'
        value={toDisplayFormat(
          isProcedure
            ? procedureQuery.procedureSearchParam
            : postQuery.postTempParam
        )}
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
        {isSearchContainerVisible && (isProcedure || isPost) && (
          <ProcedureSearchDropDown isProcedure={isProcedure} />
        )}
      </div>
    </div>
  );
};

export default PostSearchBox;
