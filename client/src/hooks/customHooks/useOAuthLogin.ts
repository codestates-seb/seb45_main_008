import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setLoginState } from '../../reducer/member/loginSlice';
import setAutoLogoutAlarm from '../../utils/setAutoLogoutAlarm';
import { secondAlarmTime, lastAlarmTime } from '../../utils/setAutoLogoutAlarm';

const useOAuthLogin = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const accessToken = urlParams.get('access_token');
    const refreshToken = urlParams.get('refresh_token');
    const currentTime = Date.now();
    const autoLogoutSecondAlarm = localStorage.getItem('autoLogoutSecondAlarm');
    const autoLogoutLastAlarm = localStorage.getItem('autoLogoutLastAlarm');

    if (accessToken && refreshToken) {
      localStorage.setItem('accessToken', `Bearer ${accessToken}`);
      localStorage.setItem('refreshToken', refreshToken);

      urlParams.delete('access_token');
      urlParams.delete('refresh_token');
      window.history.replaceState({}, '', '?' + urlParams.toString());

      if (autoLogoutSecondAlarm === null) {
        dispatch(setLoginState()); // 로그인 처리
        setAutoLogoutAlarm(dispatch, 'first', secondAlarmTime, lastAlarmTime);
      }

      if (autoLogoutSecondAlarm !== null) {
        if (currentTime >= parseInt(autoLogoutSecondAlarm) + secondAlarmTime + lastAlarmTime) {
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          localStorage.removeItem('autoLogoutSecondAlarm');
        } else {
          const timeGone = currentTime - parseInt(autoLogoutSecondAlarm);
          const remainTime = secondAlarmTime - timeGone
          dispatch(setLoginState()); // 로그인 처리
          setAutoLogoutAlarm(dispatch, 'second', remainTime, lastAlarmTime);
        }
      }

      if (autoLogoutLastAlarm !== null) {
        if (currentTime >= parseInt(autoLogoutLastAlarm) + lastAlarmTime) {
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          localStorage.removeItem('autoLogoutLastAlarm');
        } else {
          const timeGone = currentTime - parseInt(autoLogoutLastAlarm);
          const remainTime = lastAlarmTime - timeGone;
          dispatch(setLoginState()); // 로그인 처리
          setAutoLogoutAlarm(dispatch, 'last', remainTime);
        }
      }
    }
  }, [dispatch]);

  return;
};

export default useOAuthLogin;
