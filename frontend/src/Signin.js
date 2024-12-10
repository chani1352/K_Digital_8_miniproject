
import { useRef } from "react";

export default function Signin() {
  const signinId = useRef();
  const signinPw = useRef();

  const clickSignIn = () => {
    console.log("로그인 버튼 클릭");
    
    //입력 공백 확인
    if(!signinId.current.value){
      alert("이메일을 입력하세요");
      signinId.current.focus();
      return;
    }

    if(!signinPw.current.value){
      alert("비밀번호를 입력하세요");
      signinPw.current.focus();
      return;
    }

    const loginData = {
      email : signinId.current.value,
      password : signinPw.current.value
    }
  }

  return (
    <div className="w-full h-3/4 lg:w-5/6 xl:w-4/6 flex flex-col justify-center items-center">
      <form className="flex flex-col w-128
                       rounded px-8 py-8 mb-4">
        <label for="email" className="block text-gray-700 text-lg font-bold mb-2">
          이메일</label>
        <input id="email" type="text" placeholder="abc@abc.com" ref={signinId}
              className="shadow appearance-none border rounded w-full h-14 py-2 px-3 text-gray-700 
               leading-tight focus:outline-none focus:shadow-outline"></input>
        <label for="password" className="block text-gray-700 text-lg font-bold mb-2 mt-10">
          비밀번호</label>
        <input id="password" type="password" placeholder="********" ref={signinPw}
              className="shadow appearance-none border rounded w-full h-14 py-2 px-3 text-gray-700 
              leading-tight focus:outline-none focus:shadow-outline"></input>
        <div class="flex items-center justify-center">
          <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold 
                          w-96 mt-12
                          py-2 px-4 rounded focus:outline-none focus:shadow-outline" 
                  type="button"
                  onClick={clickSignIn}>
            로그인하기
          </button>
        </div>
      </form>

      <div>
        <span> 회원가입</span>
        {/* <span className="mx-2"> | </span> 
        <span> 아이디찾기</span> */}
      </div>

      <div className="mt-8">
        <span> 다른 방법으로 로그인</span>
        
      </div>
      
    </div>
  )
}
