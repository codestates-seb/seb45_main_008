import React, { useState } from 'react';
import styled from 'styled-components'; 
import { useDispatch} from 'react-redux'; // <-- Import useSelector
import { useCreateCash, useResetCash } from '../../hooks/useCash'; 
import useGetCash from '../../hooks/useGetCash'; 
import useGetCashId from '../../hooks/useGetCashId';
import { setCashId, setMoney } from '../../reducer/cash/cashSlice';



const CashModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {

    // 상태 및 변수 초기화
    const titleText = "현금생성/재생성";
    const cashCreationPlaceholder = "1백만원~5억원 사이를 입력하세요";
    const createCashButtonText = "현금 생성";
    const cashInputPlaceholder = "1백만원~5억원 사이를 입력하세요";
    const resetButtonText = "현금 재생성";
    // const refreshButtonText ="새로고침";

    const dispatch = useDispatch();

    // useGetCash 훅을 사용하여 현금 보유량 가져오기
    const { cashData: holdingsAmount } = useGetCash(); // 👈 useGetCash 훅을 사용하여 현금 보유량 데이터를 가져옵니다.

    // useGetCashId 훅을 사용하여 cashId 가져오기
    const { cashData: cashId, cashError } = useGetCashId();

    const createCashMutation = useCreateCash();
    const updateCashMutation = useResetCash();

    const [cashInput, setCashInput] = useState<string>('0');
    const [initialAmount, setInitialAmount] = useState<string>('0'); // 현금 생성을 위한 상태 변수

    // 현금 생성 및 cashId 전역 저장 함수
    const handleCreateCash = () => {
        createCashMutation.mutate(initialAmount, {
            onSuccess: () => {
                window.location.reload();
            }
        });
    };

    // 입력한 금액으로 현금 리셋 함수
    const handleCashReset = () => {
        if (cashId) {
            const numericCashAmount = cashInput;
            updateCashMutation.mutate({ money: numericCashAmount }, {
                onSuccess: () => {
                    dispatch(setMoney(numericCashAmount));
                    dispatch(setCashId(cashId));
                    window.location.reload(); 
                }
            });
        } else {
            console.error("cashId is null or not a valid number.");
        }
    };

    const handleEnterPress = (event: React.KeyboardEvent<HTMLInputElement>, action: () => void) => {
        if (event.key === 'Enter') {
            action();
        }
    };

return (
    <ModalBackground>
        <ModalContainer>
            <CloseButton onClick={onClose}>&times;</CloseButton>
            <Title>{titleText}</Title>

            {/* cashId가 없거나 cashId 요청에 오류가 있으면 현금 생성 UI 표시 */}
            {(!cashId || cashError) && (
                <div>
                    <CashCreationInput
                        type="string"
                        value={initialAmount}
                        onChange={e => setInitialAmount(e.target.value)}
                        placeholder={cashCreationPlaceholder}
                        onKeyDown={(event) => handleEnterPress(event, handleCreateCash)}
                    />
                    <CreateCashButton onClick={handleCreateCash}>{createCashButtonText}</CreateCashButton>
                </div>
            )}

            {/* cashId가 있으면 현금 리셋 UI 표시 */}
            {cashId && !cashError && (
                <div>
                    <CashInput
                        type="string"
                        value={cashInput}
                        onChange={e => setCashInput(e.target.value)}
                        placeholder={cashInputPlaceholder}
                        onKeyDown={(event) => handleEnterPress(event, handleCashReset)}
                    />
                    <ReceiveButton onClick={handleCashReset}>{resetButtonText}</ReceiveButton>
                </div>
            )}

            <div>
                <Content style={{ display: 'inline-block', margin: '20px' }}>
                    현금 보유량: {holdingsAmount}원
                </Content>
            </div>
        </ModalContainer>
    </ModalBackground>
);

};
export default CashModal;

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
  border-radius:5px;
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
    margin-bottom:5px;
    cursor: pointer;

    //호버 시 회색
    &:hover {
        background-color: #f2f2f2; 
    }
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

const Content = styled.p`
    margin: 15px 0;  // 간격 조정
    font-size: 1.1rem;  // 폰트 크기 증가
    line-height: 1.5;
    color: #555;  // 색상 변경
    text-align: center;  // 텍스트 중앙 정렬
`;
