import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Main from "../components/Main";
import Signup from "../components/Signup";
import Search from "../components/Search";
import Login from "../components/Login";
import UserPlants from "../components/UserPlants";
import "./App.css";
import { isLoggedIn } from "../helpers/helpers";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    async function checkLoginStatus() {
      const status = await isLoggedIn();
      setLoggedIn(status);
    }

    checkLoginStatus();
  }, []);

  return (
    <div className="App">
      <Header loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
      <Routes>
        <Route exact path="/" element={<Main />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/search" element={<Search />} />
        <Route path="/plants" element={<UserPlants />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
