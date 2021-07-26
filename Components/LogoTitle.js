import React from "react";
import styled from "styled-components";
import headerLogo from "../assets/bigheaderLogo.png";

const ImageStyle = styled.Image`
  width: 30%;
  height: 50px;
`;

function LogoTitle() {
  return <ImageStyle source={headerLogo} resizeMode={"contain"} />;
}

export default LogoTitle;
