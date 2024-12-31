package com.pnu.service;

import java.util.ArrayList;
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
	
	//아이 등록
	public Child registerChild(ChildDTO childDTO) {
		System.out.println("ChildService registerChild");
		Member member = memberRepo.findById(childDTO.getMember()).orElse(null);
		if(member == null) return null;
		Child child = childRepo.save(Child.builder()
							   .childName(childDTO.getChildName())
							   .member(member)
							   .birth(childDTO.getBirth())
							   .build());
		
		//출생일 기준 백신 접종일 초기화
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
	
	//접종한 백신 정보 입력
	public List<ChildVaccine> selectVaccine(Integer idx,String num) {
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
	
	public Child getChild(Integer idx) {
		System.out.println("ChildController getChild");
		return childRepo.findById(idx).orElse(null);
	}
	
	//아이 전체 정보
	public List<Child> getChildren(String email) {
		System.out.println("ChildController findChildren");
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
	
	//아이 정보 삭제
	public void deleteChild(Integer idx) {
		childRepo.deleteById(idx);
	}
	
	//접종한 백신 넘버 넘버
	public List<Integer> checkVaccine(Integer idx) {
		List<ChildVaccine> child = chVaRepo.selectChildIdx(idx);
		List<Integer> vaccineNum = new ArrayList<>();
		
		for(ChildVaccine ch : child) {
			if(ch.isProof()) vaccineNum.add(ch.getVaccine().getIdx());
		}
		return vaccineNum;
	}
	
	//접종 일정표
	public List<ChildVaccine> scheduleVaccine(Integer idx) {
		List<ChildVaccine> child = chVaRepo.selectChildIdx(idx);
		List<ChildVaccine> schedule = new ArrayList<>();
		int num = child.size();
		for(int i = 0 ; i < num ; i++) {
			if(!child.get(i).isProof()) schedule.add(child.get(i));
		}
		return schedule;
	}
	
	// 아이 정보 수정
	public Child updateChild(Child child) {
		Child ch = childRepo.findById(child.getIdx()).get();
		
		if(child.getChildName() != null) ch.setChildName(child.getChildName());
		if(child.getBirth() != null) {
			ch.setBirth(child.getBirth());
			//출생일 기준 백신 접종일 초기화
			List<VaccineInfo> vaccines= vaccineRepo.findAll();
			List<ChildVaccine> childVaccine = chVaRepo.selectChildIdx(child.getIdx());
			int[] month = {0,1,1,2,4,6,12,15,18,19,24,36,60,120,132};
			for(int i = 0 ; i < vaccines.size() ; i++) {
				int from = vaccines.get(i).getPeriodFrom();
				int to = vaccines.get(i).getPeriodTo();
				childVaccine.get(i).setScheduledFrom(child.getBirth().plusMonths(month[from]));
				childVaccine.get(i).setScheduledTo(child.getBirth().plusMonths(month[to]));
				chVaRepo.save(childVaccine.get(i));
			}
			
		}
		return childRepo.save(ch);
		
	}

	
}
