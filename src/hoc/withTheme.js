import React from "react";

function withTheme(WrappedComonent, mode) {
  const darkModeStyle = {
    background: "black",
    color: "white",
  };

  const lightModeStyle = {
    background: "white",
    color: "black",
  };

  const styleToApply = mode === "dark" ? darkModeStyle : lightModeStyle;

  return function (props) {
    return <WrappedComonent {...props} style={styleToApply} />;
  };
}

export default withTheme;
