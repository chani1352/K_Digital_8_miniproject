package com.pnu.util;

import java.util.Map;

import org.springframework.security.oauth2.core.user.OAuth2User;

public class CustomMyUtil {
	
	public static String getUsernameFromOAuth2User(OAuth2User user) {
		System.out.println("CustomMyUtil getUsernameFromOAuth2User"); //확인용
		String userString = user.toString();
		String regName = null;
		String name = null;
		System.out.println("ss : " + userString.toString());
		if(userString.contains("google")) {
			regName = "Google";
			name = user.getAttribute("email");
		}
		else if(userString.contains("naver"))	{
			regName = "Naver";
			Map<String,String> info = user.getAttribute("response");
			name = info.get("email");
		}
		else if(userString.contains("kakao"))	{
			regName = "Kakao";
			Map<String,String> info = user.getAttribute("properties");
			name = info.get("nickname");
			System.out.println("name :" + name);
		}
		else {
			if(userString.contains("id=") && userString.contains("resultcode=") && userString.contains("response=")) {
				regName = "Naver";
				name = user.getAttribute("email");
			} else return null;
		}
		if(name == null) return null;
		return regName + "_" + name;
	}

}
