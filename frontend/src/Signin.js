import './css/signCss.css';
import { useRef } from "react";
import TailButton from "./UI/TailButton";
import LogoButton from "./UI/LogoButton";

export default function Signin() {

  const signinId = useRef();
  const signinPw = useRef();

  const clickSignIn = () => {
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
      email: signinId.current.value,
      password: signinPw.current.value
    }
  }

  return (
    <div className="w-[560px] h-full flex flex-col justify-start items-center py-12">
      <form className="flex flex-col w-[360px]">
        <label for="email" className="input_label">
          이메일</label>
        <input id="email" type="text" placeholder="abc@abc.com" ref={signinId}
          className="input_box"></input>
        <label for="password" className="input_label ">
          비밀번호</label>
        <input id="password" type="password" placeholder="********" ref={signinPw}
          className="input_box "></input>
        <div className="flex items-center justify-center mt-[10px]">


          <TailButton caption={'로그인하기'} color={'blue'} handleClick={clickSignIn}
            style={'w-[360px] h-12 text-[14px] border-2 border-gray-300 '} />
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
          <LogoButton caption={'GOOGLE 로그인'} color={'google'} handleClick={clickSignIn}
            style={'w-[360px] h-12 text-[14px] mb-4'} />
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
