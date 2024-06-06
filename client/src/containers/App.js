import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Main from "../components/Main";
import Signup from "../components/Signup";
import "./App.css";
import Login from "../components/Login";
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
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
