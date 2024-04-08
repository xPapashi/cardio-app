import { Route, Routes } from "react-router-dom";
import axios from "axios";
import { Toaster } from "react-hot-toast";

import Navbar from "./components/Navbar";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import RecipeGenerator from "./pages/RecipeGenerator";
import Account from "./pages/Account";

import "./App.css";
import "./index.css";

axios.defaults.baseURL = "http://localhost:8000";
axios.defaults.withCredentials = true;

function App() {
  return (
    <>
      <div className="App">
        <Navbar />
        <Toaster position="bottom-right" toastOptions={{ duration: 2000 }} />
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/Register" element={<RegisterPage />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/RecipeGenerator" element={<RecipeGenerator />} />
          <Route path="/Account" element={<Account />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
