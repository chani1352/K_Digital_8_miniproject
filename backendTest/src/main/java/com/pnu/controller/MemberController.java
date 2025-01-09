package com.pnu.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pnu.domain.Member;
import com.pnu.service.MemberService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/member")
public class MemberController {

	private final MemberService memberService;
	 
	@PostMapping
	public Member registerMember(@RequestBody Member member){
		System.out.println("MemberController registerMember"); //확인용 
		return memberService.registerMember(member);
	}
	
	@GetMapping("/checkDuple")
	public boolean findMember(String email) {
		System.out.println("MemberController findMember"); //확인용 
		return memberService.findMember(email);
	}
	
	@GetMapping
	public ResponseEntity<Member> getUserData(Authentication authentication){
		System.out.println("MemberController getUserData"); //확인용 
		return memberService.getUserData(authentication);
	}
	
	@PutMapping
	public Member updateMember(@RequestBody Member member) {
		return memberService.updateMember(member);
	}

}
