package com.pnu.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.pnu.service.OAuthService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;


@RequiredArgsConstructor
@RestController
public class OAuthController {
	
	private final OAuthService oauthService;
	
	@GetMapping("/oauth2")
	public @ResponseBody ResponseEntity<?> oauthLogin(HttpServletRequest request) {
		System.out.println("LoginController auth"); //확인
		return oauthService.oauthLogin(request);
	}

}
