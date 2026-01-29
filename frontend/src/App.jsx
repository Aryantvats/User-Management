import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Profiles from "./pages/Profiles.jsx";
import AddProfile from "./pages/AddProfile.jsx";
import EditProfile from "./pages/EditProfile.jsx";
import ViewProfile from "./pages/ViewProfile.jsx";
import { Toaster } from "react-hot-toast";

export default function App() {
  return (
    <>
    <Toaster position="top-right" />
    <Routes>

      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} /> 
      <Route path="/profiles" element={<Profiles />} />
      <Route path="/profiles/add" element={<AddProfile />} />
      <Route path="/profiles/edit/:id" element={<EditProfile />} />
      <Route path="/profiles/view/:id" element={<ViewProfile />}/>
      
      </Routes>
    </>
  );
}
