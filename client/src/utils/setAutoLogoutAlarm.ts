import { toast } from "react-toastify";
import { setLogoutState } from "../reducer/member/loginSlice";

/*
- 자동 로그아웃 설정을 하는 함수입니다.

- 총 3차례의 토스트 메시지 안내를 실행합니다
  1차) 로그인 시 30분 뒤 로그아웃 됨을 알림
  2차) 로그아웃 시간 1분 남음을 알림
  3차) 로그아웃 처리 되었음을 알림

- 해당 함수는 총 4개의 인자를 가집니다
  1) 로그인 전역상태 변경에 필요한 dispatch
  2) 알람 설정 개수 (first일 경우 3개 다, second일 경우 2개, last일 경우 마지막 1개만 설정)
  3) 1차 알림 설정 시간 (설정한 시간만큼 지난 후 1차 알림 발생)
  4) 2차 알림 설정 시간 (상동)
*/

export const secondAlarmTime = 1000 * 60 * 29; // 29분
export const lastAlarmTime = 1000 * 60; // 1분

const setAutoLogoutAlarm = (dispatch: any, alarmNum: "first" | "second" | "last", secondAlarmTime: number, lastAlarmTime?: number) => {
  // 1~3차 알림 모두 설정
  if (alarmNum === "first") {
    toast.warning("로그인 상태는 30분 동안 유지됩니다", {
      style: toastStyle,
      position: "top-center",
    });

    // 2차 알림 셋팅 시간 기록
    const autoLogoutSecondAlarm = Date.now();
    sessionStorage.setItem("autoLogoutSecondAlarm", `${autoLogoutSecondAlarm}`);

    setTimeout(() => {
      // 2차 알림 셋팅 시간 제거
      sessionStorage.removeItem("autoLogoutSecondAlarm");

      toast.warning("1분 뒤 로그아웃 처리됩니다", {
        style: toastStyle,
        position: "top-center",
      });

      // 3차 알림 셋팅 시간 기록
      const autoLogoutLastAlarm = Date.now();
      sessionStorage.setItem("autoLogoutLastAlarm", `${autoLogoutLastAlarm}`);

      setTimeout(() => {
        // 3차 알림 셋팅 시간 제거
        sessionStorage.removeItem("autoLogoutLastAlarm");

        dispatch(setLogoutState());
        sessionStorage.removeItem("accessToken");
        sessionStorage.removeItem("refreshToken");

        toast.warning("로그아웃 처리되었습니다", {
          style: toastStyle,
          position: "top-center",
        });
      }, lastAlarmTime);
    }, secondAlarmTime);
  }

  // 2~3차 알림 설정
  if (alarmNum === "second") {
    setTimeout(() => {
      // 2차 알림 셋팅 시간 제거
      sessionStorage.removeItem("autoLogoutSecondAlarm");

      toast.warning("1분 뒤 로그아웃 처리됩니다", {
        style: toastStyle,
        position: "top-center",
      });

      // 3차 알림 셋팅 시간 기록
      const autoLogoutLastAlarm = Date.now();
      sessionStorage.setItem("autoLogoutLastAlarm", `${autoLogoutLastAlarm}`);

      setTimeout(() => {
        // 3차 알림 셋팅 시간 제거
        sessionStorage.removeItem("autoLogoutLastAlarm");

        dispatch(setLogoutState());
        sessionStorage.removeItem("accessToken");
        sessionStorage.removeItem("refreshToken");

        toast.warning("로그아웃 처리되었습니다", {
          style: toastStyle,
          position: "top-center",
        });
      }, lastAlarmTime);
    }, secondAlarmTime);

    return;
  }

  // 3차 알림만 설정
  if (alarmNum === "last") {
    setTimeout(() => {
      // 3차 알림 셋팅 시간 제거
      sessionStorage.removeItem("autoLogoutLastAlarm");

      dispatch(setLogoutState());
      sessionStorage.removeItem("accessToken");
      sessionStorage.removeItem("refreshToken");

      toast.warning("로그아웃 처리되었습니다", {
        style: toastStyle,
        position: "top-center",
      });
    }, lastAlarmTime);
  }
};

export default setAutoLogoutAlarm;

const toastStyle = {
  fontSize: "15px",
  fontWeight: 350,
  color: "black",
};
