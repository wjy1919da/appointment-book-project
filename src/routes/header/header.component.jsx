import { Outlet, Link, useLocation } from 'react-router-dom';
import { Fragment } from 'react';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Button, Dropdown, Form } from 'react-bootstrap';
import Logo from '../../assets/home/logo.png';
import ArrowIcon from '../../assets/home/arrow-icon.png';
import menuBar from '../../assets/home/menu-bar.png';
import './header.styles.scss';
import { useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import DropdownMenu from '../../components/dropdown-menu/dropdown-menu';
import SignupPopup3 from '../../components/components-signup-and-login/signup-and-login-popup/signup-popup3.component';
import userInfoQueryStore from '../../userStore.ts';
import HeaderUser from '../header-user/header-user.component';
const Header = () => {
  const location = useLocation();
  const loginIcon = require('../../assets/home/login-user.png');
  const [expanded, setExpanded] = useState(false);
  const facialProcedures = [
    'Facial Rejuvenation',
    'Deep Plane Facelift',
    'Eye Reshaping',
    'Fox Eyes',
    'Rhinoplasty',
    'Lip Enhancement',
    'Lip Augmentation',
    'Otoplasty',
    'Chin Implants',
    'Neck Contouring',
    'CO2 Laser Resurfacing',
  ];
  const breastProcedures = [
    'Breast Augmentation',
    'Breast Lift',
    'Breast Reconstruction',
    'En Bloc Capsulectomy',
  ];
  const bodyProcedures = [
    'Liposuction',
    'Butt Lift',
    'Feminine Rejuvenation',
    'Tummy Tuck',
    'Arm Lift',
  ];
  const userInfo = userInfoQueryStore((state) => state.userInfo);
  console.log('userInfo in header', userInfo);
  const setAccountType = userInfoQueryStore((state) => state.setAccountType);
  const facialDropDownMenuMobile = facialProcedures.map((procedure) => (
    <NavDropdown.Item
      className='nav-link'
      as={Link}
      to={'/procedure/' + procedure.toLowerCase().replaceAll(' ', '-')}
      onClick={() => setExpanded(expanded ? false : 'expanded')}
      key={procedure}
    >
      {procedure}
      <span>
        <img
          className='dropdown-item-icon'
          src={ArrowIcon}
          alt='go to detail'
        />
      </span>
    </NavDropdown.Item>
  ));
  const breastDropDownMenuMobile = breastProcedures.map((procedure) => (
    <NavDropdown.Item
      className='nav-link'
      as={Link}
      to={'/procedure/' + procedure.toLowerCase().replaceAll(' ', '-')}
      onClick={() => setExpanded(expanded ? false : 'expanded')}
      key={procedure}
    >
      {procedure}
      <span>
        <img
          className='dropdown-item-icon'
          src={ArrowIcon}
          alt='go to detail'
        />
      </span>
    </NavDropdown.Item>
  ));
  const bodyDropDownMenuMobile = bodyProcedures.map((procedure) => (
    <NavDropdown.Item
      className='nav-link'
      as={Link}
      to={'/procedure/' + procedure.toLowerCase().replaceAll(' ', '-')}
      onClick={() => setExpanded(expanded ? false : 'expanded')}
      key={procedure}
    >
      {procedure}
      <span>
        <img
          className='dropdown-item-icon'
          src={ArrowIcon}
          alt='go to detail'
        />
      </span>
    </NavDropdown.Item>
  ));
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isMobile = useMediaQuery({ query: `(max-width: 767px)` });

  const [loginClick, setLoginClick] = useState(false);
  const [verifyEmailClick, setVerifyEmailClick] = useState(false);
  const togglePopup = userInfoQueryStore((state) => state.togglePopup);
  const isPopupOpen = userInfo.popupState !== 'closed';

  const removeToken = userInfoQueryStore((state) => state.removeToken);
  const [dropdown, setDropdown] = useState(false);
  const handleLoginClick = () => setLoginClick(!loginClick);
  const [activeTab, setActiveTab] = useState('');
  const handleVerifyEmailClick = () => setVerifyEmailClick(!verifyEmailClick);

  const handleLogOutClick = () => {
    localStorage.removeItem('token');
    removeToken();
    // alert('Log out successfully!');
  };
  const MenuItems = [
    {
      title: 'Login',
      path: 'sign-in',
      cName: 'dropdown-link',
    },
    {
      title: 'Doctor',
      path: 'doctor',
      cName: 'dropdown-link',
    },
    {
      title: 'Post',
      path: 'posts',
      cName: 'dropdown-link',
    },
  ];
  const onClick = () => {
    setDropdown(!dropdown);
  };
  return (
    <div>
      {isMobile ? (
        <>
          <div className='header-container-mobile'>
            <div className='header-menuBarIcon-container-mobile'>
              <Dropdown>
                <Dropdown.Toggle
                  variant='success'
                  id='dropdown-basic'
                  style={{
                    backgroundColor: 'transparent',
                    borderColor: 'transparent',
                    height: '36px',
                    padding: '10px 20px',
                  }}
                >
                  <img
                    src={menuBar}
                    alt='your alt text'
                    style={{ width: '36px', height: '36px' }}
                  />
                </Dropdown.Toggle>
                <Dropdown.Menu className='header-menu-bar-mobile-container'>
                  <Dropdown.Item
                    as={Link}
                    to='/procedureMobile'
                    className='header-menu-bar-item-mobile'
                  >
                    Procedure
                  </Dropdown.Item>
                  <Dropdown.Item
                    as={Link}
                    to='/doctor'
                    className='header-menu-bar-item-mobile'
                  >
                    Doctor
                  </Dropdown.Item>
                  <Dropdown.Item
                    as={Link}
                    to='/posts'
                    className='header-menu-bar-item-mobile'
                  >
                    Post
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
            {/* <div className='header-logo-container-mobile'> */}
            <Link className='header-logo-container-mobile' to='/'>
              <img
                className='logo'
                src={Logo}
                alt='logo'
                style={{ width: '36px', height: '36px' }}
              />
            </Link>
            {/* </div> */}
            <div className='header-login-container-mobile'>
              <Dropdown style={{ marginTop: '-9px' }}>
                <Dropdown.Toggle
                  variant='success'
                  id='dropdown-basic'
                  style={{
                    backgroundColor: 'transparent',
                    borderColor: 'transparent',
                    height: '36px',
                    padding: '10px 20px',
                  }}
                >
                  <img
                    src={loginIcon}
                    alt='login'
                    style={{ width: '34px', height: '36px', marginTop: '-15%' }}
                  ></img>
                </Dropdown.Toggle>
                <Dropdown.Menu className='header-menu-bar-mobile-container'>
                  {/* <Dropdown.Item as={Link} to="/doctor" className='header-menu-bar-item-mobile'>login</Dropdown.Item>
                        <Dropdown.Item as={Link} to="/posts" className='header-menu-bar-item-mobile'>register</Dropdown.Item> */}
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>
          <Outlet />
        </>
      ) : (
        <Fragment>
          {/* desktop */}
          <div className='header-container'>
            <Link className='header-logo-container' to='/'>
              <img className='logo' src={Logo} alt='logo' />
              <span className='logo-title'>Charm</span>
            </Link>
            <div className='header-nav-container' id='#navbarTogglerDemo02'>
              <Link
                className={`header-nav header-nav-link ${
                  location.pathname === '/doctor' ? 'active-link' : ''
                }`}
                to='/doctor' title="Doctors"
              >Doctors</Link>
              <Link
                className={`header-nav header-nav-link ${
                  location.pathname === '/posts' ? 'active-link' : ''
                }`}
                to='/posts' title='Posts'
              >Posts</Link>
              <span className='header-nav dropdown-center'>
                <Link
                  className={`header-nav-link ${
                    location.pathname.startsWith('/procedure/')
                      ? 'active-link'
                      : ''
                  }`}
                  // to = '/procedure/botox_injections'
                  data-bs-toggle='dropdown disabled'
                  aria-expanded='false'
                  //onMouseOver={() => setIsModelOpen(true)}
                  onClick={() => setIsModalOpen(true)}
                  title='Procedure'
                >
                  Procedure
                </Link>
                <ul className='dropdown-menu'>
                  {isModalOpen && (
                    <DropdownMenu
                      show={isModalOpen}
                      onHide={() => setIsModalOpen(false)}
                    />
                  )}
                  {/* <DropdownMenu /> */}
                </ul>
              </span>
              <Link
                className={`header-nav header-nav-link ${
                  location.pathname === '/instrument' ? 'active-link' : ''
                }`}
                to='/instrument' title="Instruments"
              >Instruments</Link>
            </div>
            <HeaderUser />
          </div>
          <Outlet />
        </Fragment>
        )}
        {isPopupOpen &&
                <SignupPopup3
                show = {isPopupOpen}
                onHide={() => {togglePopup(false)}}
            />  
        }
     </div>
   );
 }; 




export default Header;
