import TailButton from "../../UI/TailButton";
import { useNavigate } from "react-router-dom";
export default function NotFound() {
    const navigate = useNavigate();
    return (
        <div className="w-2/3 h-[650px] flex flex-col justify-start items-center">
            <div className="w-full mt-20 flex justify-start items-center flex-col">
                <img src="/img/notFoundImg.png" className="w-1/3 mt-6" alt="404"></img>
                <p className="mt-2 font-[SBAggroM] text-[#4971b6]">NOT FOUND</p>
                <p className="text-2xl mt-12 font-NanumSquareNeoB">잘못된 경로를 요청하셨습니다.</p>
                <p className="text-gray-500">페이지의 주소가 잘못되었거나</p>
                <p className="text-gray-500">주소가 변경 혹은 삭제되어 찾을 수 없습니다.</p>
            </div>
            <div className="flex mt-12">
                <TailButton caption={"이전으로"} color="blue" handleClick={()=>navigate(-1)}
                            style={"px-8 py-3 mx-2"}/>
                <TailButton caption={"메인으로"} color="blue" handleClick={()=>navigate("/")}
                            style={"px-8 py-3 mx-2"}/>
            </div>
        </div>
    )
}

