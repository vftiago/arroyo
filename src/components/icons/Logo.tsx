import React from "react";
import { DEFAULT_LOGO_SIZE } from "../../theme";

const Logo = ({ fill = "white", size = DEFAULT_LOGO_SIZE }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 102 144" fill={fill} height={size} width={size}>
      <g data-name="Layer 2">
        <g className="cls-1" data-name="Rectangle 2">
          <g data-name="Rectangle 2">
            <path d="M0 0v126a18 18 0 0018 18h6V0z" className="cls-2"></path>
            <path d="M24 0H0v126a18 18 0 0018 18h6V0z" className="cls-2"></path>
          </g>
        </g>
        <g className="cls-1" data-name="Rectangle 2">
          <g data-name="Rectangle 2">
            <path d="M96 0H102V24H96z" className="cls-2"></path>
            <path d="M102 0L96 0 96 24 102 24 102 0 102 0z" className="cls-2"></path>
          </g>
        </g>
        <g className="cls-1" data-name="Rectangle 2">
          <g data-name="Rectangle 2">
            <path d="M90 0a18 18 0 00-18 18v126h6a18 18 0 0018-18V0z" className="cls-2"></path>
            <path d="M96 0h-6a18 18 0 00-18 18v126h6a18 18 0 0018-18V0z" className="cls-2"></path>
          </g>
        </g>
      </g>
    </svg>
  );
};

export default Logo;
