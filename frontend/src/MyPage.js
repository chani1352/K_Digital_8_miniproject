import TailButton from "./UI/TailButton"

import { useEffect } from "react";
import { useRecoilState } from 'recoil';
import { loginToken, memInfo } from "./AtomMem";

export default function MyPage() {
    const [atomToken, setAtomToken] = useRecoilState(loginToken);
    const [atomMeminfo, setAtomMeminfo] = useRecoilState(memInfo);

    //페이지 첫 로딩시 토큰 확인
    useEffect(()=> {

    }, []);

    console.log("memInfo: ",atomMeminfo);
    const handleLogout = () => {
        setAtomToken(null);
        window.location.href = "/";
        console.log("logout 후 atomToken : ", atomToken);
    }

    return (
        <div className="w-[560px] h-full flex flex-col justify-start items-start py-12">
            <div className="w-full rounded-lg bg-red-100 p-5 my-5">
                <div className="font-NanumSquareNeoB"> 
                    {atomMeminfo.name} 님, 반갑습니다.</div>
                <div className="text-sm text-gray-600 font-NanumSquareNeo"> 
                    이메일 : {atomMeminfo.email} </div>
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
