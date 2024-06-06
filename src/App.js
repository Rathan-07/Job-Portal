import { Routes, Route, Link } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import Home from "./components/Home";
import Register from "./components/Register";
import Login from "./components/Login";
import Account from './components/Account';
import AddJob from './components/AddJob';
import ApplyJob from './components/ApplyJob';
import { useAuth } from './components/context/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import Unauthorized from './components/Unauthorized';
import ListJobs from './components/ListJobs';
import MyJob from './components/MyJob';
import JobDetail from './components/JobDetail';
import JobApplications from './components/JobApplications';
import SingleApplications from './components/SingleApplication';

function App() {
  const { user, dispatch } = useAuth();


  const conditionalLinks = (path,roles)=>{
    switch(path){
      case '/add-job':{
        if(roles.includes(user?.account?.role)){
          return <Link to={path}>Add Job</Link>
        }
        break;
      }
      case '/apply-job': {
        if (roles.includes(user?.account?.role)) {
          return <Link to={path}>Apply job</Link>;
        }
        break; 
      }
      // 
      default: {
        return null; 
      }
    }
  }
  useEffect(() => {
    if(localStorage.getItem('token')) {
      (async () => {
        try {
          const response = await axios.get('http://localhost:3068/users/account', {
            headers : {
              Authorization: localStorage.getItem('token')
            }
          });
          dispatch({type:"LOGIN", payload:{account:response.data}})
        } catch (error) {
         
        }
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
      <div>
        <h2>Job Portal</h2>
        <Link to="/">Home</Link> |
        <Link to="/list-jobs">List Jobs</Link> | 
            { !user.isLoggedIn ? (
              <>
                <Link to="/register">Register</Link> |
                <Link to="/login"> Login </Link> | 
              </> 
            ): (
              <>
                  <Link to="/account">Account</Link> |
                  <Link to="/my-job">My-job</Link> |
                  {conditionalLinks('/add-job',['admin','recruiter'])}
                  { conditionalLinks('/apply-job', ['admin', 'candidate'])}
                  |
                  <Link to="/" onClick={() => {
                    localStorage.removeItem('token');
                    dispatch({type:"LOGOUT"})
                  }}> Logout </Link> | 
                </> 
            )}
            
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/list-jobs" element={<ListJobs />} /> 
          <Route path='/job-applications/:id' element = {<JobApplications/>}/>
          <Route path='/single-application/:id/applications/:appId' element = {<SingleApplications/>}/>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path='/job-detail/:id' element = {<JobDetail/>}/>
          <Route path="/account" element={<PrivateRoute permittedRoles={['recruiter','candidate']}>
            <Account />
          </PrivateRoute>} />
          <Route path="/add-job" element={<PrivateRoute permittedRoles={['recruiter']}>
            <AddJob />
          </PrivateRoute>} />
          <Route path="/apply-job" element={<PrivateRoute permittedRoles={['candidate']}>
            <ApplyJob /> 
          </PrivateRoute>} />
          <Route path='/my-job' element = {
            <PrivateRoute permittedRoles={['recruiter']}>
              <MyJob/>
            </PrivateRoute>
          }/>

          <Route path='/unauthorized' element={<Unauthorized />} />
        </Routes>
      </div>
  );
}

export default App;
