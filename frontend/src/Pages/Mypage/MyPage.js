import TailButton from "../../UI/TailButton"

import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"

export default function MyPage() {
    const navigate = useNavigate();

    const loginToken = localStorage.getItem("token");
    const memName = localStorage.getItem("memName");
    const memEmail = localStorage.getItem("memEmail");

    console.log("memName: ",memName);

    const clickLogout = () => {
        if(window.confirm("로그아웃 하시겠습니까?")){
            handleLogout();
          }
    }
    const handleLogout = () => {
        // setAtomToken(null);
        // localStorage.removeItem("token");
        if(memEmail.includes("Google")) {
            window.location.href = 'https://accounts.google.com/Logout';
        } else if (memEmail.includes("Naver") ) {
            window.location.href = 'https://nid.naver.com/nidlogin.logout';
        } else if (memEmail.includes("Kakao") ) {
            window.location.href = 'https://kapi.kakao.com/v1/user/logout';
        } 
        localStorage.clear();
        window.location.href = "/";
        console.log("logout 후 atomToken : ", loginToken);
    }

    return (
        <div className="w-[560px] h-full flex flex-col justify-start items-start py-12">
            <div className="w-full rounded-lg bg-red-100 p-5 my-5">
                <div className="font-NanumSquareNeoB"> 
                    {memName} 님, 반갑습니다!</div>
                <div className="text-sm text-gray-600 font-NanumSquareNeo mt-1"> 
                    이메일 : {memEmail} </div>
            </div>

            <div className="w-full mt">
                <div className="w-full h-14  flex items-center p-3 my-2  border-b-2">
                    <span className="hover:cursor-pointer"
                            onClick={()=>navigate('../modify')}>내 정보 수정</span>
                </div>

                <div className="w-full h-14  flex items-center p-3 my-2 ">
                    <span className="hover:cursor-pointer"
                            onClick={()=>navigate("../child")}>우리 아이 관리</span>
                </div>

                <div className="w-full h-14  flex items-center p-3 mt-32 my-2  ">
                    <span className="hover:cursor-pointer text-gray-500"
                            onClick={clickLogout}>로그아웃</span>
                </div>
            </div>
            

            {/* <div className ="" > 


            </div>
            마이페이지 입니다.

            <div> <TailButton caption={"로그아웃"} color={"blue"} handleClick={handleLogout} /> </div> */}
        </div>
    )
}
