package com.pnu.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.pnu.domain.Member;
import com.pnu.persistence.MemberRepository;

@Service
public class MemberService {
	
	@Autowired
	private MemberRepository memberRepo;
	@Autowired
	private PasswordEncoder encoder;
	
	public Member registerMember(Member member) {
		member.setPassword(encoder.encode(member.getPassword()));
		return memberRepo.save(member);
	}

}
