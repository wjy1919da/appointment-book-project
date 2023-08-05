import React, { useState } from 'react';
import { Button, Dropdown } from 'react-bootstrap';
import { useMediaQuery } from 'react-responsive';
import "./post-drop-down.styles.scss";

const PostDropdown = (props) => {
    console.log("dropdown props", props);
    
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
             <div className="form-check">
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

    const wordAfterMenuLable = "All";
    const isMobile = useMediaQuery({ query: `(max-width: 576px)` });

    /*
    var w = window.innerWidth;
    var dropdownContainerWidth = (w - 2 * 20 - 2 * 13 - 31) / 2;
    var dropdownButtonText1Width = 83 * (dropdownContainerWidth / 173);
    var dropdownButtonText2Width = 22 * (dropdownContainerWidth / 173);
    var dropdownMenuWidth = dropdownContainerWidth * 1.069;
    
    if (isMobile) {
        return (
            <Dropdown className='post-dropdown-container' style={{width: dropdownContainerWidth + 'px'}}>
                <Dropdown.Toggle className='post-dropdown-button-section'
                                 style={{width: dropdownContainerWidth + 'px'}}
                                 id='post-dropdown-button' 
                                 data-bs-auto-close='outside'
                                 aria-expanded='false'
                                 align='start'
                                 background-color='black'
                                 >
                    <span className = 'post-dropdown-button-text1-section' style={{width: dropdownButtonText1Width + 'px'}}>{props.menuLabel}</span>
                    <span className = 'post-dropdown-button-text2-section' style={{width: dropdownButtonText2Width + 'px'}}>{wordAfterMenuLable}</span>
                </Dropdown.Toggle>
    
                <Dropdown.Menu className='post-dropdown-menu-section' style={{width: dropdownMenuWidth + 'px'}}>
                    <div className='post-dropdown-menu-list-section' style={{width: dropdownMenuWidth + 'px'}}>
                        {CheckboxList()}
                    </div>   
                </Dropdown.Menu>
            </Dropdown>
        )
    }
    else {
        return (
            <Dropdown className='post-dropdown-container'>
                <Dropdown.Toggle className='post-dropdown-button-section'
                                 id='post-dropdown-button' 
                                 data-bs-auto-close='outside'
                                 aria-expanded='false'
                                 align='start'
                                 background-color='black'
                                 >
                    <span className = 'post-dropdown-button-text1-section'>{props.menuLabel}</span>
                    <span className = 'post-dropdown-button-text2-section'>{wordAfterMenuLable}</span>
                </Dropdown.Toggle>
    
                <Dropdown.Menu className='post-dropdown-menu-section'>
                    <div className='post-dropdown-menu-list-section'>
                        {CheckboxList()}
                    </div>   
                </Dropdown.Menu>
            </Dropdown>
        )
    }
    */
    function handleResize() {
        const w = window.innerWidth;
        const dropdownContainerWidth = (w - 2 * 20 - 2 * 13 - 31) / 2;
        const dropdownButtonText1Width = 83 * (dropdownContainerWidth / 173);
        const dropdownButtonText2Width = 22 * (dropdownContainerWidth / 173);
        const dropdownMenuWidth = dropdownContainerWidth * 1.069;

        if (isMobile) {
            return (
                <Dropdown className='post-dropdown-container' style={{width: dropdownContainerWidth + 'px'}}>
                    <Dropdown.Toggle className='post-dropdown-button-section'
                                     style={{width: dropdownContainerWidth + 'px'}}
                                     id='post-dropdown-button' 
                                     data-bs-auto-close='outside'
                                     aria-expanded='false'
                                     align='start'
                                     background-color='black'
                                     >
                        <span className = 'post-dropdown-button-text1-section' style={{width: dropdownButtonText1Width + 'px'}}>{props.menuLabel}</span>
                        <span className = 'post-dropdown-button-text2-section' style={{width: dropdownButtonText2Width + 'px'}}>{wordAfterMenuLable}</span>
                        {/* <img src={PostDropdownIcon} alt='post-dropdown-icon' className='post-dropdown2-icon-section' /> */}
                    </Dropdown.Toggle>
        
                    <Dropdown.Menu className='post-dropdown-menu-section' style={{width: dropdownMenuWidth + 'px'}}>
                        <div className='post-dropdown-menu-list-section' style={{width: dropdownMenuWidth + 'px'}}>
                            {CheckboxList()}
                        </div>   
                    </Dropdown.Menu>
                </Dropdown>
            )
        }
        else {
            return (
                <Dropdown className='post-dropdown-container'>
                    <Dropdown.Toggle className='post-dropdown-button-section'
                                     id='post-dropdown-button' 
                                     data-bs-auto-close='outside'
                                     aria-expanded='false'
                                     align='start'
                                     background-color='black'
                                     >
                        <span className = 'post-dropdown-button-text1-section'>{props.menuLabel}</span>
                        <span className = 'post-dropdown-button-text2-section'>{wordAfterMenuLable}</span>
                        {/* <img src={PostDropdownIcon} alt='post-dropdown-icon' className='post-dropdown2-icon-section' /> */}
                    </Dropdown.Toggle>
        
                    <Dropdown.Menu className='post-dropdown-menu-section'>
                        <div className='post-dropdown-menu-list-section'>
                            {CheckboxList()}
                        </div>   
                    </Dropdown.Menu>
                </Dropdown>
            )
        }
    }
      
    // Attach the handleResize function to the 'resize' event
    window.addEventListener('resize', handleResize);
      
    // Call handleResize initially to apply appropriate styles on page load
    handleResize();
}

export default PostDropdown;