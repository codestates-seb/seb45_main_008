import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setLoginState } from '../../reducer/member/loginSlice';
import setAutoLogoutAlarm from '../../utils/setAutoLogoutAlarm';
import { secondAlarmTime, lastAlarmTime } from '../../utils/setAutoLogoutAlarm';

const useAutoLogout = () => {
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
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken !== null) {
      const currentTime = Date.now();
      const autoLogoutSecondAlarm = localStorage.getItem('autoLogoutSecondAlarm');
      const autoLogoutLastAlarm = localStorage.getItem('autoLogoutLastAlarm');

      if (autoLogoutSecondAlarm !== null) {
        if (currentTime >= parseInt(autoLogoutSecondAlarm) + secondAlarmTime) {
          requestNewAccessToken().then(newAccessToken => {
            if (newAccessToken) {
              localStorage.setItem('accessToken', `Bearer ${newAccessToken}`);
              dispatch(setLoginState());
              setAutoLogoutAlarm(dispatch, 'second', secondAlarmTime, lastAlarmTime);
            } else {
              localStorage.removeItem('accessToken');
              localStorage.removeItem('refreshToken');
              localStorage.removeItem('autoLogoutSecondAlarm');
            }
          });
        } 
      }

      if (autoLogoutLastAlarm !== null) {
        if (currentTime >= parseInt(autoLogoutLastAlarm) + lastAlarmTime) {
          requestNewAccessToken().then(newAccessToken => {
            if (newAccessToken) {
              localStorage.setItem('accessToken', `Bearer ${newAccessToken}`);
              dispatch(setLoginState());
              setAutoLogoutAlarm(dispatch, 'last', lastAlarmTime);
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

export default useAutoLogout;
