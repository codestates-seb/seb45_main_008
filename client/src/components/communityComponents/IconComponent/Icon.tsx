import React from "react";
import myImage from "../../../asset/icon/dot_Icon.png"; // 이미지 파일 import
import styled from "styled-components";
import "boxicons";
export const DotIcon: React.FC = () => {
  return (
    <div>
      <DotImg src={myImage} alt="My Image" />
    </div>
  );
};
export const MarketImages = () => {
  return (
    <>
      <link
        href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css"
        rel="stylesheet"
      />

      <Market className="bx bx-store-alt"></Market>
    </>
  );
};

export const InfoImages = () => {
  return (
    <>
      <link
        href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css"
        rel="stylesheet"
      />
      <InfoImage className="bx bx-info-circle"></InfoImage>
    </>
  );
};

export const CommunityImages = () => {
  return (
    <>
      <link
        href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css"
        rel="stylesheet"
      />
      <CommunityImage className="bx bx-message-dots"></CommunityImage>
    </>
  );
};
export const InvestImage = () => {
  return (
    <>
      <link
        href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css"
        rel="stylesheet"
      />
      <InvestImages className="bx bxs-pie-chart-alt-2"></InvestImages>
    </>
  );
};

export const ProFileImage = () => {
  return (
    <>
      <link
        href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css"
        rel="stylesheet"
      />

      <ProFileImages className="bx bxs-doughnut-chart"></ProFileImages>
    </>
  );
};

const ProFileImages = styled.i`
  font-size: 20px;
  position: relative;
  margin-left: 6px;

  width: 45px;
  top: 10px;
  &:after {
    content: "StockHolm";
    font-size: 8px;
    position: absolute;
    top: 23px;
    left: -13px;
  }
  color: rgba(205, 140, 150, 0.4);
`;
const InvestImages = styled.i`
  font-size: 18px;
  color: #2d4f51;
  vertical-align: bottom;
  margin-right: 3px;
`;
const CommunityImage = styled.i`
  font-size: 18px;
  color: #2d4f51;
  vertical-align: bottom;
  margin-right: 3px;
`;
const InfoImage = styled.i`
  font-size: 18px;
  color: #2d4f51;
  vertical-align: bottom;
  margin-right: 3px;
`;
const Market = styled.i`
  margin-right: 2px;
  font-size: 18px;
  color: #2d4f51;
  vertical-align: bottom;
`;
const DotImg = styled.img`
  transform: scale(0.4, 0.4);
  margin-right: 15px;
  margin-top: -10px;
  margin-bottom: -30px;
  cursor: pointer;
`;
