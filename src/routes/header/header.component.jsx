import { Outlet, Link } from 'react-router-dom';
import { Fragment } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown'
import { Button, Dropdown, Form } from 'react-bootstrap';
import Logo from '../../assets/home/logo.png';
import ArrowIcon from '../../assets/home/arrow-icon.png';
import menuBar from '../../assets/home/menu-bar.png'
import HeaderMobileDropDownV2 from './header-mobile-dropDownV2.component';

import './header.styles.scss';
import { useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import DropdownMenu from '../../components/dropdown-menu/dropdown-menu';

const Header = () => {
    const loginIcon = require('../../assets/home/login-user.png');
    const [expanded, setExpanded] = useState(false);
    const facialProcedures = ['Facial Rejuvenation', 'Deep Plane Facelift', 'Eye Reshaping', 'Fox Eyes', 'Rhinoplasty', 'Lip Enhancement', 'Lip Augmentation', 'Otoplasty', 'Chin Implants', 'Neck Contouring', 'CO2 Laser Resurfacing']
    const breastProcedures = ['Breast Augmentation', 'Breast Lift', 'Breast Reconstruction', 'En Bloc Capsulectomy']
    const bodyProcedures = ['Liposuction', 'Butt Lift', 'Feminine Rejuvenation', 'Tummy Tuck', 'Arm Lift']
    const facialDropDownMenuMobile = facialProcedures.map((procedure) => 
        <NavDropdown.Item className='nav-link' as={Link} to={'/procedure/' + procedure.toLowerCase().replaceAll(' ', '-')} onClick={() => setExpanded(expanded ? false : 'expanded')} key={procedure}>
            {procedure}
            <span><img className='dropdown-item-icon' src={ArrowIcon} alt='go to detail'/></span>
        </NavDropdown.Item>
    );
    const breastDropDownMenuMobile = breastProcedures.map((procedure) => 
        <NavDropdown.Item className='nav-link' as={Link} to={'/procedure/' + procedure.toLowerCase().replaceAll(' ', '-')} onClick={() => setExpanded(expanded ? false : 'expanded')} key={procedure}>
            {procedure}
            <span><img className='dropdown-item-icon' src={ArrowIcon} alt='go to detail'/></span>
        </NavDropdown.Item>
    );
    const bodyDropDownMenuMobile = bodyProcedures.map((procedure) => 
        <NavDropdown.Item className='nav-link' as={Link} to={'/procedure/' + procedure.toLowerCase().replaceAll(' ', '-')} onClick={() => setExpanded(expanded ? false : 'expanded')} key={procedure}>
            {procedure}
            <span><img className='dropdown-item-icon' src={ArrowIcon} alt='go to detail'/></span>
        </NavDropdown.Item>
    );

    const [IsModalOpen, setIsModelOpen] = useState(false);
    const isMobile = useMediaQuery({ query: `(max-width: 767px)` });
    //   Save: old navbar    
    const [click, setClick] = useState(false);
    const [loginClick, setLoginClick] = useState(false);
    const [dropdown, setDropdown] = useState(false);
  
    const handleClick = () => setClick(!click);
    const handleLoginClick = () => setLoginClick(!loginClick);
    const MenuItems = [
      {
          title: 'Login',
          path: 'sign-in',
          cName: 'dropdown-link'
      },
      {
          title: 'Doctor',
          path: 'doctor',
          cName: 'dropdown-link'
      },
      {
          title: 'Post',
          path: 'posts',
          cName: 'dropdown-link'
      }
    ];


//   Save: old navbar    
//     <Navbar className='header-navbar' expand="lg" expanded={expanded}>
//     <Container>
//         <Link className='header-logo-container' to='/'>
//             {/* <img className='logo' src={Logo} alt='logo' /> */}
//         </Link>
//         <Navbar.Toggle className='toggle-button' aria-controls="basic-navbar-nav" onClick={() => setExpanded(expanded ? false : 'expanded')}/>
//         <Navbar.Collapse id="basic-navbar-nav">
//             <Nav className="me-auto">
//                 <NavDropdown className='nav-link nav-dropdown' title="Procedure" id="basic-nav-dropdown">
//                     <NavDropdown className='nav-link nav-dropdown' title="Facial" id="basic-nav-dropdown">
//                         <NavDropdown.Item className='nav-link' as={Link} to="procedure/facial" onClick={() => setExpanded(expanded ? false : 'expanded')}>
//                             All Facial Procedure Options
//                             <span><img className='dropdown-item-icon' src={ArrowIcon} alt='go to detail'/></span>
//                         </NavDropdown.Item>
//                         {facialDropDownMenuMobile}
//                     </NavDropdown>
//                     <NavDropdown.Divider />
//                     <NavDropdown className='nav-link nav-dropdown' title="Breast" id="basic-nav-dropdown">
//                         <NavDropdown.Item className='nav-link' as={Link} to="procedure/breast" onClick={() => setExpanded(expanded ? false : 'expanded')}>
//                             All Breast Procedure Options
//                             <span><img className='dropdown-item-icon' src={ArrowIcon} alt='go to detail'/></span>
//                         </NavDropdown.Item>
//                         {breastDropDownMenuMobile}
//                     </NavDropdown>
//                     <NavDropdown.Divider />
//                     <NavDropdown className='nav-link nav-dropdown' title="Body" id="basic-nav-dropdown">
//                         <NavDropdown.Item className='nav-link' as={Link} to="procedure/body" onClick={() => setExpanded(expanded ? false : 'expanded')}>
//                             All Body Procedure Options
//                             <span><img className='dropdown-item-icon' src={ArrowIcon} alt='go to detail'/></span>
//                         </NavDropdown.Item>
//                         {bodyDropDownMenuMobile}
//                     </NavDropdown>
//                 </NavDropdown>
//                 <Nav.Link className='nav-link' as={Link} to="doctor" onClick={() => setExpanded(expanded ? false : 'expanded')}>Doctors</Nav.Link>
//                 <Nav.Link className='nav-link' as={Link} to="instrument" onClick={() => setExpanded(expanded ? false : 'expanded')}>Instruments</Nav.Link>
//                 {/* <Nav.Link className='nav-link' as={Link} to="sign-in" onClick={() => setExpanded(expanded ? false : 'expanded')}><b>Sign in</b></Nav.Link> */}
//             </Nav>
//         </Navbar.Collapse>
//     </Container>
// </Navbar>

    return (
        <div>
            {isMobile?(
                <>
                <div className='header-container-mobile'>
                    <div className='header-menuBarIcon-container-mobile'>
                    <Dropdown>
                        <Dropdown.Toggle variant="success" id="dropdown-basic"style={{ backgroundColor: 'transparent', borderColor: 'transparent',height:'36px',padding:'10px 20px'}}>
                        <img src={menuBar}alt="your alt text" style={{width: "36px", height: "36px"}}/>
                        </Dropdown.Toggle>

                        <Dropdown.Menu className='header-menu-bar-mobile-container' >
                        <Dropdown.Item as={Link} to="/procedureMobile" className='header-menu-bar-item-mobile' >Procedure</Dropdown.Item>
                        <Dropdown.Item as={Link} to="/doctor" className='header-menu-bar-item-mobile'>Doctor</Dropdown.Item>
                        <Dropdown.Item as={Link} to="/posts" className='header-menu-bar-item-mobile'>Post</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    </div>
                    {/* <div className='header-logo-container-mobile'> */}
                        <Link className='header-logo-container-mobile' to='/'>
                          <img className='logo' src={Logo} alt='logo' style={{width:'36px',height:'36px'}}/>
                        </Link>
                    {/* </div> */}
                    <div className='header-login-container-mobile'>
                    <Dropdown style={{marginTop:'-9px'}}>
                        <Dropdown.Toggle variant="success" id="dropdown-basic"style={{ backgroundColor: 'transparent', borderColor: 'transparent',height:'36px',padding:'10px 20px' }}>
                        <img src={loginIcon} alt="login-Image" style={{width:'34px',height:'36px',marginTop:'-15%'}}></img>
                        </Dropdown.Toggle>
                        <Dropdown.Menu className='header-menu-bar-mobile-container'>
                        <Dropdown.Item as={Link} to="/doctor" className='header-menu-bar-item-mobile'>login</Dropdown.Item>
                        <Dropdown.Item as={Link} to="/posts" className='header-menu-bar-item-mobile'>register</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    </div>
                </div>
                {/* <div className='header-conatiner-mobile'
                     style={{borderBottom:'1px solid grey',marginTop:'-10px'}}
                        >

                </div> */}
                    <Outlet />
                </>
            ):(
            <Fragment>
            {/* desktop */}
            <div className='header-container'>
                <Link className='header-logo-container' to='/'>
                    <img className='logo' src={Logo} alt='logo' />
                </Link>
                <div className='header-nav-container' id='#navbarTogglerDemo02'>
                    <span className='dropdown-center'>
                        <Link 
                            className='header-nav-link1' 
                            // to = '/procedure/botox_injections'
                            data-bs-toggle='dropdown disabled' 
                            aria-expanded='false'
                            //onMouseOver={() => setIsModelOpen(true)}
                            onClick={() => setIsModelOpen(true)}
                            >
                            Procedure
                        </Link>
                        <ul className='dropdown-menu'>
                            {IsModalOpen && 
                                <DropdownMenu
                                    show={IsModalOpen}
                                    onHide={() => setIsModelOpen(false)}
                                />} 
                            {/* <DropdownMenu /> */}
                        </ul>
                    </span>
                    <span className='header-nav-divider'>|</span>
                    <Link className='header-nav-link2' to='/doctor'>
                        Doctors
                    </Link>
                    {/* <span className='header-nav-divider'>|</span>
                    <Link className='header-nav-link3' to='/instrument'>
                        Instruments
                    </Link> */}
                    <span className='header-nav-divider'>|</span>
                    <Link className='header-nav-link3' to='/posts'>
                        Posts
                    </Link>
                    
                </div>
                <div className='header-login'>
                    <div className="header-search">
                        <input class="form-control me-2" className='input' type="text"  aria-label="Search">
                        </input>
                    </div> 
                   <div className="header-login-logo">
                        <img src={loginIcon} alt="login Image" ></img>
                    </div>
                    <div className="header-login-text">
                        <p>login</p>
                    </div>
                </div>
            </div>
            <Outlet />
        </Fragment>
        )}
        </div>
    )
}

export default Header;