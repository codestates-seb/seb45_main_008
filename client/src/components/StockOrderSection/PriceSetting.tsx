import { styled } from "styled-components";

const priceSettingTitle: string = "가격";
const specifiedPriceBtnText: string = "지정가";
const marketPriceBtnText: string = "시장가";

const PriceSetting = () => {
  return (
    <Container>
      <PriceCategoryBox>
        <Title>{priceSettingTitle}</Title>
        <ButtonContainer>
          <SepcifiedPriceBtn>{specifiedPriceBtnText}</SepcifiedPriceBtn>
          <MarketPriceBtn>{marketPriceBtnText}</MarketPriceBtn>
        </ButtonContainer>
      </PriceCategoryBox>
      <PriceSettingBox>
        <PriceController />
        <DirectionBox>
          <button className="PriceUp">&#8896;</button>
          <button className="PriceDown">&#8897;</button>
        </DirectionBox>
      </PriceSettingBox>
    </Container>
  );
};

export default PriceSetting;

const Container = styled.div`
  width: 100%;
  margin-top: 16px;
  margin-bottom: 32px;
`;

const PriceCategoryBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 8px;
`;

const Title = styled.div`
  padding-left: 5px;
  font-size: 13px;
  color: #999999;
`;

const ButtonContainer = styled.div`
  width: 105px;
  height: 27px;
  background-color: #ded9d9;
  border-radius: 0.3rem;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const SepcifiedPriceBtn = styled.button`
  width: 50px;
  height: 23px;
  padding: 4px;
  border: none;
  background-color: #ded9d9;
  font-size: 13px;
`;

const MarketPriceBtn = styled(SepcifiedPriceBtn)``;

const PriceSettingBox = styled.div`
  display: flex;
  flex-direction: row;
`;

const PriceController = styled.input`
  flex: 1 0 0;
  height: 30px;
`;

const DirectionBox = styled.div`
  display: flex;
  flex-direction: column;

  & button {
    width: 31px;
    height: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 10px;
  }
`;
