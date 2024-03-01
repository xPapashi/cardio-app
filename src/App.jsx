import Navbar from "./Navbar";

import Home from "./pages/Home";
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
          <Route path="/" element={<Home />} />
          <Route path="/RecipeGenerator" element={<RecipeGenerator />} />
          <Route path="/Account" element={<Account />} />
        </Routes>
      </div>
    </>
  );
}

export default App;