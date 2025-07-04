import React from "react";
import NavBar from "../components/NavBar";
import Login from "../components/Login";
import Particle from "../config/Particle";
import "../components/style.css";

function LoginPage() {
  return (
    <div style={{ position: "relative", height: "100vh", overflow: "hidden" }}>
      {/* Particle Background */}
      <div className="particle">
        <Particle />
      </div>

      {/* Foreground Content */}
      <div style={{ position: "relative", zIndex: 1 }}>
        <NavBar />
        <Login />
      </div>
    </div>
  );
}

export default LoginPage;
