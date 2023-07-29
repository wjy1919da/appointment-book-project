import React, { useState } from 'react';
import { Button, Dropdown } from 'react-bootstrap';
// import { Checkbox } from 'react-bootstrap';
// import { Checkbox } from 'antd';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Checkbox from '@mui/material/Checkbox';
import "./post-dropdown.styles.scss";
import PostDropdownIcon from "../../assets/post/post-drop-down-icon.png"

const PostDropdown1 = (props) => {
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
        <React.Fragment key={index}>
             <div className="form-check1">
                <input className="form-check-input"
                        type="checkbox"
                        value=""
                        hasValidation = "false"
                        checked={Checked.indexOf(value.value) !== -1 ? true : false}
                        onChange={() => handleToggle(value.value)}
                        style={{ backgroundColor: Checked.indexOf(value.value) === -1 ? '#FFFFFF':'#FAB25E'}}
                />

                <label className="form-check-label1" htmlFor="flexCheckDefault1">
                     {value.label}
                </label>
            </div>
        </React.Fragment>
    ))

    return (
        <Dropdown className='post-dropdown1-container'>
            <Dropdown.Toggle className='post-dropdown1-button-section'
                             id='post-dropdown1-button' 
                             data-bs-auto-close='outside'
                             aria-expanded='false'
                             align='start'
                             background-color='black'
                             >
                <span className = 'post-dropdown1-button-text1-section'>{props.menuLabel}: </span>
                <span className = 'post-dropdown1-button-text2-section'>All</span>
                {/* <img src={PostDropdownIcon} alt='post-dropdown-icon' className='post-dropdown2-icon-section' /> */}
            </Dropdown.Toggle>

            <Dropdown.Menu className='post-dropdown1-menu-section'>
                <div className='post-dropdown1-menu-list-section'>
                    {CheckboxList()}
                </div>   
            </Dropdown.Menu>
        </Dropdown>
    )
}

export default PostDropdown1;