package com.pnu.persistence;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pnu.domain.ChildVaccine;

public interface ChildVaccineRepository extends JpaRepository<ChildVaccine,Integer>{

}
