import axios from "axios";
import { useState, useEffect } from "react";

export const DetailStockInformation: React.FC = () => {
  const MarketServerUrl =
    "http://ec2-13-125-246-160.ap-northeast-2.compute.amazonaws.com:8080/companies/1";

  const [DetailStock, setDetailStock] = useState<any>({});

  const DetailStockDataFromServer = async () => {
    try {
      const response = await axios.get(MarketServerUrl);
      const DetailStocks = response.data;
      setDetailStock(DetailStocks);
      console.log(DetailStock, "ds");
    } catch (error) {
      console.error("데이터 가져오기 중 오류 발생:", error);
    }
  };
  useEffect(() => {
    DetailStockDataFromServer();
  }, []);

  return (
    <div>
      <img src="https://www.samsung.com/sec/static/_images/gnb/logo-gnb.svg" />
      {DetailStock.korName}
    </div>
  );
};
