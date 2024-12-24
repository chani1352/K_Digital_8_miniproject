package com.pnu.domain;

import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
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
public class Member {
	
	@Id
	private String email;
	private String name;
	private String number;
	private String password;
	@Enumerated(EnumType.STRING)
	@Builder.Default
	private Role role = Role.ROLE_MEMBER;
	@Builder.Default
	private boolean enabled = true;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Builder.Default
	@Column(columnDefinition="timestamp default current_timestamp")
	private Date createDate = new Date();
	
}
