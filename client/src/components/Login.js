import React, { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const headers = {
        "Content-Type": "application/json",
      };

      const response = await fetch("http://localhost:3001/users/login", {
        method: "POST",
        headers: headers,
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });

      if (response.ok) {
        window.location.replace("/");
      } else {
        alert("Failed to login. Please check your credentials and try again.");
      }
    } catch (err) {
      console.error({ message: err });
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center h-100">
      <div className="auth d-flex">
        <form
          className="auth-left d-flex flex-column justify-content-center align-items-center "
          onSubmit={handleSubmit}
        >
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-secondary">
            Sign In
          </button>
        </form>
        <div className="auth-right">
          <h5>Don't Have an Account?</h5>
          <a className="nav-link text-secondary" href="/signup">
            Sign Up
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
