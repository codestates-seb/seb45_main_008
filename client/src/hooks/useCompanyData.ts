import { useQuery } from "react-query";
import axios from "axios";

const BASE_URL = "http://ec2-13-125-246-160.ap-northeast-2.compute.amazonaws.com:8080";

// 커스텀 훅 정의
function useCompanyData(startCompanyId: number, endCompanyId: number) {
  const fetchData = async (companyId: number) => {
    const url = `${BASE_URL}/companies/${companyId}`;
    const response = await axios.get<CompanyData>(url);
    return response.data;
  };

  // companyId 범위에 대한 배열 생성
  const companyIds = Array.from({ length: endCompanyId - startCompanyId + 1 }, (_, index) => startCompanyId + index);

  // 리액트-쿼리의 useQuery 훅 사용
  const { data, isLoading, isError } = useQuery<CompanyData[]>(
    "companyData",
    async () => {
      const promises = companyIds.map((companyId) => fetchData(companyId));
      return Promise.all(promises);
    },
    {
      staleTime: Infinity,
    }
  );

  // 필요한 데이터 추출 및 저장
  const extractedData = data?.map((company) => {
    return {
      companyId: company.companyId,
      code: company.code,
      korName: company.korName,
      stockPrice: company.stockInfResponseDto.stck_prpr,
      stockChangeAmount: company.stockInfResponseDto.prdy_vrss,
      stockChangeRate: company.stockInfResponseDto.prdy_ctrt,
    };
  });

  return {
    data: extractedData,
    isLoading,
    isError,
  };
}

export default useCompanyData;

// 데이터 타입 정의
type CompanyData = {
  companyId: number;
  code: string;
  korName: string;
  stockInfResponseDto: {
    stck_prpr: string;
    prdy_vrss: string;
    prdy_ctrt: string;
  };
};
