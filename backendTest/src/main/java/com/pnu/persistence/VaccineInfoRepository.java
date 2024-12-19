package com.pnu.persistence;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pnu.domain.VaccineInfo;

public interface VaccineInfoRepository extends JpaRepository<VaccineInfo, Integer>{

}
