package com.pnu.controller;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.pnu.DTO.ChildDTO;
import com.pnu.domain.Child;
import com.pnu.domain.ChildVaccine;
import com.pnu.service.ChildService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class ChildController {
	
	private final ChildService childService;
	
	@PostMapping("/registerChild")
	public Child registerChild(@RequestBody ChildDTO child) {
		System.out.println("ChildController registerChild");
		System.out.println("child : " + child.toString());
		return childService.registerChild(child);
	} 
	
	@PutMapping("/selectVaccine")
	public List<ChildVaccine> selectVaccine(Integer child_idx,@RequestParam(defaultValue = "0") String vaccine_idx) {
		System.out.println("ChildController selectVaccine");
		return childService.selectVaccine(child_idx,vaccine_idx);
	}

	
	
	@PostMapping("/registerVaccine")
	public ChildVaccine registerVaccine(ChildVaccine chVa) {
		System.out.println("ChildController registerVaccine");
		return childService.registerVaccine(chVa);
	}
	
	@GetMapping("/getChild")
	public List<Child> getChild(String email) {
		System.out.println("ChildController findChild");
		return childService.getChild(email);
	}
	
	@DeleteMapping("/deleteChild")
	public void deleteChild(Integer child_idx) {
		System.out.println("ChildController deleteChild");
		childService.deleteChild(child_idx);
	}
	
	@GetMapping("/checkVaccine")
	public List<Integer> checkVaccine(Integer child_idx){
		return childService.checkVaccine(child_idx);
	}
	
	@GetMapping("/scheduleVaccine")
	public List<ChildVaccine> scheduleVaccine(Integer child_idx){
		return childService.scheduleVaccine(child_idx);
	}
	
	
	
	
	@PutMapping("/updateChild")
	public Child updateChild(Child child) {
		return childService.updateChild(child);
	}


}
