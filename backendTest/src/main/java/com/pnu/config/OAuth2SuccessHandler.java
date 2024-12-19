package com.pnu.config;

import java.io.IOException;
import java.util.Map;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
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
		Map<String,Object> attributes = user.getAttributes(); // 확인
		System.out.println("user : " + attributes.keySet());  // 확인
		System.out.println("user : " + attributes.values());  // 확인
		String oauthMail = CustomMyUtil.getUsernameFromOAuth2User(user);
		String name = null;
		if(oauthMail == null) {
			log.error("onAuthenticationSuccess:Cannot generate username from oauth2user!");
			throw new ServletException("Cannot generate username from oauth2user!");
		}
		log.info("onAuthenticationSuccess:" + oauthMail);
		if(oauthMail.contains("Google")) {
			name = user.getAttribute("name");
		}
		else if(oauthMail.contains("Naver")) {
			Map<String,String> info = user.getAttribute("response");
			name = info.get("name");
		}
		if(memRepo.findById(oauthMail).orElse(null) == null) {
			memRepo.save(Member.builder()
							.email(oauthMail)
							.password(encoder.encode("1a2s3d4f"))
							.name(name)
							.role(Role.ROLE_MEMBER)
							.enabled(true).build());
		}
		
		String jwtToken = JWTUtil.getJWT(oauthMail);
		System.out.println("token : " + jwtToken);
		response.addHeader(HttpHeaders.AUTHORIZATION, jwtToken);
		//response.setStatus(HttpStatus.OK.value());
		response.sendRedirect("http://localhost:3000/hospitals");
		//response.sendRedirect("http://10.125.121.213:3000/hospitals");
	}

}
