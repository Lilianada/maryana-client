import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/Auth/Register";
import LoadingScreen from "./components/LoadingScreen";
import { useAuth } from "./context/authContext";
import Login from "./pages/Auth/Login";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import ChangePassword from "./pages/Auth/ChangePassword";
import VerifyEmail from "./pages/Auth/VerifyEmail";

function App() {
  const { loadingAuthState } = useAuth();
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/sign-up" element={<Register />} />
          <Route path="/" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/change-password" element={<ChangePassword />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
        </Routes>
      </Router>
      {loadingAuthState && <LoadingScreen />}
    </div>
  );
}

export default App;
