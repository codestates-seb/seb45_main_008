import React, { useEffect, useState } from "react";
import styled from "styled-components";
import StockHolmLogo from "../../asset/images/StockHolmLogo.png";
// import SampleProfile from "../../asset/images/ProfileSample.png";
import { useNavigate } from "react-router-dom";
import ProfileModal from "../Profile/profileModal";
import StockSearchComponent from "./stockSearchComponent";
import { setLogoutState } from "../../reducer/member/loginSlice";
import { useDispatch } from "react-redux";
import { useGetMemberInfo } from "../../hooks/useGetMemberInfo"; // import the hook

// 로그인 상태일 때의 헤더 컴포넌트
const LoginHeader: React.FC<LoginHeaderProps> = () => {
  const [isProfileModalOpen, setProfileModalOpen] = useState(false); // 프로필 모달 상태
  const navigate = useNavigate(); // 페이지 이동 함수
  const logoutText = "로그아웃";
  const dispatch = useDispatch(); //

  const { data: memberInfo } = useGetMemberInfo(); // use the hook here
  // const userName = memberInfo?.name; // retrieve the user's name
  // const userEmail = memberInfo?.email; // retrieve the user's email

  // 🔴 프로필에 들어갈 텍스트
  const [profileText, setProfileText] = useState("");
  useEffect(() => {
    if (memberInfo) {
      const userEmail = memberInfo.email;
      const firstText = userEmail.slice(0, 1);
      setProfileText(firstText);
    }
  }, [memberInfo]);

  // 프로필 모달 열기 함수
  const handleProfileOpen = () => {
    setProfileModalOpen(true);
  };

  // 프로필 모달 닫기 함수
  const handleProfileClose = () => {
    setProfileModalOpen(false);
  };

  // 로고 클릭 처리 함수
  const handleLogoClick = () => {
    navigate("/"); // 메인 페이지로 이동
  };

  // 로그아웃 클릭 처리 함수
  const handleLogout = () => {
    dispatch(setLogoutState()); // 전역변수에서 로그아웃 상태로 설정
    localStorage.removeItem("accessToken"); // 엑세스 토큰 제거
    localStorage.removeItem("refreshToken"); // 리프레시 토큰 제거

    // 페이지를 새로고침합니다.
    window.location.reload();
  };

  return (
    <HeaderContainer>
      <LogoButton onClick={handleLogoClick}>
        <LogoImage src={StockHolmLogo} />
      </LogoButton>
      <StockSearchComponent />
      <UserActions>
        {/* <UserNameDisplay>{userName || userEmail}</UserNameDisplay> */}
        <ProfileButton onClick={handleProfileOpen}>
          {profileText}
          {/* <ProfileImage src={SampleProfile} /> */}
        </ProfileButton>
        {isProfileModalOpen && <ProfileModal onClose={handleProfileClose} />}
        <LogoutButton onClick={handleLogout}>{logoutText}</LogoutButton>
      </UserActions>
    </HeaderContainer>
  );
};

export default LoginHeader;

// 로그아웃 클릭 이벤트 타입 정의
interface LoginHeaderProps {
  onProfileClick: () => void;
}

// 헤더 컨테이너 스타일
// 🔴 border 색상, 굵기
const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #fff;
  border-bottom: 1px solid black;
  width: 100%;
  height: 51px;
`;

// 로고 버튼 스타일
const LogoButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  &:focus {
    outline: none;
  }
  &:hover img {
    filter: brightness(0.97); // darken the logo image slightly on hover
  }
`;

// 로고 이미지 스타일
const LogoImage = styled.img`
  height: 40px;
  width: auto;
`;

// 사용자 액션 버튼들의 스타일
const UserActions = styled.div`
  display: flex;
  align-items: center;
`;

// //유저 이름 스타일
// const UserNameDisplay = styled.span`
//   font-weight: 400;
//   font-size: 1rem;
//   color: darkslategray;
//   margin-right: 1rem;
// `;

// // 프로필 버튼 스타일
// const ProfileButton = styled.button`
//   margin-right: 1rem;
//   background-color: transparent;
//   border: none;
//   cursor: pointer;
//   padding: 0;
//   &:focus {
//     outline: none;
//   }
//   &:hover {
//     background-color: #f2f2f2; // light gray color on hover
//   }
// `;

// 프로필 버튼 스타일
const ProfileButton = styled.button`
  width: 32px;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 50%;
  margin-right: 0.75rem;
  margin-top: 0.1rem;

  background-color: #274949;
  color: white;
  border: none;
  cursor: pointer;
  padding: 0;
  &:focus {
    outline: none;
  }
  &:hover {
    background-color: #587878; // light gray color on hover
  }
  transition: background-color 0.3s ease;
`;

// // 프로필 이미지 스타일
// const ProfileImage = styled.img`
//   height: 35px;
//   width: auto;
// `;

// 로그아웃 버튼 스타일
const LogoutButton = styled.button`
  background-color: #fff;
  color: #2f4f4f;
  border: 1px solid #2f4f4f;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  &:hover {
    background-color: #f2f2f2;
  }
`;
