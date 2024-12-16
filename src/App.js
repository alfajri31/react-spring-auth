import React from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Dashboard from "./component/Dashboard.js";
import Login from "./component/Login.js";
import "bootstrap/dist/css/bootstrap.min.css"
import "./App.scss"
import {AuthProvider} from "./global/AuthContext";

function App() {
  return (
      <AuthProvider>
          <Router>
              <Routes>
                  <Route path="/" element={<Login />} />
                  <Route path="/dashboard" element={<Dashboard />} />
              </Routes>
          </Router>
      </AuthProvider>
  );
}

export default App;
