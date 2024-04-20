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
import ProtectedRoute from "./protectedRoute";
import Dashboard from "./components/Dashboard";
import AccountsOverview from "./pages/Accounts";

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
          <Route path="/onboard" element={<WelcomePage />} />
          <Route path="/dashboard/" element={<Skeleton />}>
            <Route path="kyc-form" element={<KycForm />} />
            <Route
              index
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="my-accounts"
              element={
                <ProtectedRoute>
                  <AccountsOverview />
                </ProtectedRoute>
              }
            />
          </Route>
        </Routes>
      </Router>
      {loadingAuthState && <LoadingScreen />}
    </div>
  );
}

export default App;
