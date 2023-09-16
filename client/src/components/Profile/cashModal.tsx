import React, { useState } from 'react';
import styled from 'styled-components'; 
import { useSelector, useDispatch } from 'react-redux'; 
import { useCreateCash, useGetCash, useResetCash } from '../../hooks/useCash'; 
import { RootState } from '../../store/config'; 
import { setCashId, setMoney } from '../../reducer/cash/cashSlice';

const CashModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {

    // 상태 및 변수 초기화
    const titleText = "현금";
    const cashCreationPlaceholder = "생성할 현금 입력";
    const createCashButtonText = "현금 생성";
    const cashInputPlaceholder = "현금 입력";
    const resetButtonText = "리셋";
    const refreshButtonText ="새로고침";

    const dispatch = useDispatch();
    const cashId = useSelector((state: RootState) => state.cash.cashId);
    const money = useSelector((state: RootState) => state.cash.money) || '0';

    const createCashMutation = useCreateCash();
    const cashQuery = useGetCash();
    const updateCashMutation = useResetCash();

    const [cashInput, setCashInput] = useState<string>('0');
    const [initialAmount, setInitialAmount] = useState<string>('0'); // 현금 생성을 위한 상태 변수

    // 현금 정보 재조회 함수
    const refreshCashInfo = () => {
        cashQuery.refetch();  // 현금 정보를 다시 가져옵니다.
    };

    // 현금 생성 및 cashId 전역 저장 함수
    const handleCreateCash = () => {
        createCashMutation.mutate(initialAmount);
    };

    // 보유 현금량 조회 및 전역 저장 함수
    if (cashQuery.data && money !== cashQuery.data.data.cash) {
        dispatch(setMoney(cashQuery.data.data.cash));
    }

    // 입력한 금액으로 현금 리셋 함수
    const handleCashReset = () => {
        if (cashId) {
            const numericCashAmount = cashInput; // cashInput을 숫자로 변환
            updateCashMutation.mutate({ money: numericCashAmount }, {
                onSuccess: () => {
                    dispatch(setMoney(numericCashAmount)); // 현금 금액을 입력한 금액으로 리셋
                    dispatch(setCashId(cashId) );
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

                {/* 현금 생성 입력창 및 버튼 */}
                <div>
                    <CashCreationInput
                        type="string"
                        value={initialAmount}
                        onChange={e => setInitialAmount(e.target.value)}
                        placeholder={cashCreationPlaceholder}
                    />
                    <CreateCashButton onClick={handleCreateCash}>{createCashButtonText}</CreateCashButton>
                </div>
                <div>
                    <p style={{ display: 'inline-block', margin: '20px' }}>
                        현재 현금: {cashQuery.isLoading ? 'Loading...' : money.toLocaleString()}
                    </p>
                    <RefreshButton onClick={refreshCashInfo}>{refreshButtonText}</RefreshButton>
                </div>
                <div>
                    <CashInput
                        type="string"
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

export default CashModal;

// interface CashModalProps {
//     onClose: () => void;
// }

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
  z-index: 100;
  position: relative;
  background-color: white;
  padding: 20px;
  width: 400px;
  height:230px;
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

const StyledButton = styled.button`
    padding: 10px 15px;
    background-color: white;
    color: darkslategray;
    border: 1px solid darkslategray;
    border-radius: 5px;
    cursor: pointer;
`;

const CashInput = styled.input`
    padding: 10px;
    border: 1px solid lightgray;
    border-radius: 5px;
    margin-right: 10px;
`;

const ReceiveButton = styled(StyledButton)``;

const CashCreationInput = styled.input`
    padding: 10px;
    border: 1px solid lightgray;
    border-radius: 5px;
    margin-right: 10px;
`;

const CreateCashButton = styled(StyledButton)``;

const RefreshButton = styled(StyledButton)`
    margin-left:50px;
`;



