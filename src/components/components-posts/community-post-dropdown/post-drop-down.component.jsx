import React, { useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import { Dropdown } from 'react-bootstrap';

// components
import PostDropDownContents from '../../components-posts/community-post-dropdown-contents/community-post-dropdown-contents';

// scss
import './post-drop-down.styles.scss';

const PostDropdown = (props) => {
  const isMobile = useMediaQuery({ query: `(max-width: 767px)` });

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleWindowResize);
    // cleanup function to remove event listener when component unmounts
    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  const dropdownContainerWidth = (windowWidth - 2 * 20 - 2 * 13 - 2 * 13) / 2;
  const dropdownButtonText1Width = 83 * (dropdownContainerWidth / 173);
  const dropdownButtonText2Width = 22 * (dropdownContainerWidth / 173);
  const dropdownMenuWidth = dropdownContainerWidth * 1.069;

  const [Checked, setChecked] = useState([]);

  const handleToggle = (value) => {
    const currentIndex = Checked.indexOf(value);
    const newChecked = [...Checked];
    let isNowChecked; // New variable to track the new state of the value

    if (currentIndex === -1) {
      newChecked.push(value);
      isNowChecked = true; // The value is now checked
    } else {
      newChecked.splice(currentIndex, 1);
      isNowChecked = false; // The value is now unchecked
    }

    setChecked(newChecked);
    props.handleFilters(value, isNowChecked);
  };

  // const CheckboxList = () =>
  //   props.options &&
  //   props.options.map((value, index) => (
  //     <div className='form-check' key={index}>
  //       <input
  //         className='form-check-input'
  //         type='checkbox'
  //         value=''
  //         hasValidation='false'
  //         checked={Checked.indexOf(value.value) !== -1 ? true : false}
  //         onChange={() => handleToggle(value.value)}
  //         style={{
  //           backgroundColor:
  //             Checked.indexOf(value.value) === -1 ? '#FFFFFF' : '#FAB25E',
  //         }}
  //       />

  //       <label className='form-check-label' htmlFor='flexCheckDefault'>
  //         {value.label}
  //       </label>
  //     </div>
  //   ));

  return (
    <Dropdown
      className='post-dropdown-container'
      style={isMobile ? { width: dropdownContainerWidth + 'px' } : {}}
    >
      {/* Filter, Location dropdown button */}
      <Dropdown.Toggle
        className='post-dropdown-button-section'
        style={isMobile ? { width: dropdownContainerWidth + 'px' } : {}}
        id='post-dropdown-button'
        data-bs-auto-close='outside'
        aria-expanded='false'
        align='start'
        background-color='black'
      >
        <span
          className='post-dropdown-button-text1-section'
          style={isMobile ? { width: dropdownButtonText1Width + 'px' } : {}}
        >
          {props.menuLabel}
        </span>
        <span
          className='post-dropdown-button-text2-section'
          style={isMobile ? { width: dropdownButtonText2Width + 'px' } : {}}
        >
          {props.wordAfterMenuLabel}
        </span>
      </Dropdown.Toggle>

      <Dropdown.Menu
        className='post-dropdown-menu-section'
        style={isMobile ? { width: dropdownMenuWidth + 'px' } : {}}
      >
        <div
          className='post-dropdown-menu-list-section'
          style={isMobile ? { width: dropdownMenuWidth + 'px' } : {}}
        >
          <PostDropDownContents />
        </div>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default PostDropdown;
