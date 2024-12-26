package com.pnu.persistence;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.pnu.domain.ChildVaccine;

public interface ChildVaccineRepository extends JpaRepository<ChildVaccine,Integer>{
	@Query(value = "SELECT * FROM child_vaccine c WHERE c.child_idx = :idx",nativeQuery = true)
	List<ChildVaccine> selectChildIdx(@Param("idx")int idx);
}
