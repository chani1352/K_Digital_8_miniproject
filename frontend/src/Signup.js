import { useRef, useState, useEffect } from "react";

export default function Signup() {
    const signupEmail = useRef();
    const signupPw = useRef('');
    const signupPwConfirmed = useRef('');
    const signupName = useRef();
    const signupContact = useRef();

    const [password, setPassword] = useState('');
    const [pwConfirmed, setPwConfirmed] = useState('');
    const [isPwConfirmed, setIsPwConfirmed] = useState(false);

    const changePassword = () => {
        setPassword(signupPw.current.value);
    }

    const changePwConfirmed = () => {
        setPwConfirmed(signupPwConfirmed.current.value);
    }

    //비밀번호 일치 여부 셋팅
    useEffect(()=>{
        if(pwConfirmed === password && pwConfirmed.length>0){
            setIsPwConfirmed(true);
        } else {
            setIsPwConfirmed(false);
        }
    },[pwConfirmed,password]);

    return (
        <div className="w-full h-full lg:w-5/6 xl:w-4/6 flex flex-col justify-center items-center">
            <form className="flex flex-col w-128
                            rounded px-8 py-8 mb-4">          
                <label for="email" className="block text-gray-700 text-lg font-bold mb-2 mt-10">
                이메일</label>
                <input id="email" type="text" placeholder="abc@abc.com" ref={signupEmail}
                    className="shadow appearance-none border rounded w-full h-14 py-2 px-3 text-gray-700 
                    leading-tight focus:outline-none focus:shadow-outline"></input>

                <label for="password" className="block text-gray-700 text-lg font-bold mb-2 mt-10">
                비밀번호</label>
                <input id="password" type="password" placeholder="********" ref={signupPw}
                    onChange={changePassword}
                    className="shadow appearance-none border rounded w-full h-14 py-2 px-3 text-gray-700 
                    leading-tight focus:outline-none focus:shadow-outline"></input>

                <label for="passwordcf" className="block text-gray-700 text-lg font-bold mb-2 mt-10">
                비밀번호 확인</label>
                <input id="passwordcf" type="password" placeholder="********" ref={signupPwConfirmed}
                    onChange={changePwConfirmed}
                    className="shadow appearance-none border rounded w-full h-14 py-2 px-3 text-gray-700 
                    leading-tight focus:outline-none focus:shadow-outline"></input>
                <span className={`${pwConfirmed.length===0? "hidden": isPwConfirmed? "hidden":"text-red-500 text-xs pt-1"}`}>
                    비밀번호가 일치하지 않습니다
                </span>
                
                <label for="name" className="block text-gray-700 text-lg font-bold mb-2 mt-10">
                이름</label>
                <input id="name" type="text" placeholder="홍길동" ref={signupName}
                    className="shadow appearance-none border rounded w-full h-14 py-2 px-3 text-gray-700 
                    leading-tight focus:outline-none focus:shadow-outline"></input>

                <label for="contact" className="block text-gray-700 text-lg font-bold mb-2 mt-10">
                연락처</label>
                <input id="contact" type="text" placeholder="01012345678" ref={signupContact}
                    className="shadow appearance-none border rounded w-full h-14 py-2 px-3 text-gray-700 
                    leading-tight focus:outline-none focus:shadow-outline"></input>

                <div class="flex items-center justify-center">
                <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold 
                                w-96 mt-12
                                py-2 px-4 rounded focus:outline-none focus:shadow-outline" 
                        type="button"
                        //   
                        >
                    회원가입하기
                </button>
                </div>
            </form>
        </div>
    )
}
