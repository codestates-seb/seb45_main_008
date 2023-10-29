import { useQuery } from "react-query";

type StockAsBiResponseDto = {
  stockAsBiId: number;
  companyId: number;
  askp1: string;
  askp2: string;
  // ... 나머지 필드들
};

type StockInfResponseDto = {
  stockInfId: number;
  companyId: number;
  stck_prpr: string;
  prdy_vrss: string;
  prdy_ctrt: string;
  acml_vol: string;
  acml_tr_pbmn: string;
};

type CompanyResponseDto = {
  companyId: number;
  code: string;
  korName: string;
  stockAsBiResponseDto: StockAsBiResponseDto;
  stockInfResponseDto: StockInfResponseDto;
};

type StarDataItem = {
  starId: number;
  memberId: number;
  companyResponseDto: CompanyResponseDto;
};

type StarData = StarDataItem[];

// : Promise<StarData>

const fetchStarData = async () => {
  const accessToken = localStorage.getItem("accessToken");

  // 로그인 상태에만 관심목록 데이터 호출하도록 설정
  if (accessToken !== null) {
    const res = await fetch(
      "http://ec2-3-34-137-99.ap-northeast-2.compute.amazonaws.com:8080/stars",
      {
        headers: {
          Authorization: `${accessToken}`,
        },
      }
    );

    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.message || "Something went wrong");
    }

    return res.json();
  }
};

const useGetStar = () => {
  return useQuery<StarData, Error>("starData", fetchStarData);
};

export default useGetStar;
