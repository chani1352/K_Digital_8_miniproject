import '../../css/signCss.css';

import { useRef} from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";

import TailButton from "../../UI/TailButton";
import LogoButton from "../../UI/LogoButton";

// 로그인 성공 후 사용자 정보 가져오기
export const afterLogin = async (token) => {
  try {
    const response = await fetch('http://10.125.121.214:8080/member', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,  // JWT 토큰을 Authorization 헤더에 포함
      },
    });
    const data = await response.json();  // JSON 형식으로 응답 받기
    // console.log("afterlogin : ",data);  // 서버에서 반환된 데이터
    localStorage.setItem("memName", data.name);
    localStorage.setItem("memEmail", data.email);
    window.location.href = "/";
  } catch (error) {
    console.error('Error fetching data', error);
  }
}

export default function Signin() {
  
  const signinId = useRef();
  const signinPw = useRef();

  // 유효성 검사
  const clickSignIn = (e) => {
    e.preventDefault();
    console.log("로그인 버튼 클릭");
    //입력 공백 확인
    if (!signinId.current.value) {
      alert("이메일을 입력하세요");
      signinId.current.focus();
      return;
    }
    if (!signinPw.current.value) {
      alert("비밀번호를 입력하세요");
      signinPw.current.focus();
      return;
    }
    fetchSignIn();
  }


  //로그인 정보 서버에 전달
  const fetchSignIn = async () => {

    const loginData = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: signinId.current.value,
        password: signinPw.current.value
      })
    }


    const url = 'http://10.125.121.214:8080/login';

    try {
      const resp = await fetch(url, loginData);

      if (!resp.ok) {
        throw new Error(`HTTP error! status: ${resp.status}`);
      }

      // 응답 헤더에서 Authorization 값을 추출
      const authHeader = resp.headers.get('Authorization');
      // console.log('resp', resp.headers.get('Authorization'));
      if (authHeader) {
        const token = authHeader.replace('Bearer ', '');  // 'Bearer '를 제거하고 토큰만 추출

        // 로컬 스토리지에 토큰 저장
        localStorage.setItem('token', token);
        console.log('token', token);

        // 로그인 성공 후 사용자 정보 가져오기
        afterLogin(token);

      } else {
        console.log('Authorization header not found');
        alert("로그인에 실패하였습니다. Email 또는 패스워드를 다시 확인해주세요.");
        window.location.reload();
      }
    } catch (err) {
      console.error('Error fetching data:', err);
      alert("로그인에 실패하였습니다. Email 또는 패스워드를 다시 확인해주세요.");
      window.location.reload();
    }
  }


  // 네이버 로그인
  const naverLogin = async(e) => {
    e.preventDefault();
    window.location.href = 'http://localhost:8080/oauth2/authorization/naver';

  }

  // 카카오 로그인
  const kakaoLogin = async(e) => {
    e.preventDefault();
    window.location.href = 'http://localhost:8080/oauth2/authorization/kakao';
  }

  const googleLogin = async (e) => {
    e.preventDefault();
    window.location.href = 'http://localhost:8080/oauth2/authorization/google';
  }

  return (
    <div className="w-[560px] h-full flex flex-col justify-start items-center py-12">
      <form className="flex flex-col w-[360px]">
        <label for="email" className="input_label">
          이메일</label>
        <input id="email" type="text" placeholder="abc@abc.com" ref={signinId}
          className="input_box mb-[30px]"></input>
        <label for="password" className="input_label ">
          비밀번호</label>
        <input id="password" type="password" placeholder="********" ref={signinPw}
          className="input_box mb-[30px]" />
        <div className="flex items-center justify-center mt-[10px]">

          <TailButton caption={'로그인하기'} color={'blue'} handleClick={clickSignIn}
            style={'w-[360px] h-12 text-[14px] '} />
        </div>

      </form>
      {/* ============  다른방법으로 로그인 ============  */}
      <div className="flex flex-col w-[360px] mt-12 ">
        <div className='text-[12px] text-gray-500 mb-2 font-NanumSquareR'>다른 방법으로 로그인</div>
        <div className="flex-col items-center justify-center">
          <LogoButton caption={'NAVER 로그인'} color={'naver'} handleClick={naverLogin}
            style={'w-[360px] h-12 text-[14px] mb-4'} />
          <LogoButton caption={'KAKAO 로그인'} color={'kakao'} handleClick={kakaoLogin}
            style={'w-[360px] h-12 text-[14px] mb-4'} />
          <GoogleOAuthProvider clientId='peb1021@gmail.com'>
            <LogoButton caption={'GOOGLE 로그인'} color={'google'} handleClick={googleLogin}
              style={'w-[360px] h-12 text-[14px] mb-4'} />
          </GoogleOAuthProvider>

        </div>

        <div className="mt-8 flex items-center justify-center">
          <div className='text-[12px] text-gray-500 mb-2 underline underline-offset-1 font-NanumSquareR'>
            <a href='/signup'>회원가입</a>
          </div>
        </div>
      </div>
    </div>
  )
}
