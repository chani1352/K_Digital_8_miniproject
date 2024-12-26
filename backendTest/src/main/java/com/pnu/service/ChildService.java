package com.pnu.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.pnu.DTO.ChildDTO;
import com.pnu.domain.Child;
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
		int[] month = {0,1,1,2,4,6,12,15,18,19,24,36,60,120,132};
		for(VaccineInfo vaccine : vaccines) {
			int from = vaccine.getPeriodFrom();
			int to = vaccine.getPeriodTo();
			ChildVaccine childVaccine = new ChildVaccine();
			childVaccine.setChild(child);
			childVaccine.setVaccine(vaccine);
			childVaccine.setScheduledFrom(childDTO.getBirth().plusMonths(month[from]));
			childVaccine.setScheduledTo(childDTO.getBirth().plusMonths(month[to]));
			chVaRepo.save(childVaccine);
		}
		return child;
	}
	
	public List<ChildVaccine> selectVaccine(Integer idx,String num) {
		System.out.println("idx : " + idx);
		System.out.println("num : " + num);
		String[] list = num.split(",");
		int index = 0;
		List<ChildVaccine> child = chVaRepo.selectChildIdx(idx);
		for(ChildVaccine ch : child) {
			if(list.length > index && ch.getVaccine().getIdx() == Integer.parseInt(list[index])) {
				ch.setProof(true);
				index++;
			} else {
				ch.setProof(false);
			}
			chVaRepo.save(ch);
		}
		return child;
	}
	
	
	public ChildVaccine registerVaccine(ChildVaccine chVa) {
		System.out.println("ChildService registerVaccine");
		return chVaRepo.save(chVa);
	}
	
	public List<Child> getChild(String email) {
		System.out.println("ChildController findChild");
		List<Child> childList = childRepo.queryGetChild(email);
		for(Child ch : childList) {
			int idx = ch.getIdx();
			int option = childRepo.queryGetOption(idx);
			int mandatory = childRepo.queryGetMandatory(idx);
			ch.setOptional(option);
			ch.setMandatory(mandatory);
			childRepo.save(ch);
		}
		return childList;
	}

	
}
