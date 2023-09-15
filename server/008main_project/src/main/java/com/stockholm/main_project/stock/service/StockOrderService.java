package com.stockholm.main_project.stock.service;

import com.stockholm.main_project.cash.entity.Cash;
import com.stockholm.main_project.cash.service.CashService;
import com.stockholm.main_project.exception.BusinessLogicException;
import com.stockholm.main_project.exception.ExceptionCode;
import com.stockholm.main_project.member.entity.Member;
import com.stockholm.main_project.member.repository.MemberRepository;
import com.stockholm.main_project.stock.dto.StockOrderResponseDto;
import com.stockholm.main_project.stock.entity.Company;
import com.stockholm.main_project.stock.entity.StockAsBi;
import com.stockholm.main_project.stock.entity.StockHold;
import com.stockholm.main_project.stock.entity.StockOrder;
import com.stockholm.main_project.stock.mapper.CompanyMapper;
import com.stockholm.main_project.stock.repository.StockHoldRepository;
import com.stockholm.main_project.stock.repository.StockOrderRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.Queue;
import java.util.stream.Collectors;

@Service
@Transactional
@Slf4j
public class StockOrderService {
    private final StockAsBiService stockAsBiService;
    private final CompanyService companyService;
    private final StockOrderRepository stockOrderRepository;
    private final MemberRepository memberRepository;
    private final StockHoldService stockHoldService;
    private final StockHoldRepository stockHoldRepository;
    private final CashService cashService;

    private final CompanyMapper companyMapper;

    public StockOrderService(StockAsBiService stockAsBiService, CompanyService companyService, StockOrderRepository stockOrderRepository, MemberRepository memberRepository, StockHoldService stockHoldService, StockHoldRepository stockHoldRepository, CashService cashService, CompanyMapper companyMapper) {
        this.stockAsBiService = stockAsBiService;
        this.companyService = companyService;
        this.stockOrderRepository = stockOrderRepository;
        this.memberRepository = memberRepository;
        this.stockHoldService = stockHoldService;
        this.stockHoldRepository = stockHoldRepository;
        this.cashService = cashService;
        this.companyMapper = companyMapper;
    }

    // 멤버, 회사 id, 가격
    public StockOrder buyStocks(Member member, long companyId, long price, int stockCount) {
        //회원 캐쉬 잔량 비교
        cashService.checkCash(price * stockCount, member); // -> 부족할 시 예외 처리
        //호가 불러오기
        StockAsBi stockAsBi = stockAsBiService.getStockAsBi(companyId);
        // 예약 구매인지 바로 구매인지 판별
        return buyDiscrimination(member, price, stockAsBi, stockCount, companyId);
    }

    private StockOrder buyDiscrimination(Member member, long price, StockAsBi stockAsBi, int stockCount, long companyId) {
        // 매도 호가와 가격이 같고, 잔량이 남아 있을 경우
        if(Long.parseLong(stockAsBi.getAskp1()) == price && Integer.parseInt(stockAsBi.getAskp_rsqn1()) > stockCount)
            return buyStock(member, price, stockCount, companyId); // 구매 로직
        else if(Long.parseLong(stockAsBi.getAskp2()) == price && Integer.parseInt(stockAsBi.getAskp_rsqn2()) > stockCount)
            return buyStock(member, price, stockCount, companyId); // 구매 로직
        else if(Long.parseLong(stockAsBi.getAskp3()) == price && Integer.parseInt(stockAsBi.getAskp_rsqn3()) > stockCount)
            return buyStock(member, price, stockCount, companyId); // 구매 로직
        else if(Long.parseLong(stockAsBi.getAskp4()) == price && Integer.parseInt(stockAsBi.getAskp_rsqn4()) > stockCount)
            return buyStock(member, price, stockCount, companyId); // 구매 로직
        else if(Long.parseLong(stockAsBi.getAskp5()) == price && Integer.parseInt(stockAsBi.getAskp_rsqn5()) > stockCount)
            return buyStock(member, price, stockCount, companyId); // 구매 로직
        else if(Long.parseLong(stockAsBi.getAskp6()) == price && Integer.parseInt(stockAsBi.getAskp_rsqn6()) > stockCount)
            return buyStock(member, price, stockCount, companyId); // 구매 로직
        else if(Long.parseLong(stockAsBi.getAskp7()) == price && Integer.parseInt(stockAsBi.getAskp_rsqn7()) > stockCount)
            return buyStock(member, price, stockCount, companyId); // 구매 로직
        else if(Long.parseLong(stockAsBi.getAskp8()) == price && Integer.parseInt(stockAsBi.getAskp_rsqn8()) > stockCount)
            return buyStock(member, price, stockCount, companyId); // 구매 로직
        else if(Long.parseLong(stockAsBi.getAskp9()) == price && Integer.parseInt(stockAsBi.getAskp_rsqn9()) > stockCount)
            return buyStock(member, price, stockCount, companyId); // 구매 로직
        else if(Long.parseLong(stockAsBi.getAskp10()) == price && Integer.parseInt(stockAsBi.getAskp_rsqn10()) > stockCount)
            return buyStock(member, price, stockCount, companyId); // 구매 로직
        else
            return reserveStock(member, price, stockCount, companyId, StockOrder.OrderTypes.BUY); //예약 구매 로직
    }

