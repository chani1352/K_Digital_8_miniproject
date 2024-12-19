import './css/signCss.css';
import { useRef, useState,useEffect } from "react";
import TailButton from "./UI/TailButton";
import LogoButton from "./UI/LogoButton";
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
import { useGoogleLogin} from "@react-oauth/google";
import {GoogleOAuthProvider} from "@react-oauth/google";

export default function Signin() {
  const navigate = useNavigate();
  const [token, setToken] = useState(null);
  const signinId = useRef();
  const signinPw = useRef();

  const clickSignIn = async (e) => {
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
      if (authHeader) {
        const token = authHeader.replace('Bearer ', '');  // 'Bearer '를 제거하고 토큰만 추출
        // 로컬 스토리지에 토큰 저장
        localStorage.setItem('token', token);
        console.log('token', token);
      } else {
        console.log('Authorization header not found');
      }
      }catch (err) {
        console.error('Error fetching data:', err);
      }

      try {
        const response = await fetch('http://localhost:8080/data', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,  // JWT 토큰을 Authorization 헤더에 포함
          },
        });
        console.log("token1 : " + localStorage.getItem('token'))
        const data = await response.json();  // JSON 형식으로 응답 받기
        console.log(data);  // 서버에서 반환된 데이터
      } catch (error) {
        console.error('Error fetching data', error);
      }

    }

  const handleLogin = async (data) => {

    }

  

  const googleLogin = async (e) => {
      e.preventDefault();

      window.location.href = 'http://localhost:8080/oauth2/authorization/naver';
      //window.location.href = 'https://nid.naver.com/nidlogin.logout';
      //window.location.href = 'http://localhost:8080/oauth2/authorization/google';
      //window.location.href = 'https://accounts.google.com/Logout';
      //const url = 'http://localhost:8080/login/oauth2/code/google';
      console.log("로그인성공");
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
            <LogoButton caption={'NAVER 로그인'} color={'naver'} handleClick={clickSignIn}
              style={'w-[360px] h-12 text-[14px] mb-4'} />
            <LogoButton caption={'KAKAO 로그인'} color={'kakao'} handleClick={clickSignIn}
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
