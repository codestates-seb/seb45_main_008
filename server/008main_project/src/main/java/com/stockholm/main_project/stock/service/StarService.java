package com.stockholm.main_project.stock.service;

import com.stockholm.main_project.member.entity.Member;
import com.stockholm.main_project.stock.dto.StarResponseDto;
import com.stockholm.main_project.stock.entity.Star;
import com.stockholm.main_project.stock.mapper.StockMapper;
import com.stockholm.main_project.stock.repository.StarRepository;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
public class StarService {
    private final StarRepository starRepository;
    private final CompanyService companyService;
    private final StockMapper stockMapper;

    public StarService(StarRepository starRepository, CompanyService companyService, StockMapper stockMapper) {
        this.starRepository = starRepository;
        this.companyService = companyService;
        this.stockMapper = stockMapper;
    }

    public void saveStar(Member member, long companyId) {
        Star star = new Star();

        star.setMember(member);
        star.setCompany(companyService.findCompanyById(companyId));

        starRepository.save(star);
    }

    public void deleteStar(Member member, long companyId) {
        Star star = starRepository.findByMember_MemberIdAndCompanyCompanyId(member.getMemberId(), companyId);

        starRepository.delete(star);
    }

    public List<StarResponseDto> getStarResponseDtoList(Member member) {
        List<Star> stars = starRepository.findAllByMember_MemberId(member.getMemberId());
        List<StarResponseDto> starResponseDtos =  stockMapper.starsToStarResponseDtos(stars);

        return starResponseDtos;
    }
}
