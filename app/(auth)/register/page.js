"use client";

import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
export default function Signup() {
  const {  error, signup } = useAuth();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
 
  const handleSubmit = (e) => {
    e.preventDefault();
    signup(username, email, password);
  };

  return (
    <div
      className="container bg-light col-md-6"
      style={{ marginTop: "10%", padding: "35px" }}
    >
      <h3 className="text-center text-primary">Register</h3>
      <div className="text-danger">{error}</div>
      <form onSubmit={handleSubmit}>
        <div>{error}</div>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
         
          />
        </div>
        <div className="mb-3">
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
        </div>
        <div class="mb-3">
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
        </div>
        <div class="d-grid gap-2">
          <input
            type="submit"
            value="Register"
            className="btn btn-primary mt-2"
          />
        </div>
      </form>
    </div>
  );
}
