# 💉우리 아이 접종 관리, 예방이
[K-Digital 부산대 8회차] AI 활용 빅데이터분석 풀스택웹서비스 SW 개발자 양성과정 미니 프로젝트

![이미지](./images/capture_main.png)

- **주제:** 어린이 필수 예방 접종 안내 및 관리 시스템
- **목표:** 어린이 연령별 필수 예방 접종 종류 확인 및 관리, 지역별 접종 가능한 병원 검색

<br/>

## 📈 개발 기간
> 2024.08.26 - 2024.10.02.

<br/>

## 📝 활용 데이터 
- `질병관리청` 어린이 국가예방접종 지원사업 위탁의료기관 현황 정보
- `Kakao Map api`

<br/>

## 👥 팀원 구성

|이름|담당|GITHUB|
|:------:|:---:|---|
|박래찬|BACK-END|https://github.com/chani1352|
|조은빈|FRONT-END|https://github.com/iambean-git|

<br/>

## 🔧 개발 환경
- `FRONT-END:` React.js, HTML, CSS, JavaScript, Tailwind  
- `BACK-END:` Java, SpringBoot  
- `DB:` MySQL  
- `기타:` GITHUB, FIGMA, Notion  

<br/>
<br/>

## 📋 웹 서비스 주요 기능 요약
### 로그인 및 로그아웃
> - Email, PW 를 통한 사용자 인증 및 JWT 발급
> - Naver, Kakao, Google 등 OAuth를 이용한 소셜 로그인
> - 로그아웃 시 토큰 제거

<br/>

### 회원가입
> - Email, PW, 이름, 연락처를 포함한 user 등록
> - 이메일 중복 여부 체크
> - 비밀번호 및 비밀번호 확인 동일 체크

<br/>

### 연령별 예방접종
> - 연령별, 개월수별 필수 예방 접종 정보 제공
> - 접종 시기와 방법 안내
> - 필수접종 / 선택접종 여부 안내

<br/>

### 우리 동네 병원
> - 시/도 및 시/군/구 선택 후 검색시 해당 지역의 접종 가능한 병원 리스트 안내
> - 병원 이름, 주소, 접종 가능한 백신 목록 제공
> - 자세히 보기를 통해 전화 번호 및 지도를 통한 위치 안내 (Kakao Map)

<br/>

### 우리아이 접종 플랜
- **접근 제한**
    > - 로그인 토큰을 통한 접근 제어 
    > - 인증되지 않은 사용자일 경우 로그인 페이지로 전환

- **자녀 등록 및 삭제**
    > - 자녀 이름, 생년월일로 자녀 등록 
    > - 자녀 등록시, 지난 접종 여부 체크 후 등록
- **접종 기록 관리**
    > - 필수/선택 접종 별로 접종 완료 한 백신 수 확인 가능
    > - 접종 여부 수정 가능
- **접종 스케쥴**
    > - 접종 여부를 반영하여 월별로 접종 해야하는 예방 접종 목록 확인

<br/>

### 마이페이지
> - 내 정보 수정 가능 (이메일 변경 불가)
> - 로그아웃

<br/>

### 기타
> - **404 에러 처리** : 잘못된 경로로 접속시, 오류 페이지 안내

<br/>
<br/>

## 📊 RestAPI 명세

이미지 첨부

<br/>
<br/>

## 💾 DataBase ERD

<br/>
<br/>

## 🎥 시연 영상
