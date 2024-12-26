package com.pnu.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.pnu.domain.Member;
import com.pnu.persistence.MemberRepository;

//login 요청이 오면 자동으로 UserDetailsService타입으로 ioc되어 있는loadUserByUsername함수가 실행 
@Service
public class SecurityUserDetailsService implements UserDetailsService {
	
	@Autowired
	private MemberRepository memRepo;
	
	@Override
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
		System.out.println("SecurityUserDetailsService loadUserByUsername");  //확인용 
		Member member = memRepo.findById(email).orElse(null);
		if(member == null) throw new UsernameNotFoundException("Not Found");
		return new User(member.getEmail(),member.getPassword(),
						AuthorityUtils.createAuthorityList(member.getRole().toString()));
				
	}

}