    public StockOrder buyStock(Member member, long price, int stockCount, long companyId) {
        // 보유 주식 설정
        StockHold stockHold = stockHoldService.checkStockHold(companyId, member.getMemberId());
        stockHold.setStockCount(stockHold.getStockCount() + stockCount);
        stockHold.setPrice(stockHold.getPrice() + (stockCount * price));

        // 스톡 오더 작성
        StockOrder stockOrder = new StockOrder();
        stockOrder.setOrderStates(StockOrder.OrderStates.ORDER_COMPLETE);
        stockOrder.setOrderTypes(StockOrder.OrderTypes.BUY);
        stockOrder.setStockCount(stockCount);
        stockOrder.setPrice(price);
        stockOrder.setCompany(companyService.findCompanyById(companyId));

        // 현금량 감소
        Cash cash = member.getCash();
        cash.setMoney(cash.getMoney()-(price * stockCount));
        member.setCash(cash);
        stockOrder.setMember(member);

        stockOrderRepository.save(stockOrder);
        memberRepository.save(member);
        stockHoldRepository.save(stockHold);


        return stockOrder;
    }

    // 예약 매도 일 때는 보유 주식 줄어들게(완료)
    public StockOrder reserveStock(Member member, long price, int stockCount, long companyId, StockOrder.OrderTypes types) {
        if(StockOrder.OrderTypes.SELL.equals(types)) {
            // 보유 주식 설정
            StockHold stockHold = stockHoldService.findStockHold(companyId, member.getMemberId());
            stockHold.setStockCount(stockHold.getStockCount() - stockCount);

        }
        StockOrder stockOrder = new StockOrder();
        stockOrder.setOrderStates(StockOrder.OrderStates.ORDER_WAIT);
        stockOrder.setOrderTypes(types);
        stockOrder.setStockCount(stockCount);
        stockOrder.setPrice(price);
        stockOrder.setCompany(companyService.findCompanyById(companyId));
        stockOrder.setMember(member);

        stockOrderRepository.save(stockOrder);

        return stockOrder;
    }

    public void checkOrder() {
        // 회사 리스트를 받아온다
        List<Company> companyList = companyService.findCompanies();
        // for문(회사별로)
        for(Company company : companyList) {
            // 회사 호가 리스트를 받아온다
            StockAsBi stockAsBi = stockAsBiService.getStockAsBi(company.getCompanyId());
            // 회사Id에 있는 stockOrder 중 체결 대기 상태인 stockOrder를 큐로 받아온다
            Queue<StockOrder> stockOrderQueue = getStockOrderQueue(company.getCompanyId(), StockOrder.OrderStates.ORDER_WAIT);
            //큐가 비어있지 않으면
            if(!stockOrderQueue.isEmpty()) {
                // for문(큐가 다 빌 때 까지 실행한다)
                while(!stockOrderQueue.isEmpty()) {
                    StockOrder stockOrder = stockOrderQueue.poll();
                    // 예약 매수 실행
                    if(stockOrder.getOrderTypes().equals(StockOrder.OrderTypes.BUY)) {
                        // 호가 리스트 안에 체결 대기중인 stockOrder의 조건이 맞는 것이 있으면 buyStock으로 간다
                        StockOrder buyStock = reserveBuyDiscrimination(stockAsBi, stockOrder);
                    }
                    // 예약 매도 실행
                    else {
                        StockOrder sellStock = reserveSellDiscrimination(stockAsBi, stockOrder);
                    }
                }
            }
        }
   }



