package com.pnu.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pnu.service.VaccineInfoService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/findVaccine")
public class VaccineInfoController {
	private final VaccineInfoService vaccineService;
	
	@GetMapping
	public ResponseEntity<?> getVaccines(){
		System.out.println("VaccineInfoController getVaccines");
		log.info("getVaccines: All");
		return ResponseEntity.ok(vaccineService.getVaccines());
	}

}
