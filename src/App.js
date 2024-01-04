import React, { useEffect } from 'react';
import Verification from './routes/verification/verificaiton.component';
import UpdateVerification from './routes/update-verification/update-verification';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PrivateRoute from './private-route.component';
import './App.css';
// components
import Header from './routes/header/header.component';
import Home from './routes/home/home.component';
// import OriginalFooter from './components/footer/footer.component';
import FacialProcedure from './routes/procedure/facial-procedure.component';
import BreastProcedure from './routes/procedure/breast-procedure.component';
import BodyProcedure from './routes/procedure/body-procedure.component';
import SubProcedure from './routes/procedure/sub-procedure.component';
import Instrument from './routes/instrument/instrument.component';
import SubInstrument from './routes/instrument/sub-instrument.component';
import Authentication from './routes/authentication/authentication.component';
import Doctor from './routes/doctor/doctor.component';
import DocotorOwnMain from './components/doctor-own-profile/doctor-own-profile-main';
import DoctorPost from './routes/community/community.component';
import UserAppointmentMain from './components/user-appointment/user-appointment-main.jsx';
import IndividualDoctor from './routes/individual-doctor/individual-doctor';
import Download from './routes/download/download.component';
import HealthCheck from './routes/health-check/health-check.component';
import DoctorProcudreMobile from './components/doctor-procedure-mobile/doctor-procedure-mobile';
import PageNotFound from './routes/page-not-found/page-not-found.component';
import ContactUs from './routes/contact-us/contact-us.component.jsx';
import { useMediaQuery } from 'react-responsive';
import CreatePostOfUser from './components/create-post/create-post.jsx';
import UserProfilePage from './components/user-profile-page/user-profile-page';
import CreatePostPage from './components/components-posts/community-post-create-page/community-post-create-page';
import DoctorAppointmentPage from './components/doctor-appointment/doctor-appointment-page';
import DoctorAppointmentPage2 from './components/doctor-appointment/doctor-appointmet-page-2';

import UserProfileSubArea from './components/user-profile-subArea/user-profile-subArea.jsx';
import UserProfileEdit from './components/user-profile-edit/user-profile-edit.jsx';

import AccountSetup from './components/account-setting/account-setting';
import AccountNotFoundPage from './components/account-setting/not-found';
import DoctorSignUpProcess from './components/doctor-signUp-process/doctor-signUp-process';
import ScrollToTop from './routes/ScrollToTop.js';
import Footer from './components/footer/footer.component.jsx';
import ProcedureMainPage from './routes/procedure/procedure-main-page.component.jsx';
// import { useGetUserInfo } from "./hooks/useAuth.js";
import userInfoQueryStore from './userStore.ts';
import DoctorProfileEdit from './components/doctor-own-profile/doctor-profile-edit/doctor-own-profile-edit';
import EditPostPage from './components/components-posts/community-post-edit-page/community-post-edit-page';
import UniversalProfileEdit from './components/universal-profile-edit/universal-profile-edit';

// import EditPostPage from "./components/components-posts/community-post-edit-page/community-post-edit-page";
import DoctorVerificationPage from './components/doctor-verification-page/doctor-verification-page.component';

import DoctorVerificationMainPage from './components/doctor-verification-page/doctor-verification-main-page';

const App = () => {
  const isMobile = useMediaQuery({ query: `(max-width: 768px)` });
  // const userInfo = userInfoQueryStore((state) => state.userInfo);
  /* Load token from cookie*/
  //console.log('userInfo init', userInfo);
  const token = userInfoQueryStore((state) => state.userInfo.token);
  const setToken = userInfoQueryStore((state) => state.setToken);
  const setAccountType = userInfoQueryStore((state) => state.setAccountType);
  // const { data, isLoading, isError, error } = useGetUserInfo();
  const setUsername = userInfoQueryStore((state) => state.setUsername);
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
      <div className='app-container'>
        <Header />
        <div className='body-middle-container'>
          <Routes>
            <Route path='/'>
              {/* <Route path='/' element={<OriginalFooter />}> */}
              {/* <Route index element={isMobile ? <HomeMobile /> : <Home />} /> */}
              <Route index element={<Home />} />
              <Route path='procedure/facial' element={<FacialProcedure />} />
              {/* <Route path='procedure/breast' element={<BreastProcedure />} /> */}
              {/* <Route path='procedure/body' element={<BodyProcedure />} /> */}
              <Route path='procedure/:name' element={<SubProcedure />} />
              <Route
                path='/procedureMobile'
                element={isMobile ? <DoctorProcudreMobile /> : <Download />}
              />
              <Route path='procedure' element={<ProcedureMainPage />} />
              <Route path='doctor' element={<Doctor />} />
              <Route path='userAppointment' element={<UserAppointmentMain />} />
              <Route path='instrument' element={<Instrument />} />
              <Route path='instrument/:name' element={<SubInstrument />} />
              <Route path='sign-in' element={<Authentication />} />
              <Route
                path='doctor-appointment'
                element={<DoctorAppointmentPage />}
              />
              <Route
                path='doctor-appointment-2'
                element={<DoctorAppointmentPage2 />}
              />
              <Route path='posts' element={<DoctorPost />} />
              <Route
                path='doctorProfileEdit'
                element={
                  <PrivateRoute>
                    <UniversalProfileEdit />
                  </PrivateRoute>
                }
              />
              <Route path='posts/:postid' element={<DoctorPost />} />
              <Route
                path='doctor/:encodedMemberId'
                element={<IndividualDoctor />}
              />
              <Route
                path='doctorProfile'
                element={
                  <PrivateRoute>
                    <DocotorOwnMain />
                  </PrivateRoute>
                }
              />
              <Route
                path='userProfile'
                element={
                  <PrivateRoute>
                    <UserProfilePage />
                  </PrivateRoute>
                }
              />

              <Route path='download' element={<Download />} />
              {/* <Route path="create-post" element={<CreatePostOfUser />} /> */}
              <Route path='/posts/create' element={<CreatePostPage />} />
              <Route path='/edit-post/:postid' element={<EditPostPage />} />
              {/* <Route path="/edit-post" element={<EditPostPage />} /> */}
              <Route path='health-check' element={<HealthCheck />} />
              <Route path='userProfile' element={<UserProfilePage />} />

              <Route path='AccountSetup' element={<AccountSetup />} />
              <Route
                path='userProfileEdit'
                element={
                  <PrivateRoute>
                    <UniversalProfileEdit />
                  </PrivateRoute>
                }
              />

              {/* <Route path='register/verifyEmail/:token' element={<Verification />} /> */}
              <Route path='register/verifyEmail' element={<Verification />} />
              <Route
                path='updateEmail/verification'
                element={<UpdateVerification />}
              />
              <Route
                path='doctorVerification'
                element={<DoctorVerificationMainPage />}
              />
              <Route path='contact-us' element={<ContactUs />} />
              <Route path='*' element={<PageNotFound />} />
            </Route>
          </Routes>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default App;
