import { useSelector, useDispatch } from "react-redux";
import { setCompareStock } from "../../reducer/compareChart-Reducer";
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

  return <Contianer onClick={handleSelectCompareStock}>{corpName}</Contianer>;
};
export default CompareList;

interface OwnProps {
  corpName: string;
  compareCompanyId: number;
}

const Contianer = styled.div`
  &:hover {
    color: #19488a;
    transition: color 0.3s ease;
    cursor: pointer;
  }
`;
