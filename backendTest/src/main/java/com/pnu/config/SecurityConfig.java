package com.pnu.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {
	
	@Bean
	SecurityFilterChain filterChan(HttpSecurity http) throws Exception{
		http.authorizeHttpRequests(security->security
									.requestMatchers("/member/**").authenticated()
									.requestMatchers("/admin/**").hasRole("ADMIN")
									.anyRequest().permitAll());
		http.csrf(cf->cf.disable());
		return http.build();
	}
	
	@Bean
	PasswordEncoder passEncoder() {
		return new BCryptPasswordEncoder();
	}

}
