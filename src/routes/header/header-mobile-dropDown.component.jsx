import { Menu } from 'antd';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './header-mobile-dropDown.styles.scss';
const HeaderMobileDropDown = () => {
    const [click, setClick] = useState(false);
    const handleClick = () => setClick(!click);
    const MenuItems = [
        {
            title: 'Procedures',
            path: 'procedure/breast_augmentation',
          
        },
        {
            title: 'Doctor',
            path: 'doctor',
       
        },
        {
            title: 'Post',
            path: 'posts',
        }
   ];
   return (
    <>
      <ul
        onClick={handleClick}
        className='home-mobile-dropdown'
      >
        {MenuItems.map((item, index) => {
          return (
            <li key={index}>
              <Link
                to={item.path}
                onClick={() => setClick(false)}
                className='home-mobile-dropdown-link'
              >
                {item.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default HeaderMobileDropDown;