import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/Auth/Register";
import LoadingScreen from "./components/LoadingScreen";
import { useAuth } from "./context/authContext";
import Login from "./pages/Auth/Login";

function App() {
  const { loadingAuthState } = useAuth();
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/sign-up" element={<Register />} />
          <Route path="/" element={<Login />} />
        </Routes>
      </Router>
      {loadingAuthState && <LoadingScreen />}
    </div>
  );
}

export default App;
