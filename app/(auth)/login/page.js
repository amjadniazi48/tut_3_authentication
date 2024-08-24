"use client";
import React from "react";
import Link from "next/link";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
const Login = () => {
  const { error, message, login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };
  return (
    <>
      <div
        className="container bg-light col-md-6"
        style={{ marginTop: "10%", padding: "35px" }}
      >
        <h3 className="text-center text-primary">Login</h3>
        {message ? <div className="text-success">{message}</div> : ""}
        <div className="text-danger">{error}</div>
        <form onSubmit={handleSubmit}>
          <div class="mb-3">
            <input
              type="email"
              className="form-control"
              id="exampleFormControlInput1"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div class="mb-3">
            <input
              type="password"
              id="inputPassword6"
              className="form-control"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div class="d-grid gap-2">
            <input
              type="submit"
              value="Login"
              className="btn btn-primary mt-2"
            />
          </div>
        </form>
        <p>
          <Link
            href="/register"
            class="link-primary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover "
          >
            Register with Us
          </Link>
        </p>
      </div>
    </>
  );
};
export default Login;
