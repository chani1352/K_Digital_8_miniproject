package com.pnu.domain;

import jakarta.persistence.Entity;
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
	private Integer idx;
	private String vaccineName;
	private int periodFrom;
	private int periodTo;
	private String phase;
	private String optional;
	private String method;
	private String disease;

}
