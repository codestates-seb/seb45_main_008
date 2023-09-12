import React, { useState } from 'react';
import styled from 'styled-components'; 
import { useSelector, useDispatch } from 'react-redux'; 
import { useCreateCash, useGetCash, useResetCash } from '../../hooks/useCash'; 
import { RootState } from '../../store/config'; 
import { setCashId, setCashAmount } from '../../reducer/cash/cashSlice';

const CashModal: React.FC<CashModalProps> = ({ onClose }) => {

    const titleText = "현금";
    const cashCreationPlaceholder = "생성할 현금 입력";
    const createCashButtonText = "현금 생성";
    const cashInputPlaceholder = "현금 입력";
    const resetButtonText = "리셋";

    const dispatch = useDispatch();
    const cashId = useSelector((state: RootState) => state.cash.cashId);
    const cashAmount = useSelector((state: RootState) => state.cash.cashAmount) || 0;
    
    const createCashMutation = useCreateCash();
    const { data: cashData, isLoading } = useGetCash(cashId); 
    const updateCashMutation = useResetCash();

    const [cashInput, setCashInput] = useState<string>('');
    const [initialAmount, setInitialAmount] = useState<number>(0); // 현금 생성을 위한 상태 변수

    // 현금 생성 및 cashId 전역 저장
    const handleCreateCash = () => {
        createCashMutation.mutate(initialAmount, {
            onSuccess: (data) => {
                dispatch(setCashId(data.data.cashId));
            }
        });
    };

    // 보유 현금량 조회 및 전역 저장
    if (cashData && cashAmount !== cashData.data.cash) {
        dispatch(setCashAmount(cashData.data.cash));
    }

// 현금을 입력한 금액으로 리셋하는 함수
    const handleCashReset = () => {
        if (cashId) {
            const numericCashId = parseInt(cashId, 10);  // cashId를 숫자로 변환
            const numericCashAmount = Number(cashInput); // cashInput을 숫자로 변환
            updateCashMutation.mutate({ cashId: numericCashId, cashAmount: numericCashAmount }, {
                onSuccess: () => {
                    dispatch(setCashAmount(numericCashAmount)); // 현금 금액을 입력한 금액으로 리셋
                }
            });
        } else {
            console.error("cashId is null or not a valid number.");
        }
    };


    return (
        <ModalBackground>
            <ModalContainer>
                <CloseButton onClick={onClose}>&times;</CloseButton>
                <Title>{titleText}</Title>

                {/* 현금 생성 입력창 및 버튼 추가 */}
                <div>
                    <CashCreationInput
                        type="number"
                        value={initialAmount}
                        onChange={e => setInitialAmount(Number(e.target.value))}
                        placeholder={cashCreationPlaceholder}
                    />
                    <CreateCashButton onClick={handleCreateCash}>{createCashButtonText}</CreateCashButton>
                </div>

                <p>현재 현금: {isLoading ? 'Loading...' : cashAmount.toLocaleString()}</p>
                <div>
                    <CashInput
                        type="number"
                        value={cashInput}
                        onChange={e => setCashInput(e.target.value)}
                        placeholder={cashInputPlaceholder}
                    />
                    <ReceiveButton onClick={handleCashReset}>{resetButtonText}</ReceiveButton>
                </div>
            </ModalContainer>
        </ModalBackground>
    );
};

interface CashModalProps {
    onClose: () => void;
    cashId: string | null;
}

// Styled Components Definitions:

const ModalBackground = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
`;

const ModalContainer = styled.div`
  position: relative;
  background-color: white;
  padding: 20px;
  width: 400px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h2`
  margin-bottom: 20px;
  font-size: 1.6rem;
  font-weight: 400;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: #FFFFFF;
  border: 1px solid lightgray;
  font-size: 1.5rem;
  cursor: pointer;
`;

const CashInput = styled.input`
    padding: 10px;
    border: 1px solid lightgray;
    border-radius: 5px;
    margin-right: 10px;
`;

const ReceiveButton = styled.button`
    padding: 10px 15px;
    background-color: darkgreen;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
`;
const CashCreationInput = styled.input`
    padding: 10px;
    border: 1px solid lightgray;
    border-radius: 5px;
    margin-right: 10px;
`;

const CreateCashButton = styled.button`
    padding: 10px 15px;
    background-color: blue;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
`;

export default CashModal;
