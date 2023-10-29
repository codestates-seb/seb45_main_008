import { useMutation } from "react-query";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setLogoutState } from "../reducer/member/loginSlice";

export function useDeleteMember() {
  const dispatch = useDispatch();

  return useMutation(
    async () => {
      const accessToken = localStorage.getItem("accessToken");
      const response = await axios.delete(
        `http://ec2-3-34-137-99.ap-northeast-2.compute.amazonaws.com:8080/members`,
        {
          headers: {
            Authorization: `${accessToken}`,
          },
        }
      );

      // 상태 코드에 따른 에러 메시지 처리
      switch (response.status) {
        case 204:
          return "Success"; // 혹은 서버에서 제공하는 다른 성공 메시지
        case 400:
          throw new Error(response.data.message || "BAD REQUEST");
        case 404:
          throw new Error("NOT FOUND");
        case 500:
          throw new Error("INTERNAL SERVER ERROR");
        default:
          throw new Error("Unknown error occurred");
      }
    },
    {
      onSuccess: () => {
        // 토큰 삭제
        localStorage.removeItem("accessToken");

        // 로그아웃 상태로 변경
        dispatch(setLogoutState());

        // 페이지 새로고침 (선택사항)
        window.location.reload();
      },
    }
  );
}
