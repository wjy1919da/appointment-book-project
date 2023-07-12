import './header-mobile-dropdownV2.styles.scss'
import { Link } from 'react-router-dom';
import { useState } from 'react';
//src/routes/header/header-mobile-dropdownV2.styles.scss
//src/routes/header/header-mobile-dropDownV2.styles.scss
const HeaderMobileDropDownV2 = () => {
    const [click, setClick] = useState(false);
    const handleClick = () => setClick(!click);
    const MenuItems = [
        {
            title: 'Login',
            path: 'sign-in',
          
        },
        {
            title: 'Register',
            path: 'sign-in',
       
        }
   ];
  return (
    <>
      <ul
        onClick={handleClick}
        className='home-mobile-dropdownV2'
      >
        {MenuItems.map((item, index) => {
          return (
            <li key={index}>
              <Link
                to={item.path}
                onClick={() => setClick(false)}
              >
                {item.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  )
}

export default HeaderMobileDropDownV2