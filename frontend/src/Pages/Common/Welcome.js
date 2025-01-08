import TailButton from "../../UI/TailButton";
import { useNavigate } from "react-router-dom";
export default function Welcome() {
    const navigate = useNavigate();
    return (
        <div className="w-[560px] my-12 flex flex-col justify-center items-center">
            
            <div className="w-[320px] h-[320px] bg-gray-50 my-5 flex justify-center items-center p-16 rounded-full "> 
                <img src="./img/family.png" alt="welcome" />
            </div>
            
            <div className="font-NanumSquareNeoB text-3xl py-5">
                회원가입이 완료되었습니다.

            </div>
            <div className="font-NanumSquareNeoB text-3xl py-5">
                환영합니다.
            </div>
            <div className="grid grid-cols-2 gap-4 w-full py-5">
                <TailButton caption={"로그인하기"} color={'blue'} handleClick={()=>{navigate("/login")}} style={'w-full h-12 text-[16px]'}/>
                <TailButton caption={"메인화면으로"} color={'blue'} handleClick={()=>{navigate("/")}} style={'w-full h-12 text-[16px]'}/>
            </div>
        </div>

    )
}
