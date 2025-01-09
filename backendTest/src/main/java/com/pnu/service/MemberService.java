package com.pnu.service;

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

	// 회원 가입
	public Member registerMember(Member member) {
		System.out.println("MemberService registerMember"); // 확인용
		member.setPassword(encoder.encode(member.getPassword()));
		return memberRepo.save(member);
	}

	// 회원 가입시 이메일 중복 체크
	public boolean findMember(String email) {
		System.out.println("MemberService findMember"); // 확인용
		Member findMember = memberRepo.findById(email).orElse(null);
		return findMember != null ? true : false;
	}

	// 로그인후 멤버 정보 전달
	public ResponseEntity<Member> getUserData(Authentication authentication) {
		System.out.println("MemberService getUserData"); // 확인용
		String username = authentication.getName();
		Member member = memberRepo.findById(username).orElse(null);
		if (member != null) {
			return ResponseEntity.ok(member);
		} else {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
		}
	}


	// 회원 정보 수정
	public Member updateMember(Member member) {
		System.out.println("MemberService updateMember"); // 확인용
		Member mem = memberRepo.findById(member.getEmail()).get();
		if (member.getPassword() != null)
			mem.setPassword(encoder.encode(member.getPassword()));
		if (member.getName() != null)
			mem.setName(member.getName());
		if (member.getNumber() != null)
			mem.setNumber(member.getNumber());

		return memberRepo.save(mem);
	}

}
