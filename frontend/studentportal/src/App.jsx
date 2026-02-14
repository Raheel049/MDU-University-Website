import './App.css'
import Login from './pages/Auth/login'
import SignUp from './pages/Auth/signUp';
import { Routes, Route } from "react-router-dom"
import Dashboard from './pages/Student/dashboard';
import AuthRoute from './routes/authRoutes';
import PrivateRoute from './routes/privateRoutes';
import OtpVerify from './pages/Auth/otp';
import OtpReset from './pages/Auth/otpReset';
import ForgotPassword from './pages/Auth/forgotPassword';
import Home from './pages/home';
import ComputerScience from './pages/Department/computer-Science';
import AdminDashboard from './pages/Admin/adminDashboard';
import ChangePassword from './pages/Auth/changePassword';
import AdmissionForm from './pages/Student/admission';
// Sirf RegisterManager import karna kaafi hai agar baki dono isme use ho rahe hain
import RegisterManager from './pages/Admin/registerManager';
import AddCourse from './pages/Admin/addCourse';
import AddTeacher from './pages/Admin/addTeacher';
import FetchAllStudent from './pages/Admin/fetchAllStudents';
import AllCourses from './pages/Admin/fetchAllCourses';

function App() {

  return (
    <>
      <Routes>
        {/* Public Routes */}
        <Route path='/' element={<Home />} />
        <Route path='department/computer-Science' element={<ComputerScience />} />

        {/* Auth Routes (Login, SignUp, etc.) */}
        <Route element={<AuthRoute />}>
          <Route path='/login' element={<Login />} />
          <Route path='/signUp' element={<SignUp />} />
          <Route path='/otp' element={<OtpVerify />} />
          <Route path='/otpReset' element={<OtpReset />} />
          <Route path='/forgotPassword' element={<ForgotPassword />} />
          <Route path='/changePassword' element={<ChangePassword />} />
        </Route>

        {/* Private Routes (Dashboard, Admin Tasks) */}
        <Route element={<PrivateRoute />}>  
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path="/adminDashboard" element={<AdminDashboard />} />
          <Route path='/admission' element={<AdmissionForm />} />

          {/* Ab yahan sirf Manager load hoga jo switching handle karega */}
          <Route path="/registerManager" element={<RegisterManager />} />
          <Route path='/addCourse' element={<AddCourse />} />
          <Route path='/addTeacher' element={<AddTeacher />} />
          <Route path='/fetchAllStudents' element={<FetchAllStudent />} />
          <Route path='/fetchAllCourses' element={<AllCourses />} />
        </Route>

      </Routes>
    </>
  )
}

export default App;
