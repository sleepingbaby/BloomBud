import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkLoginStatus() {
      const status = await isLoggedIn();
      setLoggedIn(status);
      setLoading(false);
    }

    checkLoginStatus();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <div className="App">
        <Header loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/search" element={<Search loggedIn={loggedIn} />} />
          <Route path="/plants" element={<UserPlants loggedIn={loggedIn} />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
