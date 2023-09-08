import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const CashModal: React.FC<CashModalProps> = ({ onClose, memberId }) => {
    const [cash, setCash] = useState<number | null>(null);
    const [cashInput, setCashInput] = useState<string>('');

    useEffect(() => {
        axios.get(`http://ec2-13-125-246-160.ap-northeast-2.compute.amazonaws.com/cash/${memberId}`)
            .then(response => {
                if (response.status === 200) {
                    setCash(response.data.cash);
                } else if (response.status === 204) {
                    // Handle the "No Content" scenario. This could be setting cash to 0 or displaying a message.
                    setCash(0); // Or handle it in a way that suits your needs
                }
            })
            .catch(error => {
                console.error("Error fetching cash:", error);
            });
    }, [memberId]);

    const handleCashReceive = () => {
        axios.post(`http://ec2-13-125-246-160.ap-northeast-2.compute.amazonaws.com/cash/${memberId}`, {
            cash: cashInput
        })
        .then(response => {
            if (response.status === 201) {
                // Update the cash display with the new value
                setCash(prevCash => prevCash ? prevCash + Number(cashInput) : Number(cashInput));
            } else {
                console.warn("Unexpected status code:", response.status);
            }
        })
        .catch(error => {
            console.error("Error updating cash:", error);
        });
    };

    return (
        <ModalBackground>
            <ModalContainer>
                <CloseButton onClick={onClose}>&times;</CloseButton>
                <Title>현금</Title>
                <p>현재 현금: {cash ? cash.toLocaleString() : 'Loading...'}</p>
                <div>
                    <CashInput
                        type="number"
                        value={cashInput}
                        onChange={e => setCashInput(e.target.value)}
                        placeholder="현금 입력"
                    />
                    <ReceiveButton onClick={handleCashReceive}>받기</ReceiveButton>
                </div>
            </ModalContainer>
        </ModalBackground>
    );
};

interface CashModalProps {
    onClose: () => void;
    memberId: string;
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

export default CashModal;
