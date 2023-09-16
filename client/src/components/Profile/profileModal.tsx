import React, { useState } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import MemberInfoModal from './memberInfoModal'; 
import MemberWithdrawalModal from './memberWithdrawalModal';
import CashModal from './cashModal'; 
import { RootState } from '../../store/config'; 

const ProfileModal: React.FC<ProfileModalProps> = ({ onClose }) => {

    const memberInfoText = "회원정보";
    const cashText = "현금";
    const memberWithdrawText = "회원탈퇴";
    const moneyId = useSelector((state: RootState) => state.cash.moneyId); 

    const [selectedTab, setSelectedTab] = useState(1); // 1: MemberInfo, 2: CashModal, 3: WithdrawalModal

    return (
        <ModalBackground>
            <ModalContainer>
            <Tabs>
                <TabButton isActive={selectedTab === 1} onClick={() => setSelectedTab(1)}>{memberInfoText}</TabButton>
                <TabButton isActive={selectedTab === 2} onClick={() => setSelectedTab(2)}>{cashText}</TabButton>
                <TabButton isActive={selectedTab === 3} onClick={() => setSelectedTab(3)}>{memberWithdrawText}</TabButton>
            </Tabs>
                <TabContent>
                    {selectedTab === 1 && <MemberInfoModal onClose={onClose} />}
                    {selectedTab === 2 && <CashModal onClose={onClose} moneyId={moneyId} />}
                    {selectedTab === 3 && <MemberWithdrawalModal onClose={onClose} />}
                </TabContent>
                {/* <CloseButton onClick={onClose}>&times;</CloseButton> */}
            </ModalContainer>
        </ModalBackground>
    );
};

interface ProfileModalProps {
    onClose: () => void;
}

// 모달 배경 스타일
const ModalBackground = styled.div`
  z-index: 1000;
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
  z-index: 1001;
  position: relative;
  padding: 20px;
  width: 400px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: transparent; // 배경색을 투명하게 설정
  border: none; // 테두리를 없앱니다.
`;

const Tabs = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-bottom: 20px;
    position: relative; // 위치를 조절하기 위한 속성
    top: -30px; // 위로 30px 올립니다
    z-index: 1002; // 이 값을 추가하여 Tabs를 최상위로 올립니다.
`;

// // 모달 닫기 버튼 스타일
// const CloseButton = styled.button`
//   position: absolute;
//   top: 10px;
//   right: 10px;
//   background: #FFFFFF;
//   border: 1px solid lightgray;
//   font-size: 1.5rem;
//   cursor: pointer;
// `;

// TabButton 컴포넌트 스타일링
const TabButton = styled.button<{ isActive?: boolean }>`
    flex: 1;
    padding: 10px;
    border: 1px solid lightgray;
    border-bottom: ${({ isActive }) => (isActive ? '3px solid darkred' : '1px solid lightgray')};
    border-radius: 5px;
    cursor: pointer;
    background-color: #FFFFFF;
    color: darkslategray;
`;

const TabContent = styled.div`
    width: 100%;
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    overflow-y: auto;
    position: relative;
    min-height: 200px;
`;

export default ProfileModal;
