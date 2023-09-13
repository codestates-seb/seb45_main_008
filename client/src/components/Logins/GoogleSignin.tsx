import React from "react";
import { GoogleOAuthProvider, GoogleLogin, useGoogleOneTapLogin } from "@react-oauth/google";
import { useDispatch } from "react-redux";
import { setLoginState } from "../../reducer/member/loginSlice";

const GoogleSignIn: React.FC = () => {
  const dispatch = useDispatch(); // Redux의 dispatch 함수를 사용하기 위해 가져옵니다.

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSuccess = (credentialResponse: any) => {
    console.log(credentialResponse);

    const token = credentialResponse.token; // 실제 응답에서 토큰의 경로가 어떤지 확인하고 수정해야 합니다.
    localStorage.setItem("authToken", token); // 토큰을 localStorage에 저장

    // 로그인 성공 시 전역 상태를 업데이트합니다.
    dispatch(setLoginState());
  };

  const handleError = () => {
    console.log("Login Failed");
  };

  // One-tap 로그인 (선택적)
  useGoogleOneTapLogin({
    onSuccess: handleSuccess,
    onError: handleError,
  });

  return (
    <GoogleOAuthProvider
      clientId="
        690344785644-2oj84rcukd2rhu3o56gbq6rahap16m37.apps.googleusercontent.com"
    >
      <GoogleLogin onSuccess={handleSuccess} onError={handleError} useOneTap />
    </GoogleOAuthProvider>
  );
};

export default GoogleSignIn;
