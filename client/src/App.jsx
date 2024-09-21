import axios from "axios";
import { Route, Routes, Navigate } from "react-router-dom";
import { UserContextProvider } from "../context/userContext";
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

axios.defaults.baseURL = import.meta.env.VITE_BACKEND_BASEURL;
axios.defaults.withCredentials = true;

function App() {

  return (
    <div className="App">
      <UserContextProvider>
        <Navbar />
        <Toaster position="bottom-right" toastOptions={{ duration: 2000 }} />
        <Routes>
          <Route
            path="/Dashboard"
            element={<Dashboard />}
          />
          <Route path="/RecipeGenerator" element={<RecipeGenerator />} />
          <Route path="/Account" element={<Account />} />
          <Route path="/Login" element={<LoginPage />} />
          <Route path="/Register" element={<RegisterPage />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </UserContextProvider>
    </div>
  );
}

export default App;
