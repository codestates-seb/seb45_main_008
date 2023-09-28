import { useState } from "react";
import { styled } from "styled-components";
import useCompanyData from "../../hooks/useCompanyData";
import CompareList from "./CompareList";
import IconImg from "../../asset/icon/CentralSectionMenu-compareChart.png";

const buttonText: string = "비교종목";

const CompareChartBtn = () => {
  const { data: companyList } = useCompanyData(1, 14);
  const [compare, setCompare] = useState(false);

  const handleOnCompareList = () => {
    setCompare(true);
  };

  const handleOffCompareList = () => {
    setCompare(false);
  };

  return (
    <Container>
      <div className="compareButtonContainer">
        <Icon src={IconImg} />
        <div className="compareButton" onMouseOver={handleOnCompareList} onMouseLeave={handleOffCompareList}>
          {buttonText}
        </div>
      </div>
      {compare && (
        <CompareContainer onMouseOver={handleOnCompareList} onMouseLeave={handleOffCompareList}>
          <StockList>
            {companyList?.map((company) => {
              const corpName = company.korName;
              const companyId = company.companyId;

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
  position: relative;
  z-index: 1;
`;

const StockList = styled.div`
  position: absolute;
  right: 0;
  top: 20px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  font-size: 12px;
  font-weight: 500;
  line-height: 147%;

  width: 92px;
  height: 260px;
  padding: 5px;
  border-radius: 0.4rem;
  z-index: 2;
  border: none;
  color: #b7b5b5;
  background-color: #bfdaf6e8;
  opacity: 0.65;
`;
