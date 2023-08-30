import { Link } from "react-router-dom";
import styled from "styled-components";

export const TabNavArea = styled.div`
  display: flex;
  width: 100%;
  height: 50px;
  justify-content: space-around;
  align-items: center;
`;
export const Nav = styled(Link)`
  text-align: center;
  font-size: 12px;
  width: 100px;
  height: 30px;
  background-color: white;
  color: black;
  &:focus {
    height: 40px;
    transition: all 0.4s;
  }
`;
