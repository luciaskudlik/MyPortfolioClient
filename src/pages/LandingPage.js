import React from "react";
import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <div id="landing-page">
      <Link to={"/signup"}>
        <button>Get started for free</button>
      </Link>
      <Link to={"/home"}>
        <button>Explore</button>
      </Link>
    </div>
  );
}

export default LandingPage;
