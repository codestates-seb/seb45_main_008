import { useQuery } from "react-query";
import axios from "axios";

const useGetCompanyList = () => {
  const { data, isLoading, error } = useQuery("companyList", getCompanyList, {});

  return { companyList: data, isLoading, error };
};

export default useGetCompanyList;

// 서버에서 Company 목록 fetch 하는 함수
const getCompanyList = async () => {
  const res = await axios.get("http://ec2-13-125-246-160.ap-northeast-2.compute.amazonaws.com:8080/companies");
  const companyList = res.data;

  return companyList;
};
