package com.pnu.controller;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class LoginController {
	@GetMapping("oauth")
	public @ResponseBody String auth(@AuthenticationPrincipal OAuth2User user) {
		System.out.println("LoginController auth"); //확인
		
		if(user == null) return "OAuth2:null";
		
		System.out.println("attributes:" + user.getAttributes());
		
		return "OAuth2:" + user;
	}

}
