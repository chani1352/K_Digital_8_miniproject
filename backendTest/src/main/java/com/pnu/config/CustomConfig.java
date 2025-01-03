package com.pnu.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CustomConfig implements WebMvcConfigurer {

	@Override
	public void addResourceHandlers(ResourceHandlerRegistry registry) {

		//아이 사진 정보
		System.out.println("CustomConfig addResourceHandlers");
		registry.addResourceHandler("/registerChild/**")
			.addResourceLocations("classpath:static/images/");
	}
}