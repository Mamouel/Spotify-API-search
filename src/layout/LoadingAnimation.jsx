import React from "react";
import "../style/loading-animation.scss";

const LoadingAnimation = () => {
  return (
    <div className="sk-chasing-dots">
      <div className="sk-child sk-dot1"></div>
      <div className="sk-child sk-dot2"></div>
    </div>
  );
};

export default LoadingAnimation;