import { Link, useLocation } from 'react-router-dom';
import './header-user.styles.scss';
import { useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import userInfoQueryStore from '../../userStore.ts';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
  useDisclosure,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
} from '@chakra-ui/react'
const HeaderUser = () => {
  const location = useLocation();
  const loginIcon = require('../../assets/home/login-user.png');
  const userInfo = userInfoQueryStore((state) => state.userInfo);
  console.log('userInfo in header', userInfo);
  const setAccountType = userInfoQueryStore((state) => state.setAccountType);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const isMobile = useMediaQuery({ query: `(max-width: 767px)` });

  const [loginClick, setLoginClick] = useState(false);
  const [verifyEmailClick, setVerifyEmailClick] = useState(false);
  const togglePopup = userInfoQueryStore((state) => state.togglePopup);
  const isPopupOpen = userInfo.popupState !== 'closed';

  const removeToken = userInfoQueryStore((state) => state.removeToken);
  const [dropdown, setDropdown] = useState(false);
  const handleLoginClick = () => setLoginClick(!loginClick);
  const handleVerifyEmailClick = () => setVerifyEmailClick(!verifyEmailClick);

  const handleLogOutClick = () => {
    localStorage.removeItem('token');
    removeToken();
    onClose()
    // alert('Log out successfully!');
  };
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <div className='header-login'>
        {!userInfo.token && <div onClick={()=>togglePopup(true, "gender")} className='header-login-default'>
            <img src={loginIcon} alt="login" className='header-login-default-icon'></img>
            <div className="header-login-text">Login/Sign up</div>
          </div>}
       <Menu>
         {userInfo.userId && <MenuButton as={Button} style={{ backgroundColor: 'transparent' }}>
                   {userInfo.userId}
          </MenuButton>} 
        <MenuList>
          <MenuGroup title={`Hello, ${userInfo && userInfo.userId ? userInfo.userId : ''}`}>
            <MenuItem>
              <Link to="/userProfile" style={{ textDecoration: 'none', color: 'inherit' }}>Account Setting</Link>
            </MenuItem>
            <MenuItem>
              <Link to="/userProfile" style={{ textDecoration: 'none', color: 'inherit' }}>Your Profile</Link>
            </MenuItem>
          </MenuGroup>
          <MenuDivider />
          <MenuGroup >
            <MenuItem>
                <div onClick={onOpen}>Log out</div>
            </MenuItem>
          </MenuGroup>
        </MenuList>
      </Menu>

    <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
        <ModalHeader></ModalHeader>
          <ModalBody>
            <Text fontSize='2xl' color='tomato'>
              Are you sure you want to log out?
            </Text>
          </ModalBody>

          <ModalFooter>
            <Button variant='ghost' mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme='orange' onClick={handleLogOutClick}>Log out</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
  </div>
   );
 };




export default HeaderUser;
