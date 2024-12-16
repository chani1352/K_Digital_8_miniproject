package com.pnu.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class LoginController {
	@GetMapping("oauth")
	public @ResponseBody ResponseEntity<?> auth(@AuthenticationPrincipal OAuth2User user) {
		System.out.println("LoginController auth"); //확인
		
		//if(user == null) return "OAuth2:null";
		if(user == null) return ResponseEntity.ok("로그인 아님");
		System.out.println("attributes:" + user.getAttributes());
		
		return ResponseEntity.ok(user);
		//return "OAuth2:" + user;
	}
	
//	@PostMapping("/login")
//	public ResponseEntity<Map<String, String>> login(@RequestBody Member member) {
//	    Map<String, String> response = new HashMap<>();
//	    String token = loginService.authenticate(member.getEmail(), member.getPassword());
//	    response.put("token", token);
//	    return ResponseEntity.ok(response);  // JSON 응답 반환
//	}

	


}
