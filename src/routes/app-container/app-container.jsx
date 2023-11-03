import React, { useEffect } from 'react';
import userInfoQueryStore from '../../userStore.ts';
import './app-container.scss';
// components
import Header from '../header/header.component';
import ScrollToTop from '../ScrollToTop.js';
import FooterComponent from '../../components/footer/footer.component.jsx';

const AppContainer = ({children}) => {
  console.log(':::::::::::', children);
  const userInfo = userInfoQueryStore((state) => state.userInfo);
  console.log('userInfo init', userInfo);
  const token = userInfoQueryStore((state) => state.userInfo.token);
  const setToken = userInfoQueryStore((state) => state.setToken);
  const setAccountType = userInfoQueryStore((state) => state.setAccountType);
  useEffect(() => {
    const cookieToken = localStorage.getItem('token');
    if (cookieToken && cookieToken !== token) {
      setToken(cookieToken);
    }
    const accountType = localStorage.getItem('accountType');
    if (accountType) {
      setAccountType(accountType);
    }
  }, []);

  return (
    <>
      <ScrollToTop />
      <Header />
      <div className='body-middle-container'>
        {children}
      </div>
      <FooterComponent />
    </>
  );
};

export default AppContainer;
