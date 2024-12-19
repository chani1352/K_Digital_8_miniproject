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
	
	// 1. 사용자가 폼에 아이디와 암호를 입력해서 post로 호출 ->
	// attemptAuthentication  HttpServletRequest에 파라미터로 전달
	@Override
	public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response)
			throws AuthenticationException {
		System.out.println("JWTAuthenticationFilter attemptAuthentication");  //확인용 
		ObjectMapper mapper = new ObjectMapper();
		//JSON 데이터를 Java 객체로 변환하거나 (직렬화), Java 객체를 JSON 데이터로 변환하는 (역직렬화) 기능을 제공
		try {
			//mapper.readValue(InputStream에서 받은 JSON 데이터를 Member 객체로 변환)
			//request ~(클라이언트가 보낸 HTTP 요청의 본문을 읽음,JSON 형식의 데이터가 전달)
			//Member.class(readValue메서드로 JSON데이터를 해당 클래스타입으로 변환)
			Member member = mapper.readValue(request.getInputStream(), Member.class);
			//2.member에 저장된 email,비번을 이용하여 토큰 생성
			Authentication authToken = new UsernamePasswordAuthenticationToken(member.getEmail(),member.getPassword());
			System.out.println("authToken : " + authToken);
			//인증 처리하기 위해 AuthenticationManager에 토큰을 파라미터로 넘김 (사용자 정보)
			//넘긴 토큰은 UserDatailsService구현체의 loadUserByUsername메소드를 호출하면서 파라미터로 전달
			//AuthenticationProvider**에 전달 (SecurityUserDetailsService 참조)
			return authenticationManager.authenticate(authToken);
			//Authentication은 UserDetails를 포함하고 있으며, 인증 상태와 사용자의 권한 정보도 포함
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
		System.out.println("auth:" + user);
		String token = JWT.create()   // JWT 토큰 생성 
						  .withExpiresAt(new Date(System.currentTimeMillis() + 1000*60*100)) //토큰의 유효기간 100분 
						  .withClaim("username",user.getUsername())
						  .sign(Algorithm.HMAC256("com.pnu.jwt")); //HMAC256알고리즘을 사용해 토큰 서명 추가 "com.pnu.jwt"는 비밀키 
		response.addHeader(HttpHeaders.AUTHORIZATION, "Bearer " + token); //클라이언트에게 토큰을 보냄 ( HTTP 응답 헤더에 JWT 토큰을 포함) 
																		  //Authorization: Bearer <JWT 토큰> 이 형태(Bearer은 인증 방식을 뜻함) 
		response.setStatus(HttpStatus.OK.value()); //상태 코드 설정: 이 코드는 HTTP 응답 상태 코드를 200 OK로 설정
		System.out.println("token : " + token);
	}

}

