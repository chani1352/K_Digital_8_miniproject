package com.pnu.config.filter;

import java.io.IOException;
import java.util.Date;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.pnu.domain.Member;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
public class JWTAuthenticationFilter extends UsernamePasswordAuthenticationFilter{
	private final AuthenticationManager authenticationManager;

	@Override
	public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response)
			throws AuthenticationException {
		System.out.println("JWTAuthenticationFilter attemptAuthentication");  //확인용 
		ObjectMapper mapper = new ObjectMapper();
		try {
			Member member = mapper.readValue(request.getInputStream(), Member.class);
			Authentication authToken = new UsernamePasswordAuthenticationToken(member.getEmail(),member.getPassword());
			return authenticationManager.authenticate(authToken);
		} catch(Exception e) {
			log.info(e.getMessage());
			response.setStatus(HttpStatus.UNAUTHORIZED.value());
		}
		return null;
	}
	
	@Override
	protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain,
			Authentication authResult) throws IOException, ServletException {
		System.out.println("JWTAuthenticationFilter successfulAuthentication"); //확인용 
		User user = (User)authResult.getPrincipal();
		String token = JWT.create()   // JWT 토큰 생성 
						  .withExpiresAt(new Date(System.currentTimeMillis() + 1000*60*100)) //토큰의 유효기간 100분 
						  //.withExpiresAt(new Date(System.currentTimeMillis() + 1000*5)) //토큰의 유효기간 100분 
						  .withClaim("username",user.getUsername())
						  .sign(Algorithm.HMAC256("com.pnu.jwt")); //HMAC256알고리즘을 사용해 토큰 서명 추가 "com.pnu.jwt"는 비밀키 
		response.addHeader(HttpHeaders.AUTHORIZATION, "Bearer " + token); //클라이언트에게 토큰을 보냄 ( HTTP 응답 헤더에 JWT 토큰을 포함) 
																		  //Authorization: Bearer <JWT 토큰> 이 형태(Bearer은 인증 방식을 뜻함) 
		response.setStatus(HttpStatus.OK.value()); //상태 코드 설정: 이 코드는 HTTP 응답 상태 코드를 200 OK로 설정
	}

}

