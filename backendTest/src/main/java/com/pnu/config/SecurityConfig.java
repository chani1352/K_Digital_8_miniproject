package com.pnu.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.access.intercept.AuthorizationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.pnu.config.filter.JWTAuthenticationFilter;
import com.pnu.config.filter.JWTAuthorizationFilter;
import com.pnu.persistence.MemberRepository;

import lombok.RequiredArgsConstructor;

@EnableWebSecurity
@RequiredArgsConstructor
@Configuration
public class SecurityConfig {

	private final AuthenticationConfiguration authenticationConfiguration;
	private final MemberRepository memRepo;
	private final OAuth2SuccessHandler successHandler;
	
	@Bean
	SecurityFilterChain filterChain(HttpSecurity http) throws Exception{
		System.out.println("SecurityConfig filterChain"); //확인용 
		http.csrf(cf->cf.disable());
		http.formLogin(frmLogin->frmLogin.disable());
		http.httpBasic(basic->basic.disable());
		http.cors(cors->cors.configurationSource(corsSource()));
		http.authorizeHttpRequests(security->security
									.requestMatchers("/member/**").authenticated()
									.requestMatchers("/admin/**").hasRole("ADMIN")
									.anyRequest().permitAll());

		http.addFilter(new JWTAuthenticationFilter(authenticationConfiguration.getAuthenticationManager()));
		http.addFilterBefore(new JWTAuthorizationFilter(memRepo), AuthorizationFilter.class);
		http.oauth2Login(oauth2->oauth2.loginPage("/login").successHandler(successHandler));
	
		http.sessionManagement(sm->sm.sessionCreationPolicy(SessionCreationPolicy.STATELESS));
		return http.build();
	}
	
	private CorsConfigurationSource corsSource() {
	       CorsConfiguration config = new CorsConfiguration();
	       config.addAllowedOriginPattern(CorsConfiguration.ALL);
	       config.addAllowedMethod(CorsConfiguration.ALL);
	       config.addAllowedHeader(CorsConfiguration.ALL);
	       config.addExposedHeader("Authorization");
	       config.setAllowCredentials(true);   // 쿠키 전송 허용 

	       UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
	       source.registerCorsConfiguration("/**", config);
	       return source;
	    }
	
	

}
