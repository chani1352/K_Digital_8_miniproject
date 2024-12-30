import TailButton from "../UI/TailButton";
import Register2 from "./Register2";
import { useEffect, useState, useRef } from "react";

export default function Register1({goNext}) {
    const nameRef = useRef();
    const birthRef = useRef();

    const beforeNext = () => {
        const childInfo = {
            name : nameRef.current.value,
            birth : birthRef.current.value
        }
        goNext(<Register2 info={childInfo}/>);
    }

    return (
        <div className="w-[560px] h-full flex flex-col justify-start items-center py-12">
            <div>
                <div>
                    1단계
                </div>
                <div>
                    아이의 기본 정보를 입력해주세요.
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
