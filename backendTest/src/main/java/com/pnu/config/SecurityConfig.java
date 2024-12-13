package com.pnu.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.access.intercept.AuthorizationFilter;

import com.pnu.config.filter.JWTAuthenticationFilter;
import com.pnu.config.filter.JWTAuthorizationFilter;
import com.pnu.persistence.MemberRepository;

@Configuration
public class SecurityConfig {
	
	@Autowired
	private AuthenticationConfiguration authenticationConfiguration;
	@Autowired
	private MemberRepository memRepo;
	
	//보안 필터체인 정의 메서드 
	@Bean
	SecurityFilterChain filterChain(HttpSecurity http) throws Exception{
		System.out.println("SecurityFilterChain filterChain"); //확인용 
		http.csrf(cf->cf.disable());
		http.authorizeHttpRequests(security->security
									.requestMatchers("/member/**").authenticated()
									.requestMatchers("/admin/**").hasRole("ADMIN")
									.anyRequest().permitAll());
		//JWT 토큰을 사용한 인증 필터를 Spring Security 필터 체인에 추가
		http.addFilter(new JWTAuthenticationFilter(authenticationConfiguration.getAuthenticationManager()));
		//JWT 인증 필터가 AuthorizationFilter 전에 실행되도록 설정하는 코드 
		http.addFilterBefore(new JWTAuthorizationFilter(memRepo), AuthorizationFilter.class);

		return http.build();
	}
	
	@Bean
	PasswordEncoder passEncoder() {
		return new BCryptPasswordEncoder();
	}

}
