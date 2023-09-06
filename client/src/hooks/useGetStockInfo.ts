import { useQuery } from "react-query";
import axios from "axios";

const useGetStockInfo = (companyId: number) => {
  const { data, isLoading, error } = useQuery(`stockInfo${companyId}`, () => getStockInfo(companyId), {});

  return { data, isLoading, error };
};

const getStockInfo = async (companyId: number) => {
  const res = await axios.get(`http://ec2-13-125-246-160.ap-northeast-2.compute.amazonaws.com:8080/companies/${companyId}`);
  const stockInfo = res.data;
  return stockInfo;
};

export default useGetStockInfo;

interface StockOverviewProps {
  companyId: number;
  code: string;
  korName: string;
  stockAsBiResponseDto: StockPriceProps;
  stockInfResponseDto: StockInfoProps;
}

interface StockPriceProps {
  stockAsBiId: number;
  companyId: number;
  askp1: string;
  askp2: string;
  askp3: string;
  askp4: string;
  askp5: string;
  askp_rsqn1: string;
  askp_rsqn2: string;
  askp_rsqn3: string;
  askp_rsqn4: string;
  askp_rsqn5: string;
  bidp1: string;
  bidp2: string;
  bidp3: string;
  bidp4: string;
  bidp5: string;
  bidp_rsqn1: string;
  bidp_rsqn2: string;
  bidp_rsqn3: string;
  bidp_rsqn4: string;
  bidp_rsqn5: string;
}

interface StockInfoProps {
  stockInfId: number;
  companyId: number;
  stck_prpr: string;
  prdy_vrss: string;
  prdy_ctrt: string;
  acml_vol: string;
  acml_tr_pbmn: string;
}
