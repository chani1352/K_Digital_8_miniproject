package com.pnu.domain;

import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ChildVaccine {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer idx;
	
	@ManyToOne
	@JoinColumn(name="CHILD_IDX")
	private Child child;	
	
	@ManyToOne
	@JoinColumn(name="VACCINEINFO_IDX")
	@Builder.Default
	private VaccineInfo vaccine = null;
	
	@Builder.Default
	private boolean proof = false;
	
	@Builder.Default
	private LocalDate vaccineDate = null;
	
	

}
