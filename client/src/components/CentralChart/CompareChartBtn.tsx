import { useState } from "react";
import { styled } from "styled-components";
import useCompanyData from "../../hooks/useCompanyData";

import CompareList from "./CompareList";
import IconImg from "../../asset/CentralSectionMenu-compareChart.png";

const buttonText: string = "비교차트";

const CompareChartBtn = () => {
  const { data: companyList } = useCompanyData(1, 14);
  const [compare, setCompare] = useState(false);

  const handleCompareChart = () => {
    setCompare(!compare);
  };

  // console.log(companyList);

  return (
    <Container>
      <div className="compareButtonContainer">
        <Icon src={IconImg} />
        <div className="compareButton" onClick={handleCompareChart}>
          {buttonText}
        </div>
      </div>
      {compare && (
        <CompareContainer>
          <StockList>
            {companyList?.map((company) => {
              const corpName = company.korName;
              const companyId = company.companyId;
              console.log(corpName);

              return <CompareList corpName={corpName} compareCompanyId={companyId} />;
            })}
          </StockList>
        </CompareContainer>
      )}
    </Container>
  );
};

export default CompareChartBtn;

const Container = styled.div`
  position: absolute;

  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;

  padding-top: 10px;
  padding-right: 13px;

  .compareButtonContainer {
    display: flex;
    flex-direction: row;
    z-index: 2;
  }

  .compareButton {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 12px;
    padding-top: 2.5px;
    cursor: pointer;
  }
`;

const Icon = styled.img`
  width: auto;
  height: 18px;
  padding-top: 0.5px;
  padding-right: 3px;
`;

const CompareContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
`;

const StockList = styled.div`
  position: absolute;
  width: 100px;
  height: 300px;
  z-index: 2;

  background-color: white;
`;
