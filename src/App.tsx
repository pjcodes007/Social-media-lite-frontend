import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import DoodleBackground from "./components/comps/DoodleBackground";
import Navbar from "./components/comps/Navbar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Feed from "./components/comps/Feed";
import Profile from "./components/comps/Profile";
import Upload from "./components/comps/Upload";

const AppRoutes = () => {
  const location = useLocation();
  const hideNavbar = location.pathname === "/" || location.pathname === "/signup";

  return (
    <>
      <DoodleBackground />
      {!hideNavbar && <Navbar />}

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/feed" element={<Feed/>} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/upload" element={<Upload />} />
      </Routes>
    </>
  );
};

const App = () => (
  <Router>
    <AppRoutes />
  </Router>
);

export default App;
