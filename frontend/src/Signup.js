import './css/signCss.css';

import { useRef, useState, useEffect } from "react";
import axios from 'axios';

import TailButton from "./UI/TailButton";

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
    useEffect(() => {
        if (pwConfirmed === password && pwConfirmed.length > 0) {
            setIsPwConfirmed(true);
        } else {
            setIsPwConfirmed(false);
        }
    }, [pwConfirmed, password]);

    const clickSignUp = () => {

        // form 유효성 다 확인 하고나서 post 진행
        postSignUp();
    }
    
    useEffect(()=>{
        console.log("useEffect");
        postSignUp();
    },[])

    //서버에 전달
    const postSignUp = async () => {
        console.log("post");
        const url = 'http://localhost:8080/register';
        const postData = {
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                // email:signupEmail.current.value,
                // password:signupPw.current.value,
                // name:signupName.current.value,
                // number:signupContact.current.value

                email:"abc@abc.com",
                password:"abc",
                name:"홍길동",
                number:"010-1234-1234"
            })
        }
        
        // const resp = await axios.post(url, postData);
        const resp = await fetch('http://localhost:8080/register',postData);
        if (resp.ok) console(resp);
        else    console.log("실패");
    }

    return (
        <div className="w-[560px] h-full flex flex-col justify-center items-center">
            <form className="flex flex-col w-[360px] my-10">
                <label for="email" className="input_label mt-[30px]">
                    이메일<span className='pl-1 text-red-500'>*</span></label>
                <input id="email" type="text" placeholder="abc@abc.com" ref={signupEmail}
                    className="input_box"></input>

                <label for="password" className="input_label mt-[30px] ">
                    비밀번호<span className='pl-1 text-red-500'>*</span></label>
                <input id="password" type="password" placeholder="********" ref={signupPw}
                    onChange={changePassword}
                    className="input_box"></input>

                <label for="passwordcf" className="input_label mt-[30px]">
                    비밀번호 확인<span className='pl-1 text-red-500'>*</span></label>
                <input id="passwordcf" type="password" placeholder="********" ref={signupPwConfirmed}
                    onChange={changePwConfirmed}
                    className={`${pwConfirmed.length === 0 ? "input_box" : isPwConfirmed ? "input_box" : "focus:outline-none input_box_err"}`}></input>
                <span className={`${pwConfirmed.length === 0 ? "hidden" : isPwConfirmed ? "hidden" : "text-red-500 text-xs pt-1"}`}>
                    비밀번호가 일치하지 않습니다
                </span>

                <label for="name" className="input_label mt-[30px]">
                    이름<span className='pl-1 text-red-500'>*</span></label>
                <input id="name" type="text" placeholder="홍길동" ref={signupName}
                    className="input_box"></input>

                <label for="contact" className="input_label mt-[30px]">
                    연락처</label>
                <input id="contact" type="text" placeholder="01012345678" ref={signupContact}
                    className="input_box"></input>

                <div class="flex items-center justify-center mt-[45px] mb-[30px]">
                    <TailButton caption={'회원가입하기'} color={'blue'} handleClick={clickSignUp}
                        style={'w-[360px] h-12 text-[14px]'} />
                    
                </div>
            </form>
        </div>
    )
}
