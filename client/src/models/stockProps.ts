export interface StockProps {
  stockMinId: number;
  companyId: number;
  stockTradeTime: string;
  stck_cntg_hour: string;
  stck_prpr: string;
  stck_oprc: string;
  stck_hgpr: string;
  stck_lwpr: string;
}

export interface HoldingStockProps {
  companyId: number;
  companyKorName: string;
  memberId: number;
  percentage: number;
  price: number;
  stockCount: number;
  stockHoldId: number;
}

export interface OrderRecordProps {
  companyId: number;
  memberId: number;
  orderStates: string;
  orderTypes: string;
  price: number;
  stockCount: number;
  stockOrderId: number;
}

export interface orderWaitProps {
  companyId: number;
  memberId: number;
  orderStates: string;
  orderTypes: string;
  price: number;
  stockCount: number;
  stockOrderId: number;
}