    private StockOrder reserveBuyDiscrimination(StockAsBi stockAsBi, StockOrder stockOrder) {
        long price = stockOrder.getPrice();
        int stockCount = stockOrder.getStockCount();
        // 매도 호가와 가격이 같고, 잔량이 남아 있을 경우
        if(Long.parseLong(stockAsBi.getAskp1()) == price && Integer.parseInt(stockAsBi.getAskp_rsqn1()) > stockCount)
            return reserveBuyStock(stockOrder); // 구매 로직
        else if(Long.parseLong(stockAsBi.getAskp2()) == price && Integer.parseInt(stockAsBi.getAskp_rsqn2()) > stockCount)
            return reserveBuyStock(stockOrder); // 구매 로직
        else if(Long.parseLong(stockAsBi.getAskp3()) == price && Integer.parseInt(stockAsBi.getAskp_rsqn3()) > stockCount)
            return reserveBuyStock(stockOrder); // 구매 로직
        else if(Long.parseLong(stockAsBi.getAskp4()) == price && Integer.parseInt(stockAsBi.getAskp_rsqn4()) > stockCount)
            return reserveBuyStock(stockOrder); // 구매 로직
        else if(Long.parseLong(stockAsBi.getAskp5()) == price && Integer.parseInt(stockAsBi.getAskp_rsqn5()) > stockCount)
            return reserveBuyStock(stockOrder); // 구매 로직
        else if(Long.parseLong(stockAsBi.getAskp6()) == price && Integer.parseInt(stockAsBi.getAskp_rsqn6()) > stockCount)
            return reserveBuyStock(stockOrder); // 구매 로직
        else if(Long.parseLong(stockAsBi.getAskp7()) == price && Integer.parseInt(stockAsBi.getAskp_rsqn7()) > stockCount)
            return reserveBuyStock(stockOrder); // 구매 로직
        else if(Long.parseLong(stockAsBi.getAskp8()) == price && Integer.parseInt(stockAsBi.getAskp_rsqn8()) > stockCount)
            return reserveBuyStock(stockOrder); // 구매 로직
        else if(Long.parseLong(stockAsBi.getAskp9()) == price && Integer.parseInt(stockAsBi.getAskp_rsqn9()) > stockCount)
            return reserveBuyStock(stockOrder); // 구매 로직
        else if(Long.parseLong(stockAsBi.getAskp10()) == price && Integer.parseInt(stockAsBi.getAskp_rsqn10()) > stockCount)
            return reserveBuyStock(stockOrder); // 구매 로직
        else {
            return null; // 아무것도 안함
        }

    }

