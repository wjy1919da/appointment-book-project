import React, { useState } from 'react';
import { Button, Dropdown } from 'react-bootstrap';
// import { Checkbox } from 'react-bootstrap';
// import { Checkbox } from 'antd';
import Checkbox from '@mui/material/Checkbox';
// import FormGroup from '@mui/material/FormGroup';
// import FormControlLabel from '@mui/material/FormControlLabel';
import "./post-dropdown.styles.scss";
import PostDropdownIcon from "../../assets/post/post-drop-down-icon.png"

const PostDropdown2 = (props) => {
    const[isChecked1, setIsChecked1] = useState(false);
    const[isChecked2, setIsChecked2] = useState(false);
    const handleChange1 = () => {
        setIsChecked1(!isChecked1);
    };
    const handleChange2 = () => {
        setIsChecked2(!isChecked2);
    };

    return (
        <Dropdown className='post-dropdown2-container'>
            <Dropdown.Toggle className='post-dropdown2-button-section'
                             id='post-dropdown2-button' 
                             data-bs-auto-close='outside'
                             aria-expanded='false'
                             // data-bs-theme='#FFFFFF'
                             >
                <span className = 'post-dropdown2-button-text1-section'>Post by: </span>
                <span className = 'post-dropdown2-button-text2-section'>All</span>
                {/* <img src={PostDropdownIcon} alt='post-dropdown-icon' className='post-dropdown2-icon-section' /> */}
            </Dropdown.Toggle>

            <Dropdown.Menu className='post-dropdown2-menu-section'>
                <div className='post-dropdown2-menu-list-section'>
                    <div className="form-check">
                        <input className="form-check-input"
                                type="checkbox"
                                value=""
                                id="flexCheckDefault"
                                checked={isChecked1}
                                onChange={handleChange1}
                                style={{ backgroundColor: isChecked1 ? '#FAB25E' : '#FFFFFF' }}
                        />

                        <label className="form-check-label" htmlFor="flexCheckDefault">
                            By User
                        </label>
                    </div>

                    <div className="form-check">
                        <input className="form-check-input"
                                type="checkbox"
                                value=""
                                id="flexCheckDefault"
                                checked={isChecked2}
                                onChange={handleChange2}
                                style={{ backgroundColor: isChecked2 ? '#FAB25E' : '#FFFFFF' }}
                            />

                        <label className="form-check-label" htmlFor="flexCheckDefault">
                            By Doctor
                        </label>
                    </div>
                </div>
            </Dropdown.Menu>
        </Dropdown>
    )
}

export default PostDropdown2;