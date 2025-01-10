package com.pnu.service;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.util.ObjectUtils;
import org.springframework.web.multipart.MultipartFile;

import com.pnu.DTO.ChildDTO;
import com.pnu.domain.Child;
import com.pnu.domain.ChildVaccine;
import com.pnu.domain.Member;
import com.pnu.domain.VaccineInfo;
import com.pnu.persistence.ChildRepository;
import com.pnu.persistence.ChildVaccineRepository;
import com.pnu.persistence.MemberRepository;
import com.pnu.persistence.VaccineInfoRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ChildService {

	private final ChildRepository childRepo;
	private final ChildVaccineRepository chVaRepo;
	private final MemberRepository memberRepo;
	private final VaccineInfoRepository vaccineRepo;
	

	
	//아이 등록
	public Child registerChild(ChildDTO childDTO) throws IOException{
		System.out.println("ChildService registerChild");
		
		//사진 경로 저장
		String userImgName =  imageUpload(childDTO);
		
		//입력받은 아이 정보 저장
		Member member = memberRepo.findById(childDTO.getMember()).orElse(null);
		if(member == null) return null;
		Child child = childRepo.save(Child.builder()
							   .childName(childDTO.getChildName())
							   .member(member)
							   .birth(childDTO.getBirth())
							   .image(userImgName) 
							   .build());
		
		//출생일 기준 백신 접종일 초기화
		List<VaccineInfo> vaccines= vaccineRepo.findAll();
		int[] month = {0,1,1,2,4,6,12,15,18,19,24,36,60,120,132};
		for(VaccineInfo vaccine : vaccines) {
			int from = vaccine.getPeriodFrom();
			int to = vaccine.getPeriodTo();
			chVaRepo.save(ChildVaccine.builder()
				    .child(child)
			        .vaccine(vaccine)
			        .scheduledFrom(childDTO.getBirth().plusMonths(month[from]))
			        .scheduledTo(childDTO.getBirth().plusMonths(month[to]))
			        .build());
		}
		return child;
	}
	
	//접종한 백신 정보 입력
	public List<ChildVaccine> selectVaccine(Integer idx,String num) {
		String[] list = num.split(",");
		int index = 0;
		List<ChildVaccine> child = chVaRepo.selectChildIdx(idx);
		for(ChildVaccine ch : child) {
			if(list.length > index && ch.getVaccine().getIdx() == Integer.parseInt(list[index])) {
				ch.setProof(true);
				index++;
			} else {
				ch.setProof(false);
			}
			chVaRepo.save(ch);
		}
		Child ch = childRepo.findById(idx).orElse(null);
		if(ch != null) {
			int id = ch.getIdx();
			int option = childRepo.queryGetOption(id);
			int mandatory = childRepo.queryGetMandatory(id);
			ch.setOptional(option);
			ch.setMandatory(mandatory);
			childRepo.save(ch);
		}
		return child;
	}
	
	//선택한 아이 한명 정보
	public Child getChild(Integer idx) {
		System.out.println("ChildController getChild");
		return childRepo.findById(idx).orElse(null);
	}
	
	//아이 전체 정보
	public List<Child> getChildren(String email) {
		System.out.println("ChildController findChildren");
		List<Child> childList = childRepo.queryGetChild(email);
		return childList;
	}
	
	//아이 정보 삭제
	public void deleteChild(Integer idx) {
		childRepo.deleteById(idx);
	}
	
	//접종한 백신 넘버
	public List<Integer> checkVaccine(Integer idx) {
		List<ChildVaccine> child = chVaRepo.selectChildIdx(idx);
		List<Integer> vaccineNum = new ArrayList<>();
		
		for(ChildVaccine ch : child) {
			if(ch.isProof()) vaccineNum.add(ch.getVaccine().getIdx());
		}
		return vaccineNum;
	}
	
	//접종 일정표
	public List<ChildVaccine> scheduleVaccine(Integer idx) {
		List<ChildVaccine> child = chVaRepo.selectChildIdx(idx);
		List<ChildVaccine> schedule = new ArrayList<>();
		int num = child.size();
		for(int i = 0 ; i < num ; i++) {
			if(!child.get(i).isProof()) schedule.add(child.get(i));
		}
		return schedule;
	}
	
	// 아이 정보 수정
	public Child updateChild(ChildDTO childDTO) throws IOException {
		Child ch = childRepo.findById(childDTO.getIdx()).get();
		
		if(childDTO.getChildName() != null) ch.setChildName(childDTO.getChildName());
		if(childDTO.getBirth() != null) {
			ch.setBirth(childDTO.getBirth());
			//출생일 기준 백신 접종일 초기화
			List<VaccineInfo> vaccines= vaccineRepo.findAll();
			List<ChildVaccine> childVaccine = chVaRepo.selectChildIdx(childDTO.getIdx());
			int[] month = {0,1,1,2,4,6,12,15,18,19,24,36,60,120,132};
			for(int i = 0 ; i < vaccines.size() ; i++) {
				int from = vaccines.get(i).getPeriodFrom();
				int to = vaccines.get(i).getPeriodTo();
				childVaccine.get(i).setScheduledFrom(childDTO.getBirth().plusMonths(month[from]));
				childVaccine.get(i).setScheduledTo(childDTO.getBirth().plusMonths(month[to]));
				chVaRepo.save(childVaccine.get(i));
			}	
		}
		if(childDTO.getImage() != null) {
			String userImgName =  imageUpload(childDTO);
			ch.setImage(userImgName);
		}
		return childRepo.save(ch);
	}
	
	
	//사진 등록
	public String imageUpload(ChildDTO childDTO)throws IOException{
		MultipartFile file = childDTO.getImage();
		String absolutePath = new File("").getAbsolutePath() + File.separator;
		String path = "src/main/resources/static/images";
		File userImg = new File(path);
		String userImgName = null;
		
        if (!userImg.exists()) userImg.mkdirs();
        if (file == null) return null;
        if (!file.isEmpty()) {
            // 파일이 비어있지 않으면
            String contentType = file.getContentType();
            String originalFileExtension;

            // 타입에 따른 확장자 결정
            if (ObjectUtils.isEmpty(contentType)) {
                // 타입 없으면 null
                return null;
            } else {
                if (contentType.contains("image/jpeg")) {
                    originalFileExtension = ".jpg";
                } else if (contentType.contains("image/png")) {
                    originalFileExtension = ".png";
                } else {
                    return null;
                }
            }
            
         // 파일저장 이름
            //String originalFileName = file.getOriginalFilename();
            // 확장자를 제외한 파일 이름과 확장자 추출
            //int lastIndex = originalFileName.lastIndexOf('.');
            //String fileName = originalFileName.substring(0, lastIndex);
            userImgName = childDTO.getMember() + "_" + childDTO.getChildName() + originalFileExtension;
            // 파일 저장
            userImg = new File(absolutePath  + path + File.separator + userImgName);
            System.out.println("파일 저장경로:" + absolutePath  + path + File.separator + userImgName);
            file.transferTo(userImg);
        } 
        
        return userImgName;
	}
}