    private StockOrder reserveSellDiscrimination(StockAsBi stockAsBi, StockOrder stockOrder) {
        long price = stockOrder.getPrice();
        int stockCount = stockOrder.getStockCount();
        // 매도 호가와 가격이 같고, 잔량이 남아 있을 경우
        if(Long.parseLong(stockAsBi.getBidp1()) == price && Integer.parseInt(stockAsBi.getBidp_rsqn1()) > stockCount)
            return reserveSellStock(stockOrder); // 판매 로직
        else if(Long.parseLong(stockAsBi.getBidp2()) == price && Integer.parseInt(stockAsBi.getBidp_rsqn2()) > stockCount)
            return reserveSellStock(stockOrder); // 판매 로직
        else if(Long.parseLong(stockAsBi.getBidp3()) == price && Integer.parseInt(stockAsBi.getBidp_rsqn3()) > stockCount)
            return reserveSellStock(stockOrder); // 판매 로직
        else if(Long.parseLong(stockAsBi.getBidp4()) == price && Integer.parseInt(stockAsBi.getBidp_rsqn4()) > stockCount)
            return reserveSellStock(stockOrder); // 판매 로직
        else if(Long.parseLong(stockAsBi.getBidp5()) == price && Integer.parseInt(stockAsBi.getBidp_rsqn5()) > stockCount)
            return reserveSellStock(stockOrder); // 판매 로직
        else if(Long.parseLong(stockAsBi.getBidp6()) == price && Integer.parseInt(stockAsBi.getBidp_rsqn6()) > stockCount)
            return reserveSellStock(stockOrder); // 판매 로직
        else if(Long.parseLong(stockAsBi.getBidp7()) == price && Integer.parseInt(stockAsBi.getBidp_rsqn7()) > stockCount)
            return reserveSellStock(stockOrder); // 판매 로직
        else if(Long.parseLong(stockAsBi.getBidp8()) == price && Integer.parseInt(stockAsBi.getBidp_rsqn8()) > stockCount)
            return reserveSellStock(stockOrder); // 판매 로직
        else if(Long.parseLong(stockAsBi.getBidp9()) == price && Integer.parseInt(stockAsBi.getBidp_rsqn9()) > stockCount)
            return reserveSellStock(stockOrder); // 판매 로직
        else if(Long.parseLong(stockAsBi.getBidp10()) == price && Integer.parseInt(stockAsBi.getBidp_rsqn10()) > stockCount)
            return reserveSellStock(stockOrder); // 판매 로직
        else
            return null; // 아무것도 안함

    }

    // 예약된 매수 -> 구매 상태로 바구기
    public StockOrder reserveBuyStock(StockOrder stockOrder) {
        Optional<StockOrder> optionalStockOrder = stockOrderRepository.findById(stockOrder.getStockOrderId());
        StockOrder updateStockOrder = optionalStockOrder.get();
        updateStockOrder.setOrderStates(StockOrder.OrderStates.ORDER_COMPLETE);
        updateStockOrder.setOrderTypes(StockOrder.OrderTypes.BUY);
        // 보유 주식 설정
        StockHold stockHold = stockHoldService.checkStockHold(stockOrder.getCompany().getCompanyId(), stockOrder.getMember().getMemberId());
        stockHold.setStockCount(stockHold.getStockCount() + stockOrder.getStockCount());
        stockHold.setPrice(stockHold.getPrice() + (stockOrder.getStockCount() * stockOrder.getPrice()));
        // 현금량 감소
        Member member = updateStockOrder.getMember();
        Cash cash = member.getCash();
        cash.setMoney(cash.getMoney()-(stockOrder.getPrice() * stockOrder.getStockCount()));
        member.setCash(cash);
        stockOrder.setMember(member);

        stockOrderRepository.save(stockOrder);
        memberRepository.save(member);
        stockHoldRepository.save(stockHold);

        return stockOrder;
    }

    // 예약 매도 -> 판매로 바뀔 때 금액 늘어나게, 보유 주식은 예약 할 때 줄어들도록
    // Price 줄어드는 금액은 주식 투자금액 - (주식 투자 금액 / 보유 주식 개수) * 팔 주식 개수 (완료)
    public StockOrder reserveSellStock(StockOrder stockOrder) {
        Optional<StockOrder> optionalStockOrder = stockOrderRepository.findById(stockOrder.getStockOrderId());
        StockOrder updateStockOrder = optionalStockOrder.get();
        updateStockOrder.setOrderStates(StockOrder.OrderStates.ORDER_COMPLETE);
        updateStockOrder.setOrderTypes(StockOrder.OrderTypes.SELL);
        // 보유 주식 설정
        StockHold stockHold = stockHoldService.findStockHold(stockOrder.getCompany().getCompanyId(), stockOrder.getMember().getMemberId());
        stockHold.setPrice(stockHold.getPrice() - (stockHold.getPrice() / stockHold.getStockCount()) * stockOrder.getStockCount());
        // 현금량 증가
        Member member = updateStockOrder.getMember();
        Cash cash = member.getCash();
        cash.setMoney(cash.getMoney() + (stockOrder.getPrice() * stockOrder.getStockCount()));
        member.setCash(cash);
        stockOrder.setMember(member);

        stockOrderRepository.save(stockOrder);
        memberRepository.save(member);
        if(stockHold.getStockCount() == 0)
            stockHoldRepository.delete(stockHold);
        else
            stockHoldRepository.save(stockHold);

        return stockOrder;
    }

