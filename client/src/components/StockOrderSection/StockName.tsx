import { styled } from "styled-components";

// dummyData
import logoImg from "../../asset/CentralSectionMenu-dummyImg.png";
const corpName: string = "카카오";
const stockCode: string = "035720";
const marketType: string = "코스피";

const StockName = () => {
  return (
    <Container>
      <CorpLogo src={logoImg} />
      <NameContainer>
        <CorpName>{corpName}</CorpName>
        <StockCode>
          {stockCode} {marketType}
        </StockCode>
      </NameContainer>
    </Container>
  );
};

export default StockName;

const Container = styled.section`
  width: 100%;
  height: 64px;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-top: 16px;
  padding-bottom: 8px;
  padding-left: 16px;
  gap: 9px;
  border-bottom: 1px solid black;
`;

const CorpLogo = styled.img`
  width: 28px;
  height: 28px;
  border-radius: 50%;
`;

const NameContainer = styled.div`
  height: 40px;
  display: flex;
  flex-direction: column;
`;

const CorpName = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: #1c1c1c;
`;
const StockCode = styled.div`
  font-size: 14px;
  color: #999999;
`;
