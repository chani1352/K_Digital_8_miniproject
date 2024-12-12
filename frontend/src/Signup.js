import './css/signCss.css';

import { useRef, useState, useEffect } from "react";
import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';

import TailButton from "./UI/TailButton";

export default function Signup() {
    const navigate = useNavigate();
    const signupEmail = useRef('');
    const signupPw = useRef('');
    const signupPwConfirmed = useRef('');
    const signupName = useRef('');
    const signupContact = useRef('');

    const [btnDisabled, setBtnDisabled] = useState(true);

    const [email, setEmail] = useState('');
    const [emailBorder, setEmailBorder] = useState('normal');
    const [password, setPassword] = useState('');
    const [pwConfirmed, setPwConfirmed] = useState('');
    const [name, setName] = useState('');

    const [isPwConfirmed, setIsPwConfirmed] = useState(false);
    const [isEmailConfirmed, setIsEmailConfirmed] = useState(false);    //이메일 중복여부 체크
    
    
    const emailChange = () => {
        setEmail(signupEmail.current.value);
        setIsEmailConfirmed(false);
        setEmailBorder('normal');
    }

    const changePassword = () => {
        setPassword(signupPw.current.value);
    }

    const changePwConfirmed = () => {
        setPwConfirmed(signupPwConfirmed.current.value);
    }

    const changeName = () => {
        setName(signupName.current.value);
    }

    //비밀번호 일치 여부 셋팅
    useEffect(() => {
        if (pwConfirmed === password && pwConfirmed.length > 0) {
            setIsPwConfirmed(true);
        } else {
            setIsPwConfirmed(false);
        }
    }, [pwConfirmed, password]);

    useEffect(() => {
        if( email && isPwConfirmed && name){
            setBtnDisabled(false);
        } else {
            setBtnDisabled(true);
        }
    }, [email, isPwConfirmed, name]);

    const clickSignUp = (e) => {
        e.preventDefault();
        // form 유효성 다 확인 하고나서 post 진행

        //1. 이메일 중복확인 유효성
        if(!isEmailConfirmed){
            alert("이메일 중복 확인을 진행해주세요");
            setBtnDisabled(true);
            return;
        }
        //2. 비밀번호 유효성

        //3. 이름 유효성

        postSignUp();
    }
    
    // useEffect(()=>{
    //     console.log("useEffect");
    // },[])

    //서버에 전달
    const postSignUp = async () => {
        
        console.log("post");
<<<<<<< HEAD
        const url = 'http://10.125.121.214:8080/register';
=======
        const url = 'http://localhost:8080/register';
>>>>>>> bd987e1cc70756c2aaad9fe8d99adc2f0df53ed6
        const postData = {
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                email:signupEmail.current.value,
                password:signupPw.current.value,
                name:signupName.current.value,
                number:signupContact.current.value
            })
        }
    
        await fetch(url,postData)
        .then(resp=>{
            // console.log("sucess result is " + resp);
            return resp.json();
        }).then(result=>{
            console.log("result is ");
            console.log(result);
            // setDataBoard(result);
            navigate('/welcome')
        }).catch(err=>{
            console.error("Error fetching Board:", err);
        });
    }

    const dupleCheck = async(e) => {
        e.preventDefault();
        if(!signupEmail.current.value){
            alert("이메일을 입력하세요");
            signupEmail.current.focus();
            return;
        }
        
<<<<<<< HEAD
        const url = 'http://10.125.121.214:8080/findMember?email='+signupEmail.current.value;

        await fetch(url)
        .then(resp=>{
            console.log("resp is " + resp);
            return resp.json();
        }).then(result=>{
            console.log("result is " + result);
            if(result==true) {
                //alert("이미 등록되어 있는 이메일 입니다.");
                setIsEmailConfirmed(false);
                setEmailBorder('err');
                setBtnDisabled(true);
                signupEmail.current.value='';
                signupEmail.current.focus();
            } 
            else {
                alert("사용 가능한 이메일 입니다");
                setIsEmailConfirmed(true);
                if( email && isPwConfirmed && name){
                    setBtnDisabled(false);
                }
            }                
        }).catch(err=>{
            console.error("Error fetching Board:", err);
        });
=======
        // const resp = await axios.post(url, postData);
        const resp = await fetch('http://localhost:8080/register',postData);
        if (resp.ok) console(resp);
        else    console.log("실패");
>>>>>>> bd987e1cc70756c2aaad9fe8d99adc2f0df53ed6
    }

    return (
        <div className="w-[560px] h-full flex flex-col justify-center items-center">
            <form className="flex flex-col w-[360px] my-10 ">
                <label for="email" className="input_label mt-[30px]">
                    이메일<span className='pl-1 text-red-500 '>*</span></label>
                    <div className='flex justify-between w-[360px]'>
                        <input id="email" type="text" placeholder="abc@abc.com" ref={signupEmail}
                        className={`input_box_short w-[260px] border_${emailBorder}`}
                        onChange={emailChange}></input>
                        <TailButton caption={'중복확인'} handleClick={dupleCheck} color={'blueSmallText'} 
                                    style={'w-[90px] h-[44px]'} 
                                    fontStyle={'text-[13px] font-semibold font-[NanumSquareNeoB]'}/>
                    </div>
                    <span className={`${emailBorder==="normal" ? "hidden" : "text-red-500 text-xs pt-1"}`}>
                    이미 등록되어 있는 이메일 입니다.
                    </span>
                

                <label for="password" className="input_label mt-[30px] ">
                    비밀번호<span className='pl-1 text-red-500'>*</span></label>
                <input id="password" type="password" placeholder="********" ref={signupPw}
                    onChange={changePassword}
                    className="input_box"></input>

                <label for="passwordcf" className="input_label mt-[30px]">
                    비밀번호 확인<span className='pl-1 text-red-500'>*</span></label>
                <input id="passwordcf" type="password" placeholder="********" ref={signupPwConfirmed}
                    onChange={changePwConfirmed}
                    className={`input_box ${pwConfirmed.length === 0 ? "border_normal" : isPwConfirmed ? "border_normal" : "focus:outline-none border_err"}`}></input>
                <span className={`${pwConfirmed.length === 0 ? "hidden" : isPwConfirmed ? "hidden" : "text-red-500 text-xs pt-1"}`}>
                    비밀번호가 일치하지 않습니다
                </span>

                <label for="name" className="input_label mt-[30px]">
                    이름<span className='pl-1 text-red-500'>*</span></label>
                <input id="name" type="text" placeholder="홍길동" ref={signupName}
                    className="input_box" onChange={changeName}></input>

                <label for="contact" className="input_label mt-[30px]">
                    연락처</label>
                <input id="contact" type="text" placeholder="01012345678" ref={signupContact}
                    className="input_box"></input>

                <div class="flex items-center justify-center mt-[45px] mb-[30px]">
                    <TailButton caption={'회원가입하기'} color={'blue'} handleClick={clickSignUp}
                        style={'w-[360px] h-12 text-[14px]'} disabled={btnDisabled? "disabled": ""} />
                    
                </div>
            </form>
        </div>
    )
}
