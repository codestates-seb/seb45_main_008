import { useQuery } from "react-query";
import axios from "axios";

const useGetCompanyList = () => {
  const { data, isLoading, error } = useQuery("companyList", getCompanyList, {
    staleTime: Infinity,
    cacheTime: Infinity,
  });

  return { companyList: data, compnayListLoading: isLoading, companyListError: error };
};

export default useGetCompanyList;

const getCompanyList = async () => {
  const res = await axios.get("http://ec2-13-125-246-160.ap-northeast-2.compute.amazonaws.com:8080/companies");
  const companyList = await res.data;

  return companyList;
};
