import TailButton from "../UI/TailButton";
import { useEffect, useState } from "react";
import { useRecoilState } from 'recoil';
import { loginToken, memInfo } from "../AtomMem";

export default function Register2({ info }) {
    const [atomMeminfo, setAtomMeminfo] = useRecoilState(memInfo);

    // console.log("info:", info.birth);
    // console.log("atomMeminfo:", atomMeminfo.email);

    const handleNext = async(e) => {
        e.preventDefault();
        // let url = "10.125.121.214:8080/registerChild?childName=aa&member=chan@naver.com&vaccine=1";
        let url = "http://10.125.121.214:8080/registerChild";

        const childData = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                childName : info.name,
                member : atomMeminfo.email,
                birth : info.birth
            })
        }

        console.log(childData);

        console.log("===== fetch ====== ");

        const resp = await fetch(url, childData);

        if (!resp.ok) {
            throw new Error(`HTTP error! status: ${resp.status}`);
        }
        // =========== 성공시 코드 짜야함 ==================== 
        console.log("resp : ", resp);
    }

    return (

        <div className="w-[560px] h-full flex flex-col justify-start items-center py-12">
            <div>
                <div>
                    2단계
                </div>
                <div>
                    아이의 접종 정보를 입력해주세요.
                </div>
            </div>
            <form className="flex flex-col w-[360px]">
                <label for="childName" className="input_label mt-[30px]">
                    백신<span className='pl-1 text-red-500 '>*</span></label>
                <input id="childName" type="text" placeholder="수두"
                    className="input_box mb-[30px]"></input>


                <div className="flex items-center justify-center mt-[10px]">
                    <TailButton caption={'다음'} color={'blue'} handleClick={handleNext}
                        style={'w-[360px] h-12 text-[14px] '} />
                </div>

            </form>

        </div>
    )
}
