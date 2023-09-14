package com.stockholm.main_project.stock.entity;

import com.stockholm.main_project.audit.Auditable;
import com.stockholm.main_project.member.entity.Member;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class StockOrder extends Auditable{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long stockOrderId;

    @Column
    private int stockCount;

    @ManyToOne()
    @JoinColumn(name = "MEMBER_ID")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Member member;

    @ManyToOne()
    @JoinColumn(name = "COMPANY_ID")
    private Company company;

    @Enumerated(value = EnumType.STRING)
    @Column(length = 20, nullable = false)
    private OrderTypes orderTypes;

    @Enumerated(value = EnumType.STRING)
    @Column(length = 20, nullable = false)
    private OrderStates orderStates;

    @Column
    private long price;

    public enum OrderTypes {
        SELL("매도"),
        BUY("매수");
        @Getter
        @Setter
        private String types;

        OrderTypes(String types) { this.types = types; }
    }

    public enum OrderStates {
        ORDER_COMPLETE("채결 완료"),
        ORDER_WAIT("체결 대기");
        @Getter
        @Setter
        private String states;

        OrderStates(String status) {
            this.states = status;
        }
    }

}
