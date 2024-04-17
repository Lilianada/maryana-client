import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/Auth/Register";
import LoadingScreen from "./components/LoadingScreen";
import { useAuth } from "./context/authContext";
import Login from "./pages/Auth/Login";
import ForgotPassword from "./pages/Auth/ForgotPassword";

function App() {
  const { loadingAuthState } = useAuth();
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/sign-up" element={<Register />} />
          <Route path="/" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Routes>
      </Router>
      {loadingAuthState && <LoadingScreen />}
    </div>
  );
}

export default App;
