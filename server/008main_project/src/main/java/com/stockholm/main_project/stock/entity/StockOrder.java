package com.stockholm.main_project.stock.entity;

import com.stockholm.main_project.audit.Auditable;
import com.stockholm.main_project.member.entity.Member;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class StockOrder extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long stockOrderId;

    @Column
    private int stockCount;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "MEMBER_ID")
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "COMPANY_ID")
    private Company company;

    @Enumerated(value = EnumType.STRING)
    @Column(length = 20, nullable = false)
    private OrderTypes OrderTypes;

    @Enumerated(value = EnumType.STRING)
    @Column(length = 20, nullable = false)
    private OrderStatus OrderStatus;

    @Column
    private long price;

    public enum OrderTypes {
        SELL("매도"),
        BUY("매수");
        @Getter
        private String types;

        OrderTypes(String types) { this.types = types; }
    }

    public enum OrderStatus {
        ORDER_COMPLETE("채결 완료"),
        ORDER_WAIT("체결 대기");
        @Getter
        private String status;

        OrderStatus(String status) {
            this.status = status;
        }
    }
}
