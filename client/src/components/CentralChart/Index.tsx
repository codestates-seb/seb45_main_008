import { useSelector } from "react-redux";
import { StateProps } from "../../models/stateProps";
import useGetStockData from "../../hooks/useGetStockData";
import useGetStockInfo from "../../hooks/useGetStockInfo";
import { styled } from "styled-components";
import { PuffLoader } from "react-spinners";
import UpperMenuBar from "../CentralChartMenu/Index";
import StockChart from "./StockChart";

const loadingText = "로딩 중...";
const errorText = "화면을 불러올 수 없습니다";

const CentralChart = () => {
  const companyId = useSelector((state: StateProps) => state.companyId);
  const { stockInfoLoading, stockInfoError } = useGetStockInfo(companyId);
  const { stockPriceLoading, stockPriceError } = useGetStockData(companyId);

  if (stockPriceLoading || stockInfoLoading) {
    return (
      <LoadingContainer>
        <div className="loading">
          <PuffLoader color="#2679ed" />
          <div className="loadingText">{loadingText}</div>
        </div>
      </LoadingContainer>
    );
  }

  if (stockPriceError || stockInfoError) {
    return <ErrorContainer>{errorText}</ErrorContainer>;
  }

  return (
    <Container>
      <UpperMenuBar />
      <StockChart />
    </Container>
  );
};

export default CentralChart;

const Container = styled.div`
  flex: 6.7 0 0;
  min-width: 630px;
  height: 100%;

  display: flex;
  flex-direction: column;
`;

const LoadingContainer = styled.div`
  flex: 6.7 0 0;
  min-width: 630px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 20px;
  font-weight: 500;
  color: #999999;

  .loading {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .loadingText {
      margin-top: 20px;
      color: #9999;
    }
  }
`;

const ErrorContainer = styled(LoadingContainer)``;
