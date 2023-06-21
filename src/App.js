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
import DoctorSearch from './components/doctor-search/doctor-search.component';
import DoctorPost from './components/doctor-post/doctor-post.component';
import Download from './routes/download/download.component';
import SubDoctor from './routes/doctor/sub-doctor.component';
import HealthCheck from './routes/health-check/health-check.component';
// do I need to add it into routes?

const App = () => {

  return (
    <Routes>
      <Route path='/' element={<Header />}>
        <Route index element={<Home />} />
        <Route path='procedure/facial' element={<FacialProcedure />} />
        <Route path='procedure/breast' element={<BreastProcedure />} />
        <Route path='procedure/body' element={<BodyProcedure />} />
        <Route path='procedure/:name' element={<SubProcedure />} />
        <Route path='doctor' element={<Doctor />} />
        <Route path='sub-doctor' element={<SubDoctor />} />
        <Route path='doctor-search' element={<DoctorSearch />} />
        <Route path='instrument' element={<Instrument />} />
        <Route path='instrument/:name' element={<SubInstrument />} />
        <Route path='sign-in' element={<Authentication />} />
        <Route path = 'posts' element={<DoctorPost />} />

        <Route path='user-info' element={<UserInfo />} />
        <Route path='download' element={<Download />} />
        <Route path='health-check' element={<HealthCheck />} />
      </Route>
    </Routes>
  );
}

export default App;
