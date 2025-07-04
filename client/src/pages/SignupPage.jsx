import React from "react";
import NavBar from "../components/NavBar";
import SignUp from "../components/SignUp";
import Particle from "../config/Particle";
import "../components/style.css";

function SignupPage() {
  return (
    <div className="signup-page">
      <Particle />
      <NavBar />
      <div className="signup-form-wrapper">
        <SignUp />
      </div>
    </div>
  );
}

export default SignupPage;
