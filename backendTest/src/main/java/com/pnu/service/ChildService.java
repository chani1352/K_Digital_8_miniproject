package com.pnu.service;

import java.util.List;

import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import com.pnu.domain.Child;
import com.pnu.domain.ChildDTO;
import com.pnu.domain.ChildVaccine;
import com.pnu.domain.Member;
import com.pnu.domain.VaccineInfo;
import com.pnu.persistence.ChildRepository;
import com.pnu.persistence.ChildVaccineRepository;
import com.pnu.persistence.MemberRepository;
import com.pnu.persistence.VaccineInfoRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ChildService {

	private final ChildRepository childRepo;
	private final ChildVaccineRepository chVaRepo;
	private final MemberRepository memberRepo;
	private final VaccineInfoRepository vaccineRepo;
	
	public Child registerChild(ChildDTO childDTO) {
		System.out.println("ChildService registerChild");
		Member member = memberRepo.findById(childDTO.getMember()).orElse(null);
		if(member == null) return null;
		Child child = childRepo.save(Child.builder()
							   .childName(childDTO.getChildName())
							   .member(member)
							   .birth(childDTO.getBirth())
							   .build());
		
		
		List<VaccineInfo> vaccines= vaccineRepo.findAll();
		for(VaccineInfo vaccine : vaccines) {
			ChildVaccine childVaccine = new ChildVaccine();
			childVaccine.setChild(child);
			childVaccine.setVaccine(vaccine);
			chVaRepo.save(childVaccine);
		}
		

		return child;
	}
	
	public ChildVaccine registerVaccine(ChildVaccine chVa) {
		System.out.println("ChildService registerVaccine");
		return chVaRepo.save(chVa);
	}
	
	public List<Child> getChild(Authentication authentication) {
		System.out.println("ChildController findChild");
		String email = authentication.getName();
		List<Child> childList = childRepo.queryGetChild(email);
		return childList;
	}
	
	
}
