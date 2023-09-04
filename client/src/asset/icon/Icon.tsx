import React from "react";
import myImage from "./dot_Icon.png"; // 이미지 파일 import
import styled from "styled-components";
export const DotIcon: React.FC = () => {
  return (
    <div>
      <DotImg src={myImage} alt="My Image" />
    </div>
  );
};

const DotImg = styled.img`
  transform: scale(0.4, 0.4);
  margin-right: 15px;
  margin-top: -10px;
  margin-bottom: -30px;
  cursor: pointer;
`;