    // 멤버, 회사 id, 가격
    public StockOrder sellStocks(Member member, long companyId, long price, int stockCount) {
        // 내가 주식을 가지고 있는지 없는지 판별
        StockHold stockHold = stockHoldService.findStockHold(companyId, member.getMemberId());
        if(stockHold.getStockCount() < stockCount)
            throw new BusinessLogicException(ExceptionCode.INSUFFICIENT_STOCK);
        else {
            //호가 불러오기
            StockAsBi stockAsBi = stockAsBiService.getStockAsBi(companyId);
            // 예약 판매인지 바로 판매인지 판별
            return sellDiscrimination(member, price, stockAsBi, stockCount, companyId);
        }

    }

    // 매도 판별해서 실행
    public StockOrder sellDiscrimination(Member member, long price, StockAsBi stockAsBi, int stockCount, long companyId) {
        // 매도 호가와 가격이 같고, 잔량이 남아 있을 경우
        if(Long.parseLong(stockAsBi.getBidp1()) == price && Integer.parseInt(stockAsBi.getBidp1()) > stockCount)
            return sellStock(member, price, stockCount, companyId); // 판매 로직
        else if(Long.parseLong(stockAsBi.getBidp2()) == price && Integer.parseInt(stockAsBi.getBidp_rsqn2()) > stockCount)
            return sellStock(member, price, stockCount, companyId); // 판매 로직
        else if(Long.parseLong(stockAsBi.getBidp3()) == price && Integer.parseInt(stockAsBi.getBidp_rsqn3()) > stockCount)
            return sellStock(member, price, stockCount, companyId); // 판매 로직
        else if(Long.parseLong(stockAsBi.getBidp4()) == price && Integer.parseInt(stockAsBi.getBidp_rsqn4()) > stockCount)
            return sellStock(member, price, stockCount, companyId); // 판매 로직
        else if(Long.parseLong(stockAsBi.getBidp5()) == price && Integer.parseInt(stockAsBi.getBidp_rsqn5()) > stockCount)
            return sellStock(member, price, stockCount, companyId); // 판매 로직
        else if(Long.parseLong(stockAsBi.getBidp6()) == price && Integer.parseInt(stockAsBi.getBidp_rsqn6()) > stockCount)
            return sellStock(member, price, stockCount, companyId); // 판매 로직
        else if(Long.parseLong(stockAsBi.getBidp7()) == price && Integer.parseInt(stockAsBi.getBidp_rsqn7()) > stockCount)
            return sellStock(member, price, stockCount, companyId); // 판매 로직
        else if(Long.parseLong(stockAsBi.getBidp8()) == price && Integer.parseInt(stockAsBi.getBidp_rsqn8()) > stockCount)
            return sellStock(member, price, stockCount, companyId); // 판매 로직
        else if(Long.parseLong(stockAsBi.getBidp9()) == price && Integer.parseInt(stockAsBi.getBidp_rsqn9()) > stockCount)
            return sellStock(member, price, stockCount, companyId); // 판매 로직
        else if(Long.parseLong(stockAsBi.getBidp10()) == price && Integer.parseInt(stockAsBi.getBidp_rsqn10()) > stockCount)
            return sellStock(member, price, stockCount, companyId); // 판매 로직
        else
            return reserveStock(member, price, stockCount, companyId, StockOrder.OrderTypes.SELL); //예약 판매 로직
    }

