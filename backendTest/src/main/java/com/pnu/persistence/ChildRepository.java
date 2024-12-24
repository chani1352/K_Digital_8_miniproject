package com.pnu.persistence;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.pnu.domain.Child;

public interface ChildRepository extends JpaRepository<Child,Integer>{
	
	@Query("SELECT c FROM Child c WHERE c.member.email = :email")
	List<Child> queryGetChild(@Param("email") String email);

}
