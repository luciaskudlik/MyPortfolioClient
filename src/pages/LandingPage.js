import React from "react";
import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <div id="landing-page">
      <Link to={"/signup"}>
        <button className="landing-btn">Get started</button>
      </Link>
      <Link to={"/home"}>
        <button className="landing-btn">Explore</button>
      </Link>
    </div>
  );
}

export default LandingPage;
