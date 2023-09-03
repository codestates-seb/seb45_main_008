// dummyData
export const dummyPrice: dummyProps[] = [
  { price: 200, changeRate: 90, volume: 300 },
  { price: 190, changeRate: 90, volume: 500 },
  { price: 180, changeRate: 80, volume: 120 },
  { price: 170, changeRate: 70, volume: 78 },
  { price: 160, changeRate: 60, volume: 55 },
  { price: 150, changeRate: 50, volume: 91 },
  { price: 140, changeRate: 40, volume: 300 },
  { price: 130, changeRate: 30, volume: 10 },
  { price: 120, changeRate: 20, volume: 80 },
  { price: 110, changeRate: 10, volume: 40 },
  { price: 100, changeRate: 0, volume: 180 },
  { price: 90, changeRate: -10, volume: 250 },
  { price: 80, changeRate: -20, volume: 1000 },
  { price: 70, changeRate: -30, volume: 900 },
  { price: 60, changeRate: -40, volume: 850 },
  { price: 50, changeRate: -50, volume: 154 },
  { price: 40, changeRate: -60, volume: 820 },
  { price: 30, changeRate: -70, volume: 1100 },
  { price: 20, changeRate: -80, volume: 800 },
  { price: 10, changeRate: -90, volume: 500 },
];
export const standardPrice = 100;
export const upperPriceVolumeSum = 1000;
export const lowerPriceVolumeSum = 2000;
export const availableMoney = 10000000;

// dummy 관련 변수
interface dummyProps {
  price: number;
  changeRate: number;
  volume: number;
}
