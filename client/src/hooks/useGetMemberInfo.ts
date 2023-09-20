import { useQuery } from "react-query";
import axios from "axios";

export function useGetMemberInfo() {

  return useQuery(["member"], async () => {
    const accessToken = sessionStorage.getItem("accessToken"); // 로컬 스토리지에서 AuthToken 가져오기

    const response = await axios.get(`http://ec2-13-125-246-160.ap-northeast-2.compute.amazonaws.com:8080/members`, {
      headers: {
        Authorization: `${accessToken}`, // 헤더에 토큰 추가
      },
    });

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Failed to fetch member data");
    }
  });
}
