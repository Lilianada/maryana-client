
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/Auth/Register";

function App() {
  return (
    <div className="App">
      <Router>
            <Routes>
              <Route
                path="/dashboard/"
                element={
                  <Register/>
                }
              >
                </Route>
              </Routes>
            </Router>
    </div>
  );
}

export default App;
