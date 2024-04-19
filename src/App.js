import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/Auth/Register";
import LoadingScreen from "./components/LoadingScreen";
import { useAuth } from "./context/authContext";
import Login from "./pages/Auth/Login";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import ChangePassword from "./pages/Auth/ChangePassword";
import VerifyEmail from "./pages/Auth/VerifyEmail";
import AuthAction from "./pages/Auth/AuthAction";
import KycForm from "./pages/Auth/KYC";
import Skeleton from "./components/Skeleton";
import WelcomePage from "./pages/Auth/WelcomePage";

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
          <Route path="/auth-action" element={<AuthAction />} />
            <Route path="/welcome-page" element={<WelcomePage />} />
          <Route path="/" element={<Skeleton />}>
            <Route path="/kyc-form" element={<KycForm />} />
          </Route>
        </Routes>
      </Router>
      {loadingAuthState && <LoadingScreen />}
    </div>
  );
}

export default App;
