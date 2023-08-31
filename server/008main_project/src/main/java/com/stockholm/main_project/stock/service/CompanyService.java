package com.stockholm.main_project.stock.service;

import com.stockholm.main_project.stock.entity.Company;
import com.stockholm.main_project.stock.entity.StockAsBi;
import com.stockholm.main_project.stock.repository.CompanyRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CompanyService {
    private final CompanyRepository companyRepository;

    public CompanyService(CompanyRepository companyRepository) {
        this.companyRepository = companyRepository;
    }

    // 특정 회사  리턴
    public Company getCompany(String stockCode) {
        Company company = companyRepository.findByCode(stockCode);
        return company;
    }

    // 모든 회사 리턴
    public List<Company> getCompanies() {
        List<Company> companies = companyRepository.findAll();

        return companies;
    }


    // 특정 회사 저장
    public Company saveCompany(Company company) {
        return companyRepository.save(company);
    }

    // 모든 회사 저장
    public List<Company> saveCompanies(List<Company> companies) {
        return companyRepository.saveAll(companies);
    }

}


//    public void fillCompaines() {
//        List<String> korName = List.of("삼성전자", "POSCO홀딩스", "셀트리온", "에코프로", "에코프로비엠", "디와이", "쿠쿠홀딩스", "카카오뱅크", "한세엠케이", "KG케미칼", "LG화학", "현대차", "LG전자", "기아");
//        List<String> code = List.of("005930", "005490", "068270", "086520", "247540", "013570", "192400", "323410", "069640", "001390", "051910", "005380", "066570", "000270");
//
//        for(int i = 0; i < code.size(); i++) {
//            Company company = new Company();
//            company.setStockAsBi(new StockAsBi());
//            company.setCode(code.get(i));
//            company.setKorName(korName.get(i));
//
//            companyRepository.save(company);
//        }
//    }