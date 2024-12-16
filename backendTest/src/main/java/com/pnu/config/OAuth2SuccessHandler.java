package com.pnu.config;

import java.io.IOException;

import org.springframework.http.HttpHeaders;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import com.pnu.domain.Member;
import com.pnu.domain.Role;
import com.pnu.persistence.MemberRepository;
import com.pnu.util.CustomMyUtil;
import com.pnu.util.JWTUtil;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@Component
public class OAuth2SuccessHandler extends SimpleUrlAuthenticationSuccessHandler{
	private final MemberRepository memRepo;
	private final PasswordEncoder encoder;
	
	@Override
	public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
			Authentication authentication) throws IOException, ServletException {
		System.out.println("OAuth2SuccessHandler onAuthenticationSuccess"); // 확인
		log.info("OAuth2SuccessHandler:onAuthenticationSuccess");
		OAuth2User user = (OAuth2User)authentication.getPrincipal();
		String username = CustomMyUtil.getUsernameFromOAuth2User(user);
		if(username == null) {
			log.error("onAuthenticationSuccess:Cannot generate username from oauth2user!");
			throw new ServletException("Cannot generate username from oauth2user!");
		}
		log.info("onAuthenticationSuccess:" + username);
		memRepo.save(Member.builder()
						.email(username)
						.password(encoder.encode("1a2s3d4f"))
						.role(Role.ROLE_MEMBER)
						.enabled(true).build());
		
		String jwtToken = JWTUtil.getJWT(username);
		response.addHeader(HttpHeaders.AUTHORIZATION, jwtToken);
	}

}
