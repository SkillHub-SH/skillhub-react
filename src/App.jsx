import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { authState } from "./recoil";
import { decodeToken } from "react-jwt";
import LandingPage from './pages/LandingPage';
import NotFound from './pages/NotFound';
import SignupUser from './pages/user/SignupUser';
import SigninUser from './pages/user/SigninUser';
import Topics from './pages/user/Topics';
import Problems from './pages/user/Problems';
import Problem from './pages/user/Problem';
import Submittions from './pages/user/Submittions';
import RoadMap from './pages/user/RoadMap';
import LeaderBoard from './pages/user/LeaderBoard';
import Contests from './pages/user/Contests';
import Jobs from './pages/user/Jobs';
import Profile from './pages/user/Profile';
import SignupCompany from './pages/company/SignupCompany';
import SigninCompany from './pages/company/SigninCompany';
import CompanyProblems from './pages/company/Problems';
import CompanyContests from './pages/company/Contests';
import CompanyJobs from './pages/company/Jobs';


function App() {
  const authToken = useRecoilValue(authState);
  const [token, setDecodeToken] = useState("");

  useEffect(() => {
    if (authToken) {
    const decode = decodeToken(authToken);
    setDecodeToken(decode);
    }
  }, [authToken]);

  const RedirectToLogin = () => {
    if (!authToken) return <Navigate to="/" />;
    return <Outlet />;
  };

  const RedirectToApp = () => {
    if (authToken){
      if (token.model === "company"){
        return <Navigate to="/company-problems" />
      }else if (token.model === "developer"){
        return <Navigate to="/topics" />
      }
    }
    return <Outlet />;
  };

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<LandingPage/>} /> 

          <Route element={<RedirectToApp/>}>
            <Route path='/signup' element={<SignupUser/>} /> 
            <Route path='/signin' element={<SigninUser/>} /> 
            <Route path='/signup-company' element={<SignupCompany/>} /> 
            <Route path='/signin-company' element={<SigninCompany/>} /> 
          </Route>
          
          <Route element={<RedirectToLogin/>}>
            {token.model === "developer" && (
              <>
                {/* Developer Routes */}
                <Route path='/topics' element={<Topics/>}/>
                <Route path='/problems/:topicId' element={<Problems/>}/>
                <Route path='/problem/:problemId' element={<Problem/>}/>
                <Route path='/submittions/:developerId' element={<Submittions/>}/>
                <Route path='/roadmap/:topicId' element={<RoadMap/>}/>
                <Route path='/leader-board' element={<LeaderBoard/>}/>
                <Route path='/contests' element={<Contests/>}/>
                <Route path='/jobs' element={<Jobs/>}/>
                <Route path='/profile' element={<Profile/>}/>
              </>
            )}
            
            {token.model === "company" && (
              <>
                {/* Company Routes */}
                <Route path='/company-problems' element={<CompanyProblems/>}/>
                <Route path='/company-contests' element={<CompanyContests/>}/>
                <Route path='/company-jobs' element={<CompanyJobs/>}/>
              </>
            )}
          </Route>

          <Route path="*" element={<NotFound/>} /> 
        </Routes>
      </Router>
    </>
  );
}

export default App;
