import { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import userInfoQueryStore from '../../userStore.ts';
import HeaderUser from '../header-user/header-user.component';
import SignupPopup3 from '../../components/components-signup-and-login/signup-and-login-popup/signup-popup3.component';
import './header.styles.scss';
// import ArrowIcon from '../../assets/home/arrow-icon.png';
// import menuBar from '../../assets/home/menu-bar.png';
// import { Fragment } from 'react';
// import NavDropdown from 'react-bootstrap/NavDropdown';
// import { Button, Dropdown, Form } from 'react-bootstrap';
// import DropdownMenu from '../../components/dropdown-menu/dropdown-menu';

// images
import UserIcon from '../../assets/user/user.svg';
import ChatIcon from '../../assets/post/bubbles_icon.svg';
import Logo from '../../assets/home/logo.png';
import HamburgerIcon from '../../assets/home/hamburger.svg';

const Header = () => {
  const location = useLocation();
  const userInfo = userInfoQueryStore((state) => state.userInfo);
  const isMobile = useMediaQuery({ query: `(max-width: 744px)` });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const togglePopup = userInfoQueryStore((state) => state.togglePopup);
  const isPopupOpen = userInfo.popupState !== 'closed';
  // const loginIcon = require('../../assets/home/login-user.png');

  return (
    <div className='header-container'>
      <div className='header-inner-container'>
        <div className='header-logo-and-nav-container'>
          <div className='header-logo-container'>
            <Link className='header-logo-container' to='/'>
              <img className='logo' src={Logo} alt='logo' />
              <span className='logo-title'>Charm</span>
            </Link>
          </div>
          <div className='header-nav-container'>
            <Link
              className={`header-nav header-nav-link ${
                location.pathname === '/doctor' ? 'active-link' : ''
              }`}
              to='/doctor'
              title='Doctors'
            >
              Doctors
            </Link>
            <Link
              className={`header-nav header-nav-link ${
                location.pathname === '/posts' ? 'active-link' : ''
              }`}
              to='/posts'
              title='Posts'
            >
              Posts
            </Link>
            <Link
              className={`header-nav-link ${
                location.pathname.startsWith('/procedure') ? 'active-link' : ''
              }`}
              to='/procedure'
              title='Procedure'
            >
              Procedure
            </Link>
            <Link
              className={`header-nav header-nav-link ${
                location.pathname === '/instrument' ? 'active-link' : ''
              }`}
              to='/instrument'
              title='Instruments'
            >
              Instruments
            </Link>
          </div>
        </div>
        {!isMobile ? (
          <>
            <HeaderUser />
            {isPopupOpen && (
              <SignupPopup3
                show={isPopupOpen}
                onHide={() => {
                  togglePopup(false);
                }}
              />
            )}
          </>
        ) : (
          <div className='header-login-icon-container'>
            <img
              src={UserIcon}
              alt='login'
              style={{
                width: '24px',
                height: '24px',
              }}
            />
            <img
              src={ChatIcon}
              alt='login'
              style={{
                width: '20px',
                height: '20px',
              }}
            />
            <img
              src={HamburgerIcon}
              alt='login'
              style={{
                width: '25px',
                height: '25px',
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;

// * * * previous codes are here
// import { Outlet, Link, useLocation } from 'react-router-dom';
// import { Fragment } from 'react';
// import NavDropdown from 'react-bootstrap/NavDropdown';
// import { Button, Dropdown, Form } from 'react-bootstrap';
// import Logo from '../../assets/home/logo.png';
// import ArrowIcon from '../../assets/home/arrow-icon.png';
// import menuBar from '../../assets/home/menu-bar.png';
// import './header.styles.scss';
// import { useState } from 'react';
// import { useMediaQuery } from 'react-responsive';
// import DropdownMenu from '../../components/dropdown-menu/dropdown-menu';
// import SignupPopup3 from '../../components/components-signup-and-login/signup-and-login-popup/signup-popup3.component';
// import userInfoQueryStore from '../../userStore.ts';
// import HeaderUser from '../header-user/header-user.component';
// const Header = () => {
//   const location = useLocation();
//   const loginIcon = require('../../assets/home/login-user.png');
//   const userInfo = userInfoQueryStore((state) => state.userInfo);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const isMobile = useMediaQuery({ query: `(max-width: 744px)` });
//   const togglePopup = userInfoQueryStore((state) => state.togglePopup);
//   const isPopupOpen = userInfo.popupState !== 'closed';

//   return (
//     <>
//       {isMobile ? (
//         <>
//           <div className='header-container-mobile'>
//             <div className='header-menuBarIcon-container-mobile'>
//               <Dropdown>
//                 <Dropdown.Toggle
//                   variant='success'
//                   id='dropdown-basic'
//                   style={{
//                     backgroundColor: 'transparent',
//                     borderColor: 'transparent',
//                     height: '36px',
//                     padding: '10px 20px',
//                   }}
//                 >
//                   <img
//                     src={menuBar}
//                     alt='your alt text'
//                     style={{ width: '36px', height: '36px' }}
//                   />
//                 </Dropdown.Toggle>
//                 <Dropdown.Menu className='header-menu-bar-mobile-container'>
//                   <Dropdown.Item
//                     as={Link}
//                     to='/procedureMobile'
//                     className='header-menu-bar-item-mobile'
//                   >
//                     Procedure
//                   </Dropdown.Item>
//                   <Dropdown.Item
//                     as={Link}
//                     to='/doctor'
//                     className='header-menu-bar-item-mobile'
//                   >
//                     Doctor
//                   </Dropdown.Item>
//                   <Dropdown.Item
//                     as={Link}
//                     to='/posts'
//                     className='header-menu-bar-item-mobile'
//                   >
//                     Post
//                   </Dropdown.Item>
//                 </Dropdown.Menu>
//               </Dropdown>
//             </div>
//             {/* <div className='header-logo-container-mobile'> */}
//             <Link className='header-logo-container-mobile' to='/'>
//               <img
//                 className='logo'
//                 src={Logo}
//                 alt='logo'
//                 style={{ width: '36px', height: '36px' }}
//               />
//             </Link>
//             {/* </div> */}
//             <div className='header-login-container-mobile'>
//               <Dropdown style={{ marginTop: '-9px' }}>
//                 <Dropdown.Toggle
//                   variant='success'
//                   id='dropdown-basic'
//                   style={{
//                     backgroundColor: 'transparent',
//                     borderColor: 'transparent',
//                     height: '36px',
//                     padding: '10px 20px',
//                   }}
//                 >
//                   <img
//                     src={loginIcon}
//                     alt='login'
//                     style={{ width: '34px', height: '36px', marginTop: '-15%' }}
//                   ></img>
//                 </Dropdown.Toggle>
//                 <Dropdown.Menu className='header-menu-bar-mobile-container'>
//                   {/* <Dropdown.Item as={Link} to="/doctor" className='header-menu-bar-item-mobile'>login</Dropdown.Item>
//                         <Dropdown.Item as={Link} to="/posts" className='header-menu-bar-item-mobile'>register</Dropdown.Item> */}
//                 </Dropdown.Menu>
//               </Dropdown>
//             </div>
//           </div>
//           <Outlet />
//         </>
//       ) : (
//         <>
//           {/* desktop */}
//           <div className='header-container'>
//             <Link className='header-logo-container' to='/'>
//               <img className='logo' src={Logo} alt='logo' />
//               <span className='logo-title'>Charm</span>
//             </Link>
//             <div className='header-nav-container' id='#navbarTogglerDemo02'>
//               <Link
//                 className={`header-nav header-nav-link ${
//                   location.pathname === '/doctor' ? 'active-link' : ''
//                 }`}
//                 to='/doctor'
//                 title='Doctors'
//               >
//                 Doctors
//               </Link>
//               <Link
//                 className={`header-nav header-nav-link ${
//                   location.pathname === '/posts' ? 'active-link' : ''
//                 }`}
//                 to='/posts'
//                 title='Posts'
//               >
//                 Posts
//               </Link>
//               <span className='header-nav dropdown-center'>
//                 <Link
//                   className={`header-nav-link ${
//                     location.pathname.startsWith('/procedure')
//                       ? 'active-link'
//                       : ''
//                   }`}
//                   // to = '/procedure/botox_injections'
//                   // data-bs-toggle='dropdown disabled'
//                   // aria-expanded='false'
//                   //onMouseOver={() => setIsModelOpen(true)}
//                   // onClick={() => setIsModalOpen(true)}
//                   to='/procedure'
//                   title='Procedure'
//                 >
//                   Procedure
//                 </Link>
//                 <ul className='dropdown-menu'>
//                   {isModalOpen && (
//                     <DropdownMenu
//                       show={isModalOpen}
//                       onHide={() => setIsModalOpen(false)}
//                     />
//                   )}
//                   {/* <DropdownMenu /> */}
//                 </ul>
//               </span>
//               <Link
//                 className={`header-nav header-nav-link ${
//                   location.pathname === '/instrument' ? 'active-link' : ''
//                 }`}
//                 to='/instrument'
//                 title='Instruments'
//               >
//                 Instruments
//               </Link>
//             </div>
//             <HeaderUser />
//           </div>
//           <Outlet />
//         </>
//       )}
//       {isPopupOpen && (
//         <SignupPopup3
//           show={isPopupOpen}
//           onHide={() => {
//             togglePopup(false);
//           }}
//         />
//       )}
//     </>
//   );
// };

// export default Header;
