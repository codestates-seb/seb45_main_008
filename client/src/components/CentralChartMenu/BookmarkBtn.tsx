import { styled } from "styled-components";

import bookmarkOffImg from "../../asset/CentralSectionMenu-BookmarkOff.png";
// import bookmarkOnImg from "../../asset/CentralSectionMenu-BookmarkOn.png.png";

const buttonText: string = "관심";

const BookmarkBtn = () => {
  return (
    <Container>
      <Button src={bookmarkOffImg} />
      <div className="BtnTextContainer">{buttonText}</div>
    </Container>
  );
};

export default BookmarkBtn;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2px;
  padding-right: 14px;

  .BtnTextContainer {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14.5px;
    color: darkgray;
  }
`;

const Button = styled.img`
  width: 28px;
  height: 28px;
`;
