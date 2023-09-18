// TokenHandler.tsx

import React, { useEffect } from 'react';
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { setLoginState } from "../../reducer/member/loginSlice";

const TokenHandler: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const accessToken = urlParams.get("access_token");
        const refreshToken = urlParams.get("refresh_token");

        if (accessToken && refreshToken) {
            localStorage.setItem("accessToken", `Bearer ${accessToken}`);
            localStorage.setItem("refreshToken", refreshToken);
            dispatch(setLoginState());
            navigate('/');
        }
    }, [dispatch, navigate]);

    return null; // 이 컴포넌트는 UI를 렌더링하지 않습니다.
};

export default TokenHandler;
