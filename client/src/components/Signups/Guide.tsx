import React from 'react';
import styled from 'styled-components';

const STRINGS = {
    GUIDE_TITLE: "StockHolm 가이드",
    LOGIN_GUIDE: "로그인을 하면 다양한 기능을 활용할 수 있습니다.",
    CASH_GUIDE: "프로필 버튼 - 현금 탭을 가면 현금을 충전할 수 있습니다."
};

const GuideModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    return (
        <ModalBackground>
            <ModalContainer>
                <CloseButton onClick={onClose}>&times;</CloseButton>
                <Title>{STRINGS.GUIDE_TITLE}</Title>
                <Content>{STRINGS.LOGIN_GUIDE}</Content>
                <Content>{STRINGS.CASH_GUIDE}</Content>
            </ModalContainer>
        </ModalBackground>
    );
};

export default GuideModal;

// Reuse the styles from the other modals

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
    z-index:4000;
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

const Content = styled.p`
    margin: 10px 0;
    font-size: 1rem;
    line-height: 1.4;
`;
