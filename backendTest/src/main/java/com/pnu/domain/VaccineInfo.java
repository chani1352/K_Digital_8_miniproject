package com.pnu.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
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
public class VaccineInfo {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer idx;
	@Column(length = 20)
	private String vaccineName;
	private int periodFrom;
	private int periodTo;
	@Column(length = 5)
	private String phase;
	@Column(length = 10)
	private String optional;
	@Column(length = 50)
	private String method;
	@Column(length = 20)
	private String disease;

}
