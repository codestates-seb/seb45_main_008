// hooks/useCash.ts
import { useQuery, useMutation } from 'react-query';
import axios from 'axios';

const getAuthHeader = () => {
    const authToken = localStorage.getItem('authToken');
    return {
        'Authorization': `${authToken}`
    };
};

export const useCreateCash = () => {
    return useMutation((initialAmount: number) => axios.post('http://ec2-13-125-246-160.ap-northeast-2.compute.amazonaws.com/cash', { "money": initialAmount }, {
        headers: getAuthHeader()
    }));
    
}

export const useGetCash = (moneyId: string | null) => {
    const queryFn = () => {
        if (!moneyId) {
            throw new Error("Cash ID is not provided.");
        }
        return axios.get(`http://ec2-13-125-246-160.ap-northeast-2.compute.amazonaws.com/cash/${moneyId}`, {
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
    return useMutation((data: { moneyId: number, money: number }) => axios.patch(`http://ec2-13-125-246-160.ap-northeast-2.compute.amazonaws.com/cash/${data.moneyId}`, { "money": data.money }, {
        headers: getAuthHeader()
    }));
}
