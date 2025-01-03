import { IoSearch } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

export default function MainPage() {
  const navigate = useNavigate();

  return (
    <div className="w-full h-[800px] flex justify-center items-center
                    my-10 lg:my-0">
      <main className="grid grid-cols-1 lg:flex lg:flex-row gap-4 p-4">

        <button className="w-[400px] h-[380px] lg:w-[450px] lg:h-[416px] bg-[#5c99ff] rounded-2xl
                          flex flex-col p-10 text-white"
                onClick={() => navigate("./vaccines")}>
          <p className="text-2xl font-bold">지금 아이에게 필요한</p>
          <p className="text-3xl font-bold">예방 접종 정보</p>
          <p className="text-sm mt-2">개월수, 나이별 예방 접종을 확인해보세요!</p>
          <div className="my-12 border bg-white border-[#5c99ff] text-[#5c99ff] font-NanumSquareNeoB rounded-3xl w-fit h-fit px-8 py-2 flex justify-center items-center"> 
            <IoSearch /><p className="ml-2">보러가기</p> 
            </div>
            
        </button>
        <div className=" flex flex-col gap-4 aspect-square ">

          <button className="bg-blue-50 rounded-2xl w-[400px] h-[200px] p-5 flex flex-col relative"
            onClick={() => navigate("./child")}>
            <p className="text-2xl font-bold mb-3">우리 아이 접종 관리</p>
            <div className="text-sm text-gray-600 text-left ">
              <p>아이의 접종 내역 등록하고</p>
              <p>접종 스케줄을 체크해보세요!</p>
            </div>
            <div className="my-5 border border-[#5c99ff] text-[#5c99ff] font-NanumSquareNeoB rounded-3xl w-fit h-fit px-6 py-1"> 등록하기 </div>
            <img src="/img/main/checklist.png" className="w-1/5 absolute right-5 bottom-5"></img>
          </button>

          <button className="bg-white border rounded-2xl w-[400px] h-[200px] p-5 flex flex-col relative"
                  onClick={() => navigate("./hospitals")}>
            <p>가까운 병원은 어디있을까?</p>
            <p className="text-3xl font-bold mt-1">우리 동네 병원 찾기</p>
            <img src="/img/main/hospital.png" className="w-1/5 absolute right-5 bottom-5"></img>
          </button>

        </div>
      </main>
    </div>

  )
}
