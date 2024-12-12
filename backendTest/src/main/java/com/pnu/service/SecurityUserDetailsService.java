package com.pnu.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import com.pnu.domain.Member;
import com.pnu.persistence.MemberRepository;

public class SecurityUserDetailsService implements UserDetailsService {
	
	@Autowired
	private MemberRepository memRepo;
	
	@Override
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
		Member member = memRepo.findById(email).orElse(null);
		if(member == null) throw new UsernameNotFoundException("Not Found");
		//넘겨받은 이메일 비번 정보를 User객체에 저장
		//AuthorityUtils.createAuthorityList()는 주어진 역할(role) 을 GrantedAuthority 객체로 변환하여 반환
		//GrantedAuthority는 Spring Security에서 권한을 관리하는 데 사용되는 인터페이스
		return new User(member.getEmail(),member.getPassword(),
						AuthorityUtils.createAuthorityList(member.getRole().toString()));
				
	}

}