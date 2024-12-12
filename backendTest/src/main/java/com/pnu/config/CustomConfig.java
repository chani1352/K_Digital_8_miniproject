package com.pnu.config;

import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import lombok.NonNull;

public class CustomConfig implements WebMvcConfigurer{
	
	@Override
	public void addCorsMappings(@NonNull CorsRegistry registry) {
		registry.addMapping("/**")
				.allowedMethods(CorsConfiguration.ALL)
				.allowedOrigins(CorsConfiguration.ALL);
	}

}
