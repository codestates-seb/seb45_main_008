import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setLoginState } from '../../reducer/member/loginSlice';
import setAutoLogoutAlarm from '../../utils/setAutoLogoutAlarm';
import { secondAlarmTime, lastAlarmTime } from '../../utils/setAutoLogoutAlarm';

const useAutoLogout = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken !== null) {
      const currentTime = Date.now();
      const autoLogoutSecondAlarm = localStorage.getItem('autoLogoutSecondAlarm');
      const autoLogoutLastAlarm = localStorage.getItem('autoLogoutLastAlarm');

      if (autoLogoutSecondAlarm !== null) {
        if (currentTime >= parseInt(autoLogoutSecondAlarm) + secondAlarmTime + lastAlarmTime) {
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          localStorage.removeItem('autoLogoutSecondAlarm');
        } else {
          const timeGone = currentTime - parseInt(autoLogoutSecondAlarm);
          const remainTime = secondAlarmTime - timeGone;
          dispatch(setLoginState());
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
          dispatch(setLoginState());
          setAutoLogoutAlarm(dispatch, 'last', remainTime);
        }
      }
    }
  }, [dispatch]);

  return;
};

export default useAutoLogout;
