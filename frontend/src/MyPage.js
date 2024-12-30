import TailButton from "./UI/TailButton"

import { useEffect } from "react";
import { useRecoilState } from 'recoil';
// import { loginToken, memInfo } from "./AtomMem";

export default function MyPage() {
    // const [atomToken, setAtomToken] = useRecoilState(loginToken);
    // const [atomMeminfo, setAtomMeminfo] = useRecoilState(memInfo);

    const loginToken = localStorage.getItem("token");
    const memName = localStorage.getItem("memName");
    const memEmail = localStorage.getItem("memEmail");

    console.log("memName: ",memName);
    const handleLogout = () => {
        // setAtomToken(null);
        // localStorage.removeItem("token");
        localStorage.clear();
        window.location.href = "/";
        console.log("logout 후 atomToken : ", loginToken);
    }

    return (
        <div className="w-[560px] h-full flex flex-col justify-start items-start py-12">
            <div className="w-full rounded-lg bg-red-100 p-5 my-5">
                <div className="font-NanumSquareNeoB"> 
                    {memName} 님, 반갑습니다.</div>
                <div className="text-sm text-gray-600 font-NanumSquareNeo"> 
                    이메일 : {memEmail} </div>
            </div>

            <div className="w-full mt">
                <div className="w-full h-14  flex items-end py-2 my-2  border-b-2">
                    내 정보 수정
                </div>

                <div>
                    내 정보 수정
                </div>

                <div>
                    내 정보 수정
                </div>
            </div>
            

            <div className ="" > 


            </div>
            마이페이지 입니다.

            <div> <TailButton caption={"로그아웃"} color={"blue"} handleClick={handleLogout} /> </div>
        </div>
    )
}
