import React, { useState,useEffect } from 'react';
import { Button, Dropdown } from 'react-bootstrap';
import { useMediaQuery } from 'react-responsive';
import "./post-drop-down.styles.scss";

const PostDropdown = (props) => {
    const isMobile = useMediaQuery({ query: `(max-width: 576px)` });
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    useEffect(() => {
        const handleWindowResize = () => {
            setWindowWidth(window.innerWidth);
        }
        window.addEventListener('resize', handleWindowResize);
        // cleanup function to remove event listener when component unmounts
        return () => {
            window.removeEventListener('resize', handleWindowResize);
        }
    }, []);
    var dropdownContainerWidth = (windowWidth - 2 * 20 - 2 * 13 - 31) / 2;
    var dropdownButtonText1Width = 83 * (dropdownContainerWidth / 173);
    var dropdownButtonText2Width = 22 * (dropdownContainerWidth / 173);
    var dropdownMenuWidth = dropdownContainerWidth * 1.069;
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
    
    const CheckboxList = () => props.options && props.options.map((value, index) => (
        // <React.Fragment key={index}> // React.Fragment allows to return multiple elements from a React component 
                                        // by allowing to group a list of children without adding extra nodes to the DOM. 
                                        // To return multiple elements from a React component, need to wrap the element in a root element.
                                        // But this one will lead to the flashing blue borders when clicking the dropdown buttons.
             <div className="form-check" key={index}>
                <input className="form-check-input"
                        type="checkbox"
                        value=""
                        hasValidation = "false"
                        checked={Checked.indexOf(value.value) !== -1 ? true : false}
                        onChange={() => handleToggle(value.value)}
                        style={{ backgroundColor: Checked.indexOf(value.value) === -1 ? '#FFFFFF':'#FAB25E'}}
                />

                <label className="form-check-label" htmlFor="flexCheckDefault">
                     {value.label}
                </label>
            </div>
        // </React.Fragment>
     ))
     return (
        <Dropdown className='post-dropdown-container' style={isMobile ? {width: dropdownContainerWidth + 'px'} : {}}>
            <Dropdown.Toggle className='post-dropdown-button-section'
                            style={isMobile ? {width: dropdownContainerWidth + 'px'} : {}}
                            id='post-dropdown-button' 
                            data-bs-auto-close='outside'
                            aria-expanded='false'
                            align='start'
                            background-color='black'>
                <span className = 'post-dropdown-button-text1-section' style={isMobile ? {width: dropdownButtonText1Width + 'px'} : {}}>{props.menuLabel}</span>
                <span className = 'post-dropdown-button-text2-section' style={isMobile ? {width: dropdownButtonText2Width + 'px'} : {}}>{props.wordAfterMenuLabel}</span>
            </Dropdown.Toggle>
            <Dropdown.Menu className='post-dropdown-menu-section' style={isMobile ? {width: dropdownMenuWidth + 'px'} : {}}>
                <div className='post-dropdown-menu-list-section' style={isMobile ? {width: dropdownMenuWidth + 'px'} : {}}>
                    {CheckboxList()}
                </div>   
            </Dropdown.Menu>
        </Dropdown>
   )
}

export default PostDropdown;