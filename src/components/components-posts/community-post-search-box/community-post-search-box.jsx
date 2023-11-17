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

const PostSearchBox = ({ className, isProcedure }) => {
  const [input, setInput] = useState('');
  //const [showContainer, setShowContainer] = useState(false);
  const navigate = useNavigate();
  const [isSearchContainerVisible, setIsSearchContainerVisible] = useState(false);
  const procedureQuery = useProcedureQueryStore((state) => state.procedureQuery);

  const containerRef = useRef(null);
  // console.log('isProcedure', procedureQuery);

  // const closeContainer = (e) => {
  //   if (containerRef.current && !containerRef.current.contains(e.target)) {
  //     setIsSearchContainerVisible(false);
  //   }
  // };

  // useEffect(() => {
  //   document.addEventListener('click', closeContainer);

  //   return () => {
  //     document.removeEventListener('click', closeContainer);
  //   };
  // }, []);

  // const handleTagChange = (input) => {
  //   usePostQueryStore.getState().setTag(input);
  // };

  // const handleChangeInput = (e) => {
  //   const newInput = e.target.value;
  //   setInput(newInput);
  //   handleTagChange(newInput);
  // };

  // const handleChangeInput = (e) => {
  //   usePostQueryStore.getState().setTag(input);
  //   // setTag(e.target.value);
  // };
  const handleOnClick = () => {
      if (!procedureQuery.procedureSearchParam) {
          alert('Error: input can not be empty!');
      } else {
          //setInternalProcedure(internalProcedure.replace(/ /g, '_'));
          //let cleanProcedure = internalProcedure.replace(/ /g, '_');
          navigate(`/procedure/${procedureQuery.procedureSearchParam}`);
          // onHide();// Close the modal
      }  
  }

  const handleShowContainer = () => {
     setIsSearchContainerVisible(!isSearchContainerVisible);
  };

  return (
    <div
      className={`community-post-search-box-container ${className}`}
      ref={containerRef}
    >
      <input
        type='text'
        value={procedureQuery.procedureSearchParam}
        // onChange={handleChangeInput}
        onClick = {handleShowContainer}
        className='community-post-search-box-input'
      />
      <button type='button'>
        <img
          src={SearchIcon}
          alt='Image-Search-Icon'
          className='community-post-search-box-icon'
          onClick={handleShowContainer}
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
