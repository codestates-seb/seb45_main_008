package com.stockholm.main_project.stock;

import com.stockholm.main_project.member.entity.Member;
import com.stockholm.main_project.member.repository.MemberRepository;
import com.stockholm.main_project.stock.dto.CompanyResponseDto;
import com.stockholm.main_project.stock.repository.CompanyRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

@DataJpaTest
public class StockOrderService {
    private MemberRepository memberRepository;
    private StockOrderService stockOrderService;

    public StockOrderService(StockOrderService stockOrderService) {
        this.stockOrderService = stockOrderService;
    }


    @Test
    public void buyStock() {
        //given
        //when

        //then
    }
}
