import { styled } from "styled-components";

// dummyData
const dummyPrice: dummyProps[] = [
  { price: 190, changeRate: 90, volume: 500 },
  { price: 180, changeRate: 80, volume: 120 },
  { price: 170, changeRate: 70, volume: 78 },
  { price: 160, changeRate: 60, volume: 55 },
  { price: 150, changeRate: 50, volume: 91 },
  { price: 140, changeRate: 40, volume: 300 },
  { price: 130, changeRate: 30, volume: 10 },
  { price: 120, changeRate: 20, volume: 80 },
  { price: 110, changeRate: 10, volume: 40 },
  { price: 100, changeRate: 0, volume: 180 },
  { price: 90, changeRate: -10, volume: 250 },
  { price: 80, changeRate: -20, volume: 1000 },
  { price: 70, changeRate: -30, volume: 900 },
  { price: 60, changeRate: -40, volume: 850 },
  { price: 50, changeRate: -50, volume: 154 },
  { price: 40, changeRate: -60, volume: 820 },
  { price: 30, changeRate: -70, volume: 1100 },
  { price: 20, changeRate: -80, volume: 800 },
  { price: 10, changeRate: -90, volume: 500 },
  { price: 5, changeRate: -95, volume: 800 },
];
const upperPriceVolumeSum = 1000;
const lowerPriceVolumeSum = 2000;
//

const StockPrice = () => {
  return (
    <Container>
      <HighFigure></HighFigure>
      <PriceList>
        {dummyPrice.map((item, idx) => (
          <PriceInfo
            upperPriceVolumeSum={upperPriceVolumeSum}
            lowerPriceVolumeSum={lowerPriceVolumeSum}
            key={item.price}
            index={idx}
            price={item.price}
            changeRate={item.changeRate}
            volume={item.volume}
          />
        ))}
      </PriceList>
      <LowerFigure></LowerFigure>
    </Container>
  );
};

export default StockPrice;

const PriceInfo = (props: PriceInfoProps) => {
  const {
    upperPriceVolumeSum,
    lowerPriceVolumeSum,
    index,
    price,
    changeRate,
    volume,
  } = props;

  const changeRateText01: string = changeRate > 0 ? "+" : "";
  const changeRateText02: string = "%";

  return (
    <InfoContainer index={index}>
      <Price>
        <div className="price">{price}</div>
        <div className="changeRate">
          {changeRateText01}
          {changeRate}
          {changeRateText02}
        </div>
      </Price>
      <Volume index={index}>
        <div className="volume">{volume}</div>
        <VolumePercentge
          index={index}
          volume={volume}
          upperPriceVolumeSum={upperPriceVolumeSum}
          lowerPriceVolumeSum={lowerPriceVolumeSum}
        />
      </Volume>
    </InfoContainer>
  );
};

// dummy 관련 변수
interface dummyProps {
  price: number;
  changeRate: number;
  volume: number;
}

interface PriceInfoProps {
  upperPriceVolumeSum: number;
  lowerPriceVolumeSum: number;
  index: number;
  price: number;
  changeRate: number;
  volume: number;
}

interface InfoContainerProps {
  index: number;
}

interface VolumeProps {
  index: number;
}

interface VolumePercentageProps {
  index: number;
  volume: number;
  upperPriceVolumeSum: number;
  lowerPriceVolumeSum: number;
}

// component 생성
const Container = styled.div`
  width: 40%;
  height: 100%;
  margin-right: 16px;
`;

const HighFigure = styled.div`
  width: 100%;
  height: 32px;
  border-bottom: 1px solid black;
`;

const PriceList = styled.ul`
  width: 100%;
  height: 348px;
  padding: 0px;
  border-bottom: 1px solid black;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const InfoContainer = styled.div<InfoContainerProps>`
  width: 100%;
  height: 36px;
  margin-bottom: 2px;
  background-color: ${(props) => (props.index > 9 ? "#FDE8E7" : "#E7F0FD")};
  display: flex;
  flex-direction: row;
`;

const Price = styled.div`
  width: 50%;
  display: flex;
  padding-right: 8px;
  flex-direction: column;
  align-items: flex-end;

  .price {
    font-size: 14px;
    font-weight: 400;
    padding-top: 1px;
  }

  .changeRate {
    font-size: 12px;
    font-weight: 400;
    color: #e22926;
    padding-top: 1px;
  }
`;

const Volume = styled.div<VolumeProps>`
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
  font-size: 12px;
  color: ${(props) => (props.index < 10 ? "#2679ed" : "#e22926")};

  .volume {
    height: 100%;
    display: flex;
    align-items: center;
    padding-right: 8px;
  }
`;

const VolumePercentge = styled.span<VolumePercentageProps>`
  width: ${(props) =>
    (props.volume /
      (props.index < 10
        ? props.upperPriceVolumeSum
        : props.lowerPriceVolumeSum)) *
    100}%;

  height: 2px;
  background-color: ${(props) => (props.index < 10 ? "#2679ed" : "#e22926")};
`;

const LowerFigure = styled.div`
  width: 100%;
  height: 32px;
`;
