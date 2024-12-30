package com.pnu.config;

import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class OAuth2LogoutHandler extends SecurityContextLogoutHandler {
	@Override
	public void logout(HttpServletRequest request, HttpServletResponse response, Authentication authentication) {
		// TODO Auto-generated method stub
		super.logout(request, response, authentication);
		
		 Cookie[] cookies = request.getCookies();
	        
	        if (cookies != null) {
	            for (Cookie cookie : cookies) {
	                cookie.setValue(null);        // 쿠키 값을 null로 설정
	                cookie.setMaxAge(0);          // 쿠키 만료 시간 설정 (0으로 설정하여 즉시 만료)
	                cookie.setPath("/");          // 유효 경로 설정, 보통 "/"로 설정하여 모든 경로에서 삭제되게 함
	                response.addCookie(cookie);   // 응답에 추가하여 클라이언트에서 삭제되도록 함
	            }
	        }
	}

}
