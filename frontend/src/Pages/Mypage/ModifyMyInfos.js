import '../../css/signCss.css';
import { useRef, useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

import TailButton from "../../UI/TailButton";

export default function ModifyMyInfos() {

    const memEmail = localStorage.getItem("memEmail");
    const token = localStorage.getItem("token");

    const navigate = useNavigate();
    const refEmail = useRef('');
    const pwRef = useRef('');
    const pwRefConfirmed = useRef('');
    const nameRef = useRef('');
    const contactRef = useRef('');

    const [btnDisabled, setBtnDisabled] = useState(true);

    const [password, setPassword] = useState('');
    const [pwConfirmed, setPwConfirmed] = useState('');
    const [name, setName] = useState('');

    const [isPwConfirmed, setIsPwConfirmed] = useState(false);

    useEffect(() => {
        refEmail.current.value = memEmail;
        setPrevData();
    }, [])

    //form에 기존데이터 입력
    const setPrevData = async () => {
        try {
            const response = await fetch('http://10.125.121.214:8080/data', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,  // JWT 토큰을 Authorization 헤더에 포함
                },
            });
            const data = await response.json();  // JSON 형식으로 응답 받기
            console.log("멤버수정 prev data :" ,data);  // 서버에서 반환된 데이터


            //form에 기존데이터 입력
            nameRef.current.value = data.name;
            setName(data.name);
            contactRef.current.value = data.number;
        } catch (error) {
            console.error('Error fetching data', error);
        }
    }
    const changePassword = () => {setPassword(pwRef.current.value);}
    const changePwConfirmed = () => {setPwConfirmed(pwRefConfirmed.current.value);}
    const changeName = () => {setName(nameRef.current.value);}

    //비밀번호 일치 여부 셋팅
    useEffect(() => {
        if (pwConfirmed === password && pwConfirmed.length > 0) {
            setIsPwConfirmed(true);
        } else {
            setIsPwConfirmed(false);
        }
    }, [pwConfirmed, password]);

    useEffect(() => {
        if (isPwConfirmed && name) {
            setBtnDisabled(false);
        } else {
            setBtnDisabled(true);
        }
    }, [isPwConfirmed, name]);

    const clickSignUp = (e) => {
        e.preventDefault();
        // form 유효성 다 확인 하고나서 put 진행

        //2. 비밀번호 유효성

        //3. 이름 유효성

        putModify();
    }



    //서버에 전달
    const putModify = async () => {

        console.log("PUT(modify)");
        const url = 'http://10.125.121.214:8080/updateMember';
        const putData = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: memEmail,
                password: pwRef.current.value,
                name: nameRef.current.value,
                number: contactRef.current.value
            })
        }
        const resp = await fetch(url, putData);
        const data = await resp.json();

        if (!resp.ok) {
            throw new Error(`HTTP error! status: ${resp.status}`);
        }
        // ===========  수정 성공시 ==================== 
        alert("정보 수정이 완료되었습니다.");
        navigate("../mypage");
        console.log("resp : ", resp);
        console.log("data : ", data);

    }


    return (
        <div className="w-[560px] h-full flex flex-col justify-center items-center">
            <form className="flex flex-col w-[360px] my-10 ">
                <label for="email" className="input_label mt-[30px]">
                    이메일<span className='pl-1 text-red-500 '>*</span></label>
                <div className='flex justify-between w-[360px]'>
                    <input id="email" type="text" ref={refEmail}
                        className="input_box w-[260px] hover:cursor-not-allowed text-gray-500" disabled
                    />
                </div>

                <label for="password" className="input_label mt-[30px] ">
                    비밀번호<span className='pl-1 text-red-500'>*</span></label>
                <input id="password" type="password" placeholder="********" ref={pwRef}
                    onChange={changePassword}
                    autoComplete="new-password"
                    className="input_box"></input>

                <label for="passwordcf" className="input_label mt-[30px]">
                    비밀번호 확인<span className='pl-1 text-red-500'>*</span></label>
                <input id="passwordcf" type="password" placeholder="********" ref={pwRefConfirmed}
                    onChange={changePwConfirmed}
                    autoComplete="new-password"
                    className={`input_box ${pwConfirmed.length === 0 ? "border_normal" : isPwConfirmed ? "border_normal" : "focus:outline-none border_err"}`}></input>
                <span className={`${pwConfirmed.length === 0 ? "hidden" : isPwConfirmed ? "hidden" : "text-red-500 text-xs pt-1"}`}>
                    비밀번호가 일치하지 않습니다
                </span>

                <label for="name" className="input_label mt-[30px]">
                    이름<span className='pl-1 text-red-500'>*</span></label>
                <input id="name" type="text" placeholder="홍길동" ref={nameRef}
                    className="input_box" onChange={changeName}></input>

                <label for="contact" className="input_label mt-[30px]">
                    연락처</label>
                <input id="contact" type="text" placeholder="01012345678" ref={contactRef}
                    className="input_box"></input>

                <div class="flex items-center justify-center mt-[45px] mb-[30px]">
                    <TailButton caption={'수정하기'} color={'blue'} handleClick={clickSignUp}
                        style={'w-[360px] h-12 text-[14px]'} disabled={btnDisabled ? "disabled" : ""} />

                </div>
            </form>
        </div>
    )
}
