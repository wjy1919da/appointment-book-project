import Header from './routes/header/header.component';
import Home from './routes/home/home.component';
import FacialProcedure from './routes/procedure/facial-procedure.component';
import BreastProcedure from './routes/procedure/breast-procedure.component';
import BodyProcedure from './routes/procedure/body-procedure.component';
import SubProcedure from './routes/procedure/sub-procedure.component';
import Instrument from './routes/instrument/instrument.component';
import SubInstrument from './routes/instrument/sub-instrument.component';
import Authentication from './routes/authentication/authentication.component';
import UserInfo from './routes/user-info/user-info.component';
import Doctor from './routes/doctor/doctor.component';
<<<<<<< HEAD
import DocotorOwnMain from './components/doctor-own-profile/doctor-own-profile-main';
import DoctorPost from  './routes/community/community.component';
=======
import DoctorPost from './routes/community/community.component';
>>>>>>> b99dc530e2281b493e01291cc9ad88390d0d8737
import IndividualDoctor from './routes/individual-doctor/individual-doctor';
import Download from './routes/download/download.component';
import HealthCheck from './routes/health-check/health-check.component';
import DoctorProcudreMobile from './components/doctor-procedure-mobile/doctor-procedure-mobile';
import PageNotFound from './routes/page-not-found/page-not-found.component';
import { useMediaQuery } from 'react-responsive';
import CreatePostOfUser from './components/create-post/create-post.jsx';
import { Create } from '@mui/icons-material';
import UserAppointmentMain from './components/user-appointment/user-appointment-main';
import UserProfilePage from './components/user-profile-page/user-profile-page';
import UserProfileSubArea from './components/user-profile-subArea/user-profile-subArea.jsx';

import DoctorSignUpProcess from './components/doctor-signUp-process/doctor-signUp-process';



import React, { useEffect } from 'react';
import userInfoQueryStore from './userStore.ts';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PrivateRoute from './private-route.component';
//src/private-route.component.jsx
import Cookies from 'js-cookie';
import Verification from './routes/verification/verificaiton.component';
const App = () => {
  const isMobile = useMediaQuery({ query: `(max-width: 768px)` });
  const userInfo = userInfoQueryStore((state) => state.userInfo);
  /* Load token from cookie*/
  console.log('userInfo init', userInfo);
  const token = userInfoQueryStore((state) => state.userInfo.token);
  const setToken = userInfoQueryStore((state) => state.setToken);
  useEffect(() => {
    const cookieToken = Cookies.get('token');
    if (cookieToken && cookieToken !== token) {
      setToken(cookieToken);
    }
  }, []);

  return (
    // <DataRouter>
    <Routes>
      <Route path='/' element={<Header />}>
        {/* <Route index element={isMobile ? <HomeMobile /> : <Home />} /> */}
        <Route index element={<Home />} />
        <Route path='procedure/facial' element={<FacialProcedure />} />
        <Route path='procedure/breast' element={<BreastProcedure />} />
        <Route path='procedure/body' element={<BodyProcedure />} />
        <Route path='procedure/:name' element={<SubProcedure />} />
        <Route
          path='/procedureMobile'
          element={isMobile ? <DoctorProcudreMobile /> : <Download />}
        />
        <Route path='doctor' element={<Doctor />} />
        <Route path='instrument' element={<Instrument />} />
        <Route path='instrument/:name' element={<SubInstrument />} />
        <Route path='sign-in' element={<Authentication />} />
        <Route path='posts' element={<DoctorPost />} />
<<<<<<< HEAD
        <Route path='doctorProfile' element={<DocotorOwnMain />} />
        <Route path="doctor/:encodedMemberId" element={<IndividualDoctor />} />
        <Route path="userProfile" element={
=======
        <Route path='doctor/:encodedMemberId' element={<IndividualDoctor />} />

        {/* <Route path="userProfile" element={
>>>>>>> b99dc530e2281b493e01291cc9ad88390d0d8737
          <PrivateRoute>
            <UserProfilePage />
          </PrivateRoute>

        }/>
        <Route path ='userApoinment' element = {<UserAppointmentMain/>} />

        }/> */}


        <Route path='download' element={<Download />} />
        <Route path='create-post' element={<CreatePostOfUser />} />
        <Route path='health-check' element={<HealthCheck />} />
        <Route path='userProfile' element={<UserProfilePage />} />
        {/* <Route path='register/verifyEmail/:token' element={<Verification />} /> */}
        <Route path='register/verifyEmail' element={<Verification />} />
        <Route path='*' element={<PageNotFound />} />
        <Route path ='doctorSignup' element = {< DoctorSignUpProcess/>} />
      </Route>
    </Routes>
    // </DataRouter>
  );
};

export default App;
