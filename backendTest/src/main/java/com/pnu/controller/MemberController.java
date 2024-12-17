package com.pnu.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.pnu.domain.Member;
import com.pnu.persistence.MemberRepository;
import com.pnu.service.MemberService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequiredArgsConstructor
public class MemberController {

	private final MemberService memberService;
	private final MemberRepository memRepo;
	
	 @GetMapping("/register")
	 public ResponseEntity<?> getMembers() {
		 System.out.println("MemberController getMembers"); //확인용 
		 log.info("getMembers: All");
		 return ResponseEntity.ok(memberService.getMembers()); 
	}
	 
	//회원 가입
	@PostMapping("/register")
	public Member registerMember(@RequestBody Member member){
		System.out.println("MemberController registerMember"); //확인용 
		return memberService.registerMember(member);
	}
	
	//회원 가입시 이메일 중복 체크
	@GetMapping("/findMember")
	public boolean findMember(Member member) {
		System.out.println("MemberController findMember"); //확인용 
		return memberService.findMember(member);
	}
	
	@GetMapping("/data")
	public ResponseEntity<Member> getUserData(Authentication authentication){
		String username = authentication.getName();
		
		Member member = memRepo.findById(username).orElse(null);
		
		if(member != null) {
			return ResponseEntity.ok(member);
		} else {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
		}
	}

}
