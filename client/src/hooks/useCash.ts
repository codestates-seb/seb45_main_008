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
    return useMutation((initialAmount: number) => axios.post('http://ec2-13-125-246-160.ap-northeast-2.compute.amazonaws.com/cash', { cash: initialAmount }, {
        headers: getAuthHeader()
    }));
    
}

export const useGetCash = (cashId: string | null) => {
    const queryFn = () => {
        if (!cashId) {
            throw new Error("Cash ID is not provided.");
        }
        return axios.get(`http://ec2-13-125-246-160.ap-northeast-2.compute.amazonaws.com/cash/${cashId}`, {
            headers: getAuthHeader()
        });
    };

    const queryResult = useQuery(['cash', cashId], queryFn, {
        enabled: !!cashId,
    });

    if (!cashId) {
        return {
            ...queryResult,
            data: null
        };
    }

    return queryResult;
}

export const useResetCash = () => {
    return useMutation((data: { cashId: number, cashAmount: number }) => axios.patch(`http://ec2-13-125-246-160.ap-northeast-2.compute.amazonaws.com/cash/${data.cashId}`, { cash: data.cashAmount }, {
        headers: getAuthHeader()
    }));
}
