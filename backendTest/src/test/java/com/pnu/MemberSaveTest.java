package com.pnu;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.pnu.domain.Member;
import com.pnu.persistence.MemberRepository;

@SpringBootTest
public class MemberSaveTest {
	@Autowired
	MemberRepository memberRepo;
	@Autowired
	PasswordEncoder encoder;
	
	@Test
	public void resist() {
		memberRepo.save(Member.builder()
							  .email("aaaa@naver.com")
							  .name("박래찬")
							  .number("010-1111-1111")
							  .password(encoder.encode("aaaa"))
							  .build());
	}

}
