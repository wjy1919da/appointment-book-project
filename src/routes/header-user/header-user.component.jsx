import { Link, useLocation } from "react-router-dom";
import "./header-user.styles.scss";
import { useInsertionEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { useGetUserInfo } from "../../hooks/useAuth";
import userInfoQueryStore from "../../userStore.ts";
import { useRef, useEffect } from "react";
import defaultAvatar from "../../assets/post/user-profile-avatar.png";

import useTimer from "../../hooks/useTimer";
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
} from "@chakra-ui/react";

const HeaderUser = () => {
  const location = useLocation();
  const loginIcon = require("../../assets/home/login-user.png");
  const userInfo = userInfoQueryStore((state) => state.userInfo);
  // console.log("userInfo in header", userInfo);
  const togglePopup = userInfoQueryStore((state) => state.togglePopup);

  const removeToken = userInfoQueryStore((state) => state.removeToken);

  const handleLogOutClick = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("charmFollowedUsers");
    removeToken();
    modalDisclosure.onClose(); // Close the logout modal
  };
  const { isOpen, onOpen, onClose } = useDisclosure();
  const modalDisclosure = useDisclosure();
  const menuDisclosure = useDisclosure();
  // Fetch user info
  const { data, isLoading, isError, error } = useGetUserInfo();
  const toggle = () => {
    if (menuDisclosure.isOpen) {
      menuDisclosure.onClose();
    } else {
      menuDisclosure.onOpen();
    }
  };

  return (
    <div className="header-login">
      {!userInfo.token && (
        <div
          onClick={() => togglePopup(true, "accountType")} //signUp //gender//accountType
          className="header-login-default"
        >
          <img
            src={loginIcon}
            alt="login"
            className="header-login-default-icon"
          ></img>
          <div className="header-login-text">Login/Sign up</div>
        </div>
      )}
      <Menu
        isOpen={menuDisclosure.isOpen}
        onClose={menuDisclosure.onClose}
        onMouseLeave={menuDisclosure.onClose}
      >
        {userInfo.token && (
          <img
            onMouseEnter={menuDisclosure.onOpen}
            src={data?.data?.image || defaultAvatar}
            alt="User avatar"
            className="header-avatar"
          />
        )}

        {userInfo.token && (
          <MenuButton
            as={Button}
            style={{ backgroundColor: "transparent" }}
            onMouseEnter={menuDisclosure.onOpen}
            onClick={toggle}
          >
            {data?.data?.nickname || "User"}
          </MenuButton>
        )}
        <MenuList>
          <MenuGroup title={`Hello, ${data?.data?.nickname || "User"}`}>
            {/* <MenuItem>
              <Link
                to="/AccountSetup"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                Account Setting
              </Link>
            </MenuItem> */}
            {localStorage.getItem("accountType") === "1" && (
              <MenuItem>
                <Link
                  to="/userProfile"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  Your Profile
                </Link>
              </MenuItem>
            )}
            {localStorage.getItem("accountType") === "2" && (
              <MenuItem>
                <Link
                  to="/doctorProfile"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  Your Profile
                </Link>
              </MenuItem>
            )}
          </MenuGroup>
          <MenuDivider />
          <MenuGroup>
            <MenuItem onClick={modalDisclosure.onOpen}>Log out</MenuItem>
          </MenuGroup>
        </MenuList>
      </Menu>
      <Modal isOpen={modalDisclosure.isOpen} onClose={modalDisclosure.onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader></ModalHeader>
          <ModalBody>
            <Text fontSize="2xl" color="tomato">
              Are you sure you want to log out?
            </Text>
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={modalDisclosure.onClose}>
              Cancel
            </Button>
            <Button colorScheme="orange" onClick={handleLogOutClick}>
              Log out
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default HeaderUser;
