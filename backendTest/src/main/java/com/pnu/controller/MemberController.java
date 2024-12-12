package com.pnu.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.pnu.domain.Member;
import com.pnu.service.MemberService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequiredArgsConstructor
public class MemberController {

	private final MemberService memberService;
	
	 @GetMapping("/register")
	 public ResponseEntity<?> getMembers() {
		 log.info("getMembers: All");
		 return ResponseEntity.ok(memberService.getMembers()); 
	}
	 
	//회원 가입
	@PostMapping("/register")
	public Member registerMember(@RequestBody Member member){
		return memberService.registerMember(member);
	}
	
	//회원 가입시 이메일 중복 체크
	@GetMapping("/findMember")
	public boolean findMember(Member member) {
		return memberService.findMember(member);
	}
	

}
