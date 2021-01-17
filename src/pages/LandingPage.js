import React from "react";
import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <div id="landing-page">
      <p>
        Connect with other developers and share your portfolio with companies - all in one place.
      </p>
      <div>
        <Link to={"/signup"}>
          <button className="landing-btn">Get started</button>
        </Link>
        <Link to={"/home"}>
          <button className="landing-btn">Explore</button>
        </Link>
      </div>
    </div>
  );
}

export default LandingPage;
