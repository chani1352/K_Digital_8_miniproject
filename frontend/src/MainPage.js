import { useNavigate } from "react-router-dom";

export default function MainPage() {
  const navigate = useNavigate();

  return (
    <div className="w-full h-[800px] flex justify-center items-center
                    my-10 lg:my-0">
      <main className="grid grid-cols-1 lg:flex lg:flex-row gap-4 p-4">

        <button className="w-[360px] lg:w-[600px] h-[376px] aspect-square bg-blue-50"
        onClick={()=>navigate("./vaccines")}>
          <p>지금 아이에게 필요한</p>
          <p>예방 접종 정보 확인하기</p>
          <div>보러가기</div>
        </button>
        <div className=" flex flex-col gap-4 aspect-square">
          <button className="bg-white border w-[360px] h-[180px] p-5 flex flex-col"
                  onClick={()=>navigate("./hospitals")}>
            <p className="text-2xl font-bold mb-3">우리 아이 접종 관리</p>
            <div className="text-sm text-gray-600">
              <p>아이의 접종 내역 등록하고</p>
              <p>접종 스케줄을 체크해보세요!</p>
            </div>

            <div className="my-5 border rounded-3xl w-fit h-fit px-6 py-1"> 등록하기 </div>
          </button>
          <div className="bg-white border w-[360px] h-[180px] p-5">
            <p>가까운 병원은 어디있을까?</p>
            <p className="text-3xl font-bold">우리 동네 병원 찾기</p>
          </div>
        </div>
      </main>
    </div>

  )
}
