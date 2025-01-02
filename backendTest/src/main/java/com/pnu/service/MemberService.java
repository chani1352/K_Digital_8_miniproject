package com.pnu.service;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.pnu.domain.Member;
import com.pnu.persistence.MemberRepository;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
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

//	public ResponseEntity<?> getOauthData(HttpServletRequest request) {
//		System.out.println("MemberService getOauthData"); // 확인용
//		// 서버에서 JWT 토큰을 쿠키에서 읽는 예시
//		Cookie[] cookies = request.getCookies();
//		for(Cookie co : cookies) {
//			Map<String,String> map = co.getAttributes();
//			System.out.println("map" + map.values());
//		}
//		String jwtToken = null;
//		if (cookies != null) {
//			for (Cookie cookie : cookies) {
//				if ("Authorization".equals(cookie.getName())) {
//					jwtToken = cookie.getValue();
//					break;
//				}
//			}
//		}
//		
//		if (jwtToken != null) {
//			// 쿠키에서 JWT 토큰을 읽은 경우, 로그인 상태를 JSON으로 반환
//			Map<String, String> response = new HashMap<>();
//			response.put("status", "logged-in");
//			response.put("jwtToken", jwtToken); // 쿠키에서 가져온 JWT 토큰 포함
//			return ResponseEntity.ok(response); // JSON 응답 반환
//		} else {
//			// Authorization 쿠키가 없으면
//			Map<String, String> response = new HashMap<>();
//			response.put("status", "not-logged-in");
//			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
//		}
//	}

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
