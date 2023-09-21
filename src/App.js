import { Routes, Route } from 'react-router-dom';
import Header from './routes/header/header.component';
import Home from './routes/home/home.component';
import FacialProcedure from './routes/procedure/facial-procedure.component';
import BreastProcedure from './routes/procedure/breast-procedure.component';
import BodyProcedure from './routes/procedure/body-procedure.component';
import SubProcedure from './routes/procedure/sub-procedure.component';
import Instrument from './routes/instrument/instrument.component';
import SubInstrument from './routes/instrument/sub-instrument.component';
import Authentication from './routes/authentication/authentication.component';
import UserInfo from "./routes/user-info/user-info.component";
import Doctor from './routes/doctor/doctor.component';
import DoctorPost from  './routes/community/community.component';
import IndividualDoctor from './routes/individual-doctor/individual-doctor';
import Download from './routes/download/download.component';
import HealthCheck from './routes/health-check/health-check.component';
import DoctorProcudreMobile from './components/doctor-procedure-mobile/doctor-procedure-mobile';
import PageNotFound from './routes/page-not-found/page-not-found.component';
import { useMediaQuery } from 'react-responsive';
import CreatePostOfUser from './components/create-post/create-post.jsx';
import { Create } from '@mui/icons-material';
import UserProfilePage from './components/user-profile-page/user-profile-page';
import UserProfileSubArea from './components/user-profile-subArea/user-profile-subArea.jsx';
const App = () => {
  const isMobile = useMediaQuery({ query: `(max-width: 768px)` });
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
        <Route path='/procedureMobile' element={isMobile ? < DoctorProcudreMobile/>: <Download />} />
        <Route path='doctor' element={<Doctor />} />
        <Route path='instrument' element={<Instrument />} />
        <Route path='instrument/:name' element={<SubInstrument />} />
        <Route path='sign-in' element={<Authentication />} />
        <Route path='posts' element={<DoctorPost />} />
        <Route path="doctor/:encodedMemberId" element={<IndividualDoctor />} />
        <Route path='user-info' element={<UserInfo />} />
        <Route path='download' element={<Download />} />
        <Route path = 'create-post' element ={<CreatePostOfUser/>} />
        <Route path='health-check' element={<HealthCheck />} />
        <Route path='userProfile' element={<UserProfilePage />} />
        <Route path='*' element={<PageNotFound />} />
      </Route>
    </Routes>
  // </DataRouter> 
  );
}

export default App;
