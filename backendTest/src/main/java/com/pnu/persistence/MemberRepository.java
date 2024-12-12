package com.pnu.persistence;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pnu.domain.Member;

public interface MemberRepository extends JpaRepository<Member,String>{

}
