package com.pnu.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.pnu.domain.VaccineInfo;
import com.pnu.persistence.VaccineInfoRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class VaccineInfoService {
	
	private final VaccineInfoRepository vacRepo;
	
	//백신 전체 데이터 전달
	public List<VaccineInfo> getVaccines() {
		System.out.println("VaccineInfoService getVaccines");
		return vacRepo.findAll();
	}

}
