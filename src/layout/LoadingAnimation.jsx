import React, { Component } from "react";
import "../style/loading-animation.scss";

class LoadingAnimation extends Component {
    render () {
      return (
        <div className="sk-chasing-dots">
          <div className="sk-child sk-dot1"></div>
          <div className="sk-child sk-dot2"></div>
        </div>
      )
    }
}

export default LoadingAnimation;