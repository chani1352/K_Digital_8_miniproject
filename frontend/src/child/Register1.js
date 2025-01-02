import { IoMdCamera } from "react-icons/io";
import TailButton from "../UI/TailButton";
import Register2 from "./Register2";
import { useEffect, useState, useRef } from "react";

export default function Register1({goNext}) {
    const nameRef = useRef();
    const birthRef = useRef();
    const fileRef = useRef();

    // 달력 날짜 오늘이후로 선택 불가능하도록 max 설정
    useEffect(() => {
        const today= new Date();
        let dateString = '';
        dateString = dateString + today.getFullYear() +"-"
                    +(("0" +(today.getMonth()+1))).slice(-2) + "-"
                    +("0" +today.getDate()).slice(-2)

        birthRef.current.max = dateString;
    }, []);

    const beforeNext = () => {
        const childInfo = {
            name : nameRef.current.value,
            birth : birthRef.current.value
        }
        goNext(<Register2 info={childInfo}/>);
    }

    const handleFileClick = () => {
        fileRef.current.click();    //input 클릭
    }

    const handlePhotoChange = (e) => {
        const file = e.target.files[0]  //첫번째 파일만 선택
        if(file) {
            upLoadFile(file);           //파일을 서버에 업로드
        }
    }
    
    const upLoadFile = async(file) => {
        console.log("아이 프로필 사진 등록 file:", file);
        const formData = new FormData();
        // formData.append('child_idx', child)
    }
    
    return (
        <div className="w-[560px] h-full flex flex-col justify-start items-center py-12">
            <div className="w-full flex flex-col items-center m-6">
                <div>
                    1단계
                </div>
                <div>
                    아이의 기본 정보를 입력해주세요.
                </div>

                <div className="w-[180px] h-[180px] m-6 relative drop-shadow-lg ">
                <img src='/img/child/child_profile_0.png' alt="child_profile" className='w-fit h-fit mr-2 rounded-lg'></img>
                
                <input type="file" accept="image/*" ref={fileRef} onChange={handlePhotoChange} className="hidden"/>
                <button onClick={handleFileClick}
                        className="size-9 bg-white absolute right-2 top-2
                                rounded-full flex justify-center items-center text-xl
                                drop-shadow-lg">
                    <IoMdCamera />
                </button>
                
                
                        
                    {/* './img/faceonly.png' */}
                    
                </div>
            </div>
            <div className="flex flex-col w-[360px]">
                <label htmlFor="childName" className="input_label mt-[30px]">
                    이름<span className='pl-1 text-red-500 '>*</span></label>
                <input id="childName" type="text" placeholder="ex. 김예방" ref={nameRef}
                    className="input_box mb-[30px]"></input>
                <label htmlFor="childBirth" className="input_label ">
                    생년월일<span className='pl-1 text-red-500 '>*</span></label>
                <input id="childBirth" type="date" placeholder="생년월일" ref={birthRef}
                    className="input_box mb-[30px]" />

                <div className="flex items-center justify-center mt-[10px]">
                    <TailButton caption={'다음'} color={'blue'} handleClick={beforeNext}
                        style={'w-[360px] h-12 text-[14px] '} />
                </div>

            </div>

        </div>
    )
}
