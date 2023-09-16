import { useQuery, useMutation } from 'react-query';
import axios, { AxiosError } from 'axios';
import { useDispatch } from 'react-redux';
import { setCashId, setMoney } from '../reducer/cash/cashSlice';
import { useSelector } from 'react-redux';
import { RootState } from '../store/config';

const BASE_URL = 'http://ec2-13-125-246-160.ap-northeast-2.compute.amazonaws.com:8080';

const getAuthHeader = () => {
    const accessToken = localStorage.getItem('accessToken');
    return {
        'Authorization': `${accessToken}`
    };

};

export const useCreateCash = () => {
    const dispatch = useDispatch();
    return useMutation((initialAmount: string) => axios.post(`${BASE_URL}/cash`, { "money": initialAmount }, {
        headers: getAuthHeader()
    }), {
        onSuccess: (res) => {
            // 200번 응답 처리
            dispatch(setCashId(res.data.cashId));
            dispatch(setMoney(res.data.money));
        },
        onError: (error) => {
            const axiosError = error as AxiosError<ErrorResponse>;
            if (axiosError?.response?.status === 400 || axiosError?.response?.status === 401) {
                // 에러 메시지 출력
                const errorMessage = axiosError?.response?.data?.message || 'Unknown error occurred.';
                alert(errorMessage);
            }
        }
    });
}



export const useGetCash = () => {
    const dispatch = useDispatch();
    const queryFn = () => {
        return axios.get(`${BASE_URL}/cash`, {
            headers: getAuthHeader()
        });
    };

    return useQuery('money', queryFn, {
        onSuccess: (res) => {
            // 200번 응답 처리
            dispatch(setCashId(res.data.cashId));
            dispatch(setMoney(res.data.money));
        },
        onError: (error) => {
            const axiosError = error as AxiosError<ErrorResponse>;
            switch (axiosError?.response?.status) {
                case 400:
                case 401:
                case 404: {
                    // 중괄호 내에서 변수 선언
                    const errorMessage = axiosError?.response?.data?.message || 'Unknown error occurred.';
                    alert(errorMessage);
                    break;
                }
                default:
                    alert('Unknown error occurred.');
                    break;
            }
        },
        refetchInterval: false, // 자동 재요청 비활성화
        retry: false            // 재시도 비활성화
    });
}


export const useResetCash = () => {
    const cashId = useSelector((state: RootState) => state.cash.cashId);  // cashId를 전역 상태에서 가져옵니다.
    const dispatch = useDispatch();

    return useMutation((data: { money: string }) => axios.patch(`${BASE_URL}/cash/${cashId}`, { "money": data.money }, {
        headers: getAuthHeader()
    }), {
        onSuccess: (data) => {
            // 200번 응답 처리
            dispatch(setCashId(data.data.cashId));
            dispatch(setMoney(data.data.money));
        },
        onError: (error) => {
            const axiosError = error as AxiosError<ErrorResponse>;
            switch (axiosError?.response?.status) {
                case 400:
                case 401:
                case 404: {
                    const errorMessage = axiosError?.response?.data?.message || 'Unknown error occurred.';
                    alert(errorMessage);
                    break;
                }
                default:
                    alert('Unknown error occurred.');
                    break;
            }
        }
    });
}


interface ErrorResponse {
    message: string;
}