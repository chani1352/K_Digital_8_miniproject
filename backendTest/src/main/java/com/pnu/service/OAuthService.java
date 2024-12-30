package com.pnu.service;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.pnu.util.JWTUtil;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class OAuthService {
	
	JWTUtil jwtUtil = new JWTUtil();
	
	public ResponseEntity<?> oauthLogin(HttpServletRequest request) {
		System.out.println("LoginController auth"); //확인
		Cookie[] cookies = request.getCookies();
		String token = null;
		if (cookies != null) {
		    for (Cookie cookie : cookies) {
		        if("Authorization".equals(cookie.getName())) {
		        	token = cookie.getValue();
		        	break;
		        }
		    }
		}
		return ResponseEntity.ok(token);
	}
}
