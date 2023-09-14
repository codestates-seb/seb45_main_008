//import { TabNavArea } from "./TabNavArea";
import PortFolioChart from "./portFolioChart";
import styled from "styled-components";
export const Status = () => {
  return (
    <PortFolioContainer>
      <div>
        {portText.memberId}
        <br />
        {portText.TotalAssets}
        {portText.TotalAssetsCount}
        <br />

        {portText.TotalCash}
        {portText.RemainingCash}
        <br />
        {portText.stockValueation}
        {portText.stockValue}
      </div>
      <PortFolioChart></PortFolioChart>
    </PortFolioContainer>
  );
};

const portText = {
  memberId: "meberId",
  TotalAssets: "총 평가자산",
  TotalAssetsCount: "508,279,955원",
  TotalCash: "보유현금 :",
  RemainingCash: "8,279,955원",
  stockValueation: "주식평가금",
  stockValue: "62,457,076원",
};

const PortFolioContainer = styled.div`
  max-height: 600px;
`;
