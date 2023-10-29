import { useQuery } from "react-query";
import axios from "axios";

export function useGetMemberInfo() {
  return useQuery(["member"], async () => {
    const accessToken = localStorage.getItem("accessToken");

    const response = await axios.get(
      `http://ec2-3-34-137-99.ap-northeast-2.compute.amazonaws.com:8080/members`,
      {
        headers: {
          Authorization: `${accessToken}`,
        },
      }
    );

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Failed to fetch member data");
    }
  });
}