    public StockOrder sellStock(Member member, long price, int stockCount, long companyId) {
        // 보유 주식 설정
        StockHold stockHold = stockHoldService.findStockHold(companyId, member.getMemberId());
        stockHold.setPrice(stockHold.getPrice() - (stockHold.getPrice() / stockHold.getStockCount()) * stockCount);
        stockHold.setStockCount(stockHold.getStockCount() - stockCount);

        // 스톡 오더 작성
        StockOrder stockOrder = new StockOrder();
        stockOrder.setOrderStates(StockOrder.OrderStates.ORDER_COMPLETE);
        stockOrder.setOrderTypes(StockOrder.OrderTypes.SELL);
        stockOrder.setStockCount(stockCount);
        stockOrder.setPrice(price);
        stockOrder.setCompany(companyService.findCompanyById(companyId));

        // 현금량 증가
        Cash cash = member.getCash();
        cash.setMoney(cash.getMoney()+(price * stockCount));
        member.setCash(cash);
        stockOrder.setMember(member);



        stockOrderRepository.save(stockOrder);
        memberRepository.save(member);
        if(stockHold.getStockCount() == 0)
            stockHoldRepository.delete(stockHold);
        else
            stockHoldRepository.save(stockHold);

        return stockOrder;
    }


    // 거래 대기중인 매수 StockOrder 불러오기
   public Queue<StockOrder> getStockOrderQueue(long companyId, StockOrder.OrderStates orderStates) {
        List<StockOrder> stockOrderList = stockOrderRepository.findAllByCompanyCompanyIdAndOrderStates(companyId, orderStates);
        Queue<StockOrder> stockOrderQueue = new LinkedList<>(stockOrderList);

        return stockOrderQueue;
   }

    // 멤버의 모든 주식 거래내역 삭제하기
    public void deleteStockOrders(Member member) {
        List<StockOrder> stockOrders = stockOrderRepository.findAllByMember_MemberId(member.getMemberId());

        stockOrderRepository.deleteAll(stockOrders);
    }

    // 멤버의 모든 StockOrders 불러오기
    public List<StockOrderResponseDto> getMemberStockOrders(long memberId) {
        List<StockOrder> stockOrders = stockOrderRepository.findAllByMember_MemberIdOrderByModifiedAtDesc(memberId);
        List<StockOrderResponseDto> stockOrderRepositories = stockOrders.stream()
                .map(stockOrder -> companyMapper.stockOrderToStockOrderResponseDto(stockOrder)).collect(Collectors.toList());

        return stockOrderRepositories;
    }

    // 미체결 stockOrder 취소하는 메소드
    // 취소한 주식 수 만큼 보유주식으로 돌아오게 해야함
    public void deleteStockOrder(Member member, long stockOrderId, int stockCount) {
        Optional<StockOrder> optionalStockOrder = stockOrderRepository.findById(stockOrderId);
        StockOrder stockOrder = optionalStockOrder.orElseThrow(() -> new BusinessLogicException(ExceptionCode.STOCKORDER_NOT_FOUND));

        if(stockOrder.getMember().getMemberId() != member.getMemberId()) {
            throw new BusinessLogicException(ExceptionCode.STOCKORDER_PERMISSION_DENIED);
        }
        else if(!stockOrder.getOrderStates().equals(StockOrder.OrderStates.ORDER_WAIT))
            throw new BusinessLogicException(ExceptionCode.STOCKORDER_ALREADY_FINISH);
        // 수량 선택해서 취소 할 수 있게(취소한 만큼 보유 주식 돌아오게) 0이 되면 미체결 스톡 오더 삭제
        else {
            if(stockOrder.getStockCount() <= stockCount)
                stockOrderRepository.delete(stockOrder);
            else {
                stockOrder.setStockCount(stockOrder.getStockCount() - stockCount);
            }
            if(StockOrder.OrderTypes.SELL.equals(stockOrder.getOrderTypes())) {
                StockHold stockHold = stockHoldService.findStockHold(stockOrder.getCompany().getCompanyId(), stockOrder.getMember().getMemberId());
                stockHold.setStockCount(stockHold.getStockCount() + stockCount);
            }

        }


    }
}
