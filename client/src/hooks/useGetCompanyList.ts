import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useGetCompanyList = () => {
  const { data, isLoading, error } = useQuery(["companyList"], getCompanyList, {});

  return { companyList: data, compnayListLoading: isLoading, companyListError: error };
};

export default useGetCompanyList;

// 서버에서 Company 목록 fetch 하는 함수
const getCompanyList = async () => {
  const res = await axios.get("http://ec2-13-125-246-160.ap-northeast-2.compute.amazonaws.com:8080/companies");
  const companyList = res.data;

  return companyList;
};

/*
비동기처리에 특화되어있다 -> ?
서버에서 데이터를 받아와서 -> react 화면을 그리거나, 어떤 로직을 처리
-> 비동기적으로 이루어진다 

1.server데이터 바아오기 (axios) -> 통신 -> 서버와 상호작용한다 -> delay 
2.받아온 데이터로 작업 처리 => undefined 

해결하기 위해서
async await
promise then
// 비동기 처리의 핵심은
1. 서버 데이터를 완전히 받아온 다음에 -> 이걸 써야하고 => then / async await
 - 서버 데이터 받아오기
 - 로딩 인디케이터 true
 - 서버 데이터 다 받아왔다면
 - 로딩 인디케이터 false 만들기 
2. 서버 데이틀 받아오는 과정 중에는 -> 어떤 loading indicator 처리를 보통 하고 (ux 요소를 위해서) => loading 처리
3. if error 가 발생했ㅇ르 때는 이를 처리할 코드가 필요하다 
-> try/catch문을 써서 두가지 케이슬 ㄹ분기한다 



*/
