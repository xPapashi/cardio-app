import Navbar from "./components/Navbar";

import LoginPage from "./pages/LoginPage";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import RecipeGenerator from "./pages/RecipeGenerator";
import Account from "./pages/Account";
import { Route, Routes } from "react-router-dom";

import "./App.css";
import "./index.css";

function App() {
  

  return (
    <>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<LoginPage />} />
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