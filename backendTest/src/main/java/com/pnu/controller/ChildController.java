package com.pnu.controller;

import java.io.IOException;
import java.time.LocalDate;
import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.pnu.DTO.ChildDTO;
import com.pnu.domain.Child;
import com.pnu.domain.ChildVaccine;
import com.pnu.service.ChildService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/child")
public class ChildController {
	
	private final ChildService childService;
	
	@PostMapping
	public Child registerChild(@RequestParam(value = "file", required = false) MultipartFile file,@RequestParam("childName") String childName,
							  @RequestParam("member") String member,@RequestParam("birth") LocalDate birth) throws IOException {
		System.out.println("ChildController registerChild");
		ChildDTO child = ChildDTO.builder()
							  .childName(childName)
							  .member(member)
							  .birth(birth)
							  .image(file)
							  .build();
		return childService.registerChild(child);
	} 

	@PutMapping("/updateVaccines")
	public List<ChildVaccine> selectVaccine(Integer child_idx,@RequestParam(defaultValue = "0") String vaccine_idx) {
		System.out.println("ChildController selectVaccine");
		return childService.selectVaccine(child_idx,vaccine_idx);
	}
	
	@GetMapping
	public Child getChild(Integer idx) {
		System.out.println("ChildController findChid");
		return childService.getChild(idx);
	}
	
	@GetMapping("/getChildren")
	public List<Child> getChildren(String email) {
		System.out.println("ChildController findChild");
		return childService.getChildren(email);
	}
	
	@DeleteMapping
	public void deleteChild(Integer child_idx) {
		System.out.println("ChildController deleteChild");
		childService.deleteChild(child_idx);
	}
	
	@GetMapping("/checkVaccines")
	public List<Integer> checkVaccine(Integer child_idx){
		return childService.checkVaccine(child_idx);
	}
	
	@GetMapping("/scheduleVaccines")
	public List<ChildVaccine> scheduleVaccine(Integer child_idx){
		return childService.scheduleVaccine(child_idx);
	}
	
	@PutMapping
	public Child updateChild(@RequestParam(value = "file", required = false) MultipartFile file,@RequestParam("childName") String childName,
							  @RequestParam("idx") int idx,@RequestParam("birth") LocalDate birth) throws IOException {
		System.out.println("ChildController updateChild");
		ChildDTO child = ChildDTO.builder()
							  .childName(childName)
							  .idx(idx)
							  .birth(birth)
							  .image(file)
							  .build();
		return childService.updateChild(child);
	} 


}
