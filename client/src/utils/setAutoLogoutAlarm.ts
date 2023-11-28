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
  3) 2차 알림 설정 시간 (설정한 시간만큼 지난 후 1차 알림 발생)
  4) 3차 알림 설정 시간 (상동)
*/

export const secondAlarmTime = 1000 * 60 * 29; // 29분
export const lastAlarmTime = 1000 * 60; // 1분

const setAutoLogoutAlarm = (dispatch: any, alarmNum: string, secondAlarmTime: number, lastAlarmTime?: number) => {
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

    const handleTokenRefresh = async () => {
        const newAccessToken = await requestNewAccessToken();

        if (newAccessToken) {
            sessionStorage.setItem("accessToken", `Bearer ${newAccessToken}`);
            toast.success("로그인이 연장되었습니다", { style: toastStyle, position: "top-center" });
        } else {
            dispatch(setLogoutState());
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            toast.warning("로그아웃 처리되었습니다", { style: toastStyle, position: "top-center" });
        }
    };

    if (alarmNum === alarmNumType.First) {
        toast.warning("로그인 상태는 30분 동안 유지됩니다", {
            style: toastStyle,
            position: "top-center",
        });

        const autoLogoutSecondAlarm = Date.now();
        localStorage.setItem("autoLogoutSecondAlarm", `${autoLogoutSecondAlarm}`);

        setTimeout(handleTokenRefresh, secondAlarmTime);
    }

    if (alarmNum === alarmNumType.Second) {
        setTimeout(handleTokenRefresh, secondAlarmTime);
    }

    // 3차 알림만 설정
    if (alarmNum === alarmNumType.Last) {
        setTimeout(() => {
            dispatch(setLogoutState());
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            toast.warning("로그아웃 처리되었습니다", { style: toastStyle, position: "top-center" });
        }, lastAlarmTime);
    }
};

export default setAutoLogoutAlarm;

const alarmNumType = {
    First: "first",
    Second: "second",
    Last: "last",
};

const toastStyle = {
    fontSize: "15px",
    fontWeight: 350,
    color: "black",
};
