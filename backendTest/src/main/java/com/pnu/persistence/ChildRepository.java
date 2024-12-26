package com.pnu.persistence;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.pnu.domain.Child;
import com.pnu.domain.ChildVaccine;

public interface ChildRepository extends JpaRepository<Child,Integer>{
	
	@Query("SELECT c FROM Child c WHERE c.member.email = :email")
	List<Child> queryGetChild(@Param("email") String email);
	
	
	@Query(value = "SELECT COUNT(*) FROM child_vaccine cv JOIN vaccine_info vi ON cv.vaccineinfo_idx =vi.idx WHERE cv.child_idx=:idx AND cv.proof=1 AND vi.optional='선택접종'", nativeQuery = true)
	int queryGetOption(@Param("idx") int idx);
	
	@Query(value = "SELECT COUNT(*) FROM child_vaccine cv JOIN vaccine_info vi ON cv.vaccineinfo_idx =vi.idx WHERE cv.child_idx=:idx AND cv.proof=1 AND vi.optional='필수접종'", nativeQuery = true)
	int queryGetMandatory(@Param("idx") int idx);


}
