package com.pnu.config.filter;

import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.pnu.domain.Member;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
public class JWTAuthenticationFilter extends UsernamePasswordAuthenticationFilter{
	private final AuthenticationManager authenticationManager;
	
	// 1. 사용자가 폼에 아이디와 암호를 입력해서 post로 호출 ->
	// attemptAuthentication  HttpServletRequest에 파라미터로 전달
	@Override
	public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response)
			throws AuthenticationException {
		ObjectMapper mapper = new ObjectMapper();
		//JSON 데이터를 Java 객체로 변환하거나 (직렬화), Java 객체를 JSON 데이터로 변환하는 (역직렬화) 기능을 제공
		try {
			//mapper.readValue(InputStream에서 받은 JSON 데이터를 Member 객체로 변환)
			//request ~(클라이언트가 보낸 HTTP 요청의 본문을 읽음,JSON 형식의 데이터가 전달)
			//Member.class(readValue메서드로 JSON데이터를 해당 클래스타입으로 변환)
			Member member = mapper.readValue(request.getInputStream(), Member.class);
			//2.member에 저장된 email,비번을 이용하여 토큰 생성
			Authentication authToken = new UsernamePasswordAuthenticationToken(member.getEmail(),member.getPassword());
			//토큰은 인증을 처리하기 위해 AuthenticationManager에 파라미터로 넘김
			//넘긴 토큰은 UserDatailsService구현체의 loadUserByUsername메소드를 호출하면서 파라미터로 전달
			//(SecurityUserDetailsServcie 참조)
			return authenticationManager.authenticate(authToken);
		} catch(Exception e) {
			log.info(e.getMessage());
			response.setStatus(HttpStatus.UNAUTHORIZED.value());
		}
		return null;
	}

}
