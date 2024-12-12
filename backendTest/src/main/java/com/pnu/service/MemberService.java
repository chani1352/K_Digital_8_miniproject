package com.pnu.service;

import java.util.List;

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
		return memberRepo.findAll();
	}
	
	public Member registerMember(Member member) {
		member.setPassword(encoder.encode(member.getPassword()));
	    return memberRepo.save(member);
	}
	
	public boolean findMember(Member member) {
		Member findMember = memberRepo.findById(member.getEmail()).orElse(null);
		return findMember != null ? true : false;
		
	}

}
