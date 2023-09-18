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
public class StockHold extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long stockHoldId;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "MEMBER_ID")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Member member;

    @ManyToOne
    @JoinColumn(name = "COMPANY_ID")
    private Company company;

    @Column
    private int stockCount;

    @Column
    private int reserveStockCount;

    @Column
    private long price;

}
