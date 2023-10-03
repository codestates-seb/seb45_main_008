import { useSelector, useDispatch } from "react-redux";
import { setCompareStock } from "../../reducer/CompareChart-Reducer";
import { StateProps } from "../../models/stateProps";
import { styled } from "styled-components";

const CompareList = (props: OwnProps) => {
  const { corpName, compareCompanyId } = props;

  const dispatch = useDispatch();
  const currentCompanyid = useSelector((state: StateProps) => state.companyId);

  const handleSelectCompareStock = () => {
    if (currentCompanyid !== compareCompanyId) {
      dispatch(setCompareStock(compareCompanyId));
    }
  };

  return (
    <Contianer onClick={handleSelectCompareStock} corpName={corpName}>
      {corpName}
    </Contianer>
  );
};
export default CompareList;

interface OwnProps {
  corpName: string;
  compareCompanyId: number | null;
}

const Contianer = styled.div<{ corpName: string }>`
  color: ${(props) => props.corpName === "비교차트 제거" && "#19488a"};

  &:hover {
    color: #19488a;
    transition: color 0.3s ease;
    cursor: pointer;
  }
`;
