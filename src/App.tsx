
import { ProtectedRoute } from './components/ProtectedRoute/ProtectedRoute'
import BaseScreenTimeline from "./Screens/BaseTimelineScreen/BaseScreenTimeline"
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import ProfileScreen from "./Screens/ProfileScreen/ProfileScreen";
import SingInScreen from "./Screens/SingInScreen/SingInScreen";
import LoginScreen from "./Screens/LoginScreen/LoginScreen";
import NewProject from "./Screens/NewProject/NewProject";
import EditProfile from './Screens/EditProfile/EditProfile';
import ProjectProfile from './Screens/ProjectProfile/ProjectProfile';
import EditProject from './Screens/EditProject/EditProject';




function App() {
 
  return (
      <BrowserRouter>

        <Routes>
          <Route path="/profile" element={<ProtectedRoute path="/profile" element={<ProfileScreen />} />} />
          <Route path="/cadastro" element={<SingInScreen />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path='/criarProjeto' element={<NewProject />} />
          <Route path='/projectProfile/:id' element={<ProjectProfile />} />
          <Route path='/editProject/:id' element={<EditProject />} />
          <Route path="/editProfile/*" element={<ProtectedRoute path="/" element={<EditProfile />} />} />
          <Route path="/timeline/*" element={<ProtectedRoute path="/" element={<BaseScreenTimeline />} />} />
       </Routes>
      
       </BrowserRouter>
     
  )
}

export default App
