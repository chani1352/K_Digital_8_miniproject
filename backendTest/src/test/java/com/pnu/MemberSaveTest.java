package com.pnu;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.pnu.persistence.ChildRepository;
import com.pnu.persistence.MemberRepository;

@SpringBootTest
public class MemberSaveTest {
	@Autowired
	MemberRepository memberRepo;
	@Autowired
	PasswordEncoder encoder;
	@Autowired
	ChildRepository childRepo;
	
	@Test
	public void resist() {
		System.out.println("rr");
	}

}
