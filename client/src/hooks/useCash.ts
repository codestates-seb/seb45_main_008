import { useQuery, useMutation } from 'react-query';
import axios from 'axios';

const BASE_URL = 'http://ec2-13-125-246-160.ap-northeast-2.compute.amazonaws.com:8080';

const getAuthHeader = () => {
    const accessToken = localStorage.getItem('accessToken');
    return {
        'Authorization': `${accessToken}`
    };

};

export const useCreateCash = () => {
    return useMutation((initialAmount: string) => axios.post(`${BASE_URL}/cash`, { "money": initialAmount }, {
        headers: getAuthHeader()
    }));
}

export const useGetCash = (moneyId: string | null) => {
    const queryFn = () => {
        if (!moneyId) {
            throw new Error("Cash ID is not provided.");
        }
        return axios.get(`${BASE_URL}/cash`, {
            headers: getAuthHeader()
        });
    };

    const queryResult = useQuery(['money', moneyId], queryFn, {
        enabled: !!moneyId,
    });

    if (!moneyId) {
        return {
            ...queryResult,
            data: null
        };
    }

    return queryResult;
}

export const useResetCash = () => {
    return useMutation((data: { moneyId: number, money: string }) => axios.patch(`${BASE_URL}/cash/${data.moneyId}`, { "money": data.money }, {
        headers: getAuthHeader()
    }));
}
