package com.pnu.domain;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
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
public class Child {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer idx;
	@Column(length = 5, nullable = false)
	private String childName;
	@Column(nullable = false)
	private LocalDate birth;
	private int optional;
	private int mandatory;
	
	@ManyToOne
	@JoinColumn(name="MEMBER_EMAIL")
	private Member member;	
	
	@JsonIgnore
	@ToString.Exclude
	@Builder.Default
	@OneToMany(mappedBy="child",cascade = CascadeType.REMOVE)
	private List<ChildVaccine> childVaccine = new ArrayList<>();

}
