package com.pnu.util;

import java.util.Date;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;

public class JWTUtil {
	private static final long ACCESS_TOKEN_MSEC = 100 * (60 * 1000); //100분
	private static final String JWT_KEY = "com.pnu.kwtkey"; //인코딩을 위한 secret key
	private static final String ClaimName = "username";		//토큰에 담을 정보의 key
	private static final String prefix = "Bearer ";			//JWT 토큰 헤더 문자열
	
	private static String getJWTSource(String token) {
		System.out.println("JWTUtil getJWTSource");
		if(token.startsWith(prefix)) return token.replace(prefix,"");
		return token;
	}
	
	public static String getJWT(String username) {
		System.out.println("JWTUtil getJWT");
		
		String src = JWT.create()
						.withClaim(ClaimName, username)
						.withExpiresAt(new Date(System.currentTimeMillis() + ACCESS_TOKEN_MSEC))
						.sign(Algorithm.HMAC256(JWT_KEY));
		return prefix + src;
	}
	
	public static String getClaim(String token) {
		System.out.println("JWTUtil getClaim");
		
		String tok = getJWTSource(token);
		return JWT.require(Algorithm.HMAC256(JWT_KEY)).build().verify(tok).getClaim(ClaimName).asString();
	}
	
	public static boolean isExpired(String token) {
		System.out.println("JWTUtil isExpired");
		
		String tok = getJWTSource(token);
		return JWT.require(Algorithm.HMAC256(JWT_KEY)).build().verify(tok).getExpiresAt().before(new Date());
	}

}
