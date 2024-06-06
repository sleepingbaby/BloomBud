import React, { useState } from "react";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const headers = {
        "Content-Type": "application/json",
      };

      const response = await fetch("http://localhost:3001/users/signup", {
        method: "POST",
        headers: headers,
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });

      if (response.ok) {
        alert("Signup successful! Redirecting to login page...");
        setTimeout(() => {
          window.location.replace("/login");
        }, 1000);
      } else {
        alert("Failed to signup. Please check your credentials and try again.");
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
              required
              className="form-control"
              id="exampleInputPassword1"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Confirm Password
            </label>
            <input
              type="password"
              required
              className="form-control"
              id="exampleInputconfirmPassword1"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-secondary">
            Sign Up
          </button>
        </form>
        <div className="auth-right">
          <h5>Already Have an Account?</h5>
          <a className="nav-link text-secondary" href="/signup">
            Login
          </a>
        </div>
      </div>
    </div>
  );
};

export default Signup;
