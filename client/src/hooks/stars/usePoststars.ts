import { useMutation } from "react-query";

const postStarData = async (companyId: number) => {
  const accessToken = localStorage.getItem("accessToken");
  const res = await fetch(
    `http://ec2-3-34-137-99.ap-northeast-2.compute.amazonaws.com:8080/stars/?companyId=${companyId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${accessToken}`,
      },
    }
  );

  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.message || "Something went wrong");
  }

  return res.json();
};

const usePostStar = () => {
  return useMutation(postStarData);
};

export default usePostStar;
