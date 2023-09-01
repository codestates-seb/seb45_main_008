import { styled } from "styled-components";
import searchIcon from "../../asset/CompareChartSection-SearchIcon.png";

const SearchBox = () => {
  return (
    <Container>
      <SearchIcon src={searchIcon} />
      <SeachBar placeholder="종목명 또는 코드 입력" />
    </Container>
  );
};

export default SearchBox;

const Container = styled.div`
  width: 100%;
  height: 39px;
  padding-left: 12px;
  padding-right: 12px;
  border-bottom: 1px solid darkgray;

  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 6px;
`;

const SearchIcon = styled.img`
  width: 20px;
  height: 20px;
`;

const SeachBar = styled.input`
  flex: 1 0 0;
  height: 26px;
  border: none;
  padding-left: 2px;
`;
