package com.stockholm.main_project.stock.entity;

import com.stockholm.main_project.audit.Auditable;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Company extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long companyId;

    @OneToOne(mappedBy = "company", cascade = CascadeType.ALL)
    private StockAsBi stockAsBi;

    @Column
    private String code;

    @Column
    private String korName;

    @Column
    private String information;
}
