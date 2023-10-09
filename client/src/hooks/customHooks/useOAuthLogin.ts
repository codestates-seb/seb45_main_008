import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setLoginState } from '../../reducer/member/loginSlice';
import setAutoLogoutAlarm from '../../utils/setAutoLogoutAlarm';
import { secondAlarmTime, lastAlarmTime } from '../../utils/setAutoLogoutAlarm';

const useOAuthLogin = () => {
    const dispatch = useDispatch();

    // 리프레시 토큰을 사용하여 새 엑세스 토큰을 요청하는 함수
    const requestNewAccessToken = async () => {
        const refreshToken = localStorage.getItem("refreshToken");
        try {
            const response = await fetch('http://ec2-13-125-246-160.ap-northeast-2.compute.amazonaws.com:8080/tokens/refresh', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ refreshToken: refreshToken })
            });

            if (response.status !== 201) {
              throw new Error('Failed to fetch new access token');
          }

            const data = await response.json();
            return data.accessToken;
        } catch (error) {
            console.error(error);
            return null;
        }
    };

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const accessToken = urlParams.get('access_token');
        const refreshToken = urlParams.get('refresh_token');

        if (accessToken && refreshToken) {
            localStorage.setItem('accessToken', `Bearer ${accessToken}`);
            localStorage.setItem('refreshToken', refreshToken);

            urlParams.delete('access_token');
            urlParams.delete('refresh_token');
            window.history.replaceState({}, '', '?' + urlParams.toString());

            dispatch(setLoginState()); // 로그인 처리
            setAutoLogoutAlarm(dispatch, 'first', secondAlarmTime, lastAlarmTime);
        } else {
            const storedAccessToken = localStorage.getItem('accessToken');
            const currentTime = Date.now();
            const autoLogoutSecondAlarm = localStorage.getItem('autoLogoutSecondAlarm');
            const autoLogoutLastAlarm = localStorage.getItem('autoLogoutLastAlarm');

            if (storedAccessToken) {
                if (autoLogoutSecondAlarm && currentTime >= parseInt(autoLogoutSecondAlarm) + secondAlarmTime) {
                    requestNewAccessToken().then(newAccessToken => {
                        if (newAccessToken) {
                            localStorage.setItem('accessToken', `Bearer ${newAccessToken}`);
                            dispatch(setLoginState());
                        } else {
                            localStorage.removeItem('accessToken');
                            localStorage.removeItem('refreshToken');
                            localStorage.removeItem('autoLogoutSecondAlarm');
                        }
                    });
                }

                if (autoLogoutLastAlarm && currentTime >= parseInt(autoLogoutLastAlarm) + lastAlarmTime) {
                    requestNewAccessToken().then(newAccessToken => {
                        if (newAccessToken) {
                            localStorage.setItem('accessToken', `Bearer ${newAccessToken}`);
                            dispatch(setLoginState());
                        } else {
                            localStorage.removeItem('accessToken');
                            localStorage.removeItem('refreshToken');
                            localStorage.removeItem('autoLogoutLastAlarm');
                        }
                    });
                }
            }
        }
    }, [dispatch]);

    return;
};

export default useOAuthLogin;
