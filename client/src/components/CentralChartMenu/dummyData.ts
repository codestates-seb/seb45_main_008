import dummyImg from "../../asset/CentralSectionMenu-dummyImg.png";

export const dummyData: dummyProps = {
  corpLogo: dummyImg,
  corpName: "카카오",
  stockCode: "035720",
  stockPrice: "48,600",
  changeRate: "+1.25%",
  changeAmount: "▲600",
  totalVolume: "864,728",
  totalValue: "419억 1,468만",
};

interface dummyProps {
  corpLogo: string;
  corpName: string;
  stockCode: string;
  stockPrice: string;
  changeRate: string;
  changeAmount: string;
  totalVolume: string;
  totalValue: string;
}
