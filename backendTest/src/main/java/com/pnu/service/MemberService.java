package com.pnu.service;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.pnu.domain.Member;
import com.pnu.persistence.MemberRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MemberService {
	
	private final MemberRepository memberRepo;
	private final PasswordEncoder encoder;
	
	public List<Member> getMembers(){
		System.out.println("MemberService getMembers"); //확인용
		return memberRepo.findAll();
	}
	
	public Member registerMember(Member member) {
		System.out.println("MemberService registerMember"); //확인용
		member.setPassword(encoder.encode(member.getPassword()));
	    return memberRepo.save(member);
	}
	
	public boolean findMember(Member member) {
		System.out.println("MemberService findMember"); //확인용
		Member findMember = memberRepo.findById(member.getEmail()).orElse(null);
		return findMember != null ? true : false;
	}
	
	public ResponseEntity<Member> getUserData(Authentication authentication){
		System.out.println("MemberService getUserData"); //확인용
		String username = authentication.getName();
		Member member = memberRepo.findById(username).orElse(null);
		if(member != null) {
			return ResponseEntity.ok(member);
		} else {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
		}
	}

}
