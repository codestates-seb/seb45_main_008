import stockInfoData from "./StockInfoDummyData";

export const DetailStockInformation: React.FC = () => {
  const stockData = stockInfoData();

  return (
    <div>
      {stockData.map((el) => (
        <div key={el.companyId}>
          {el.companyId === 1 && <span>1</span>}
          {el.companyId === 2 && <span>2</span>}
          {/* 추가적인 조건문을 필요에 따라 여기에 추가할 수 있습니다. */}
        </div>
      ))}
    </div>
  );
};
