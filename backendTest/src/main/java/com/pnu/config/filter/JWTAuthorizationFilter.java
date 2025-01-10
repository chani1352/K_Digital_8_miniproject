package com.pnu.config.filter;

import java.io.IOException;
import java.util.Optional;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.filter.OncePerRequestFilter;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.pnu.domain.Member;
import com.pnu.persistence.MemberRepository;
import com.pnu.util.JWTUtil;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class JWTAuthorizationFilter extends OncePerRequestFilter{ //인가 설정을 위해 사용자의 Role 정보를 읽어 들이기 위한 객체 설정
	private final MemberRepository memRepo;
	
	@Override                                                                         //순차적으로 요청을 처리할수 있는 각 필터
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		System.out.println("JWTAuthorizationFilter doFilterInternal");  //확인용 
		String srcToken = request.getHeader("Authorization");
		if(srcToken == null || !srcToken.startsWith("Bearer ")) {
			filterChain.doFilter(request, response);
			return;
		}

		String jwtToken = srcToken.replace("Bearer ",""); //토큰에서 bearer제거후 문자열 저장

		if (JWTUtil.isExpired(jwtToken)) {
		    System.out.println("JWT Token has expired");
		    // 응답 상태 코드 설정: 401 Unauthorized
		    response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);  // 401 상태 코드
		    return;
		}
														     //build()검증객체 생성 verify 토큰 검증 username의 클레임값을 문자열로 반환 
		String email = JWT.require(Algorithm.HMAC256("com.pnu.jwt")).build().verify(jwtToken).getClaim("username").asString();
		
		Optional<Member> opt = memRepo.findById(email);
		if(!opt.isPresent()) {
			filterChain.doFilter(request, response);
			return;
		}
		
		Member findmember = opt.get();
		// DB에서 읽은 사용자 정보를 이용해서 UserDetails 타입의 객체를 생성
		User user = new User(findmember.getEmail(),findmember.getPassword(),
							 AuthorityUtils.createAuthorityList(findmember.getRole().toString()));
		// Authentication 객체를 생성 : 사용자명과 권한 관리를 위한 정보를 입력(암호는 필요 없음)
		Authentication auth = new UsernamePasswordAuthenticationToken(user,null,user.getAuthorities());
		// 시큐리티 세션에 등록
		SecurityContextHolder.getContext().setAuthentication(auth);
		filterChain.doFilter(request, response);
	
	}
}
