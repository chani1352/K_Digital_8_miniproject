import "../css/hospitalCardCss.css";
import CardInfoSmall from "./CardInfoSmall"

export default function HospitalCard({ hospital }) {
  console.log("hospital: ", hospital);

  return (
    <div className="card flex m-5 ">
      <div className="w-4/5 ">
        <div className="h-1/4 pl-3 flex items-end">
          <CardInfoSmall text={"무료접종"} />
          <CardInfoSmall text={"필수접종"} />
          <CardInfoSmall text={"선택접종"} className="" />
        </div>
        <div className="h-3/4 px-6 flex flex-col justify-center items-start text-sm  ">
          <div className="py-1 flex w-full">
            <div className="text-[#8B8B8B] mr-6 w-1/6" >병원 이름</div> <div className="w-5/6">{hospital["orgnm"]}</div>
          </div>
          <div className="py-1 flex w-full">
            <div className="text-[#8B8B8B] mr-6 w-1/6" >병원 주소</div> <div className="w-5/6">{hospital["orgAddr"]}</div>
          </div>
          <div className="py-1 flex w-full">
            <div className="text-[#8B8B8B] mr-6 w-1/6" >접종 목록</div>
            <div className="w-5/6">
              {hospital["vcnList"][0]["vcnNm"]} {hospital["vcnList"].length - 1 === 0 ? "" : ` 외 ${hospital["vcnList"].length - 1}개 `}
            </div>

          </div>

          <div className="py-1 flex w-full">
            <div className="text-[#8B8B8B] mr-6 w-1/6" >접종 목록</div>
            <div className="w-5/6">
              <select id="countries"
                class="h-full w-full mx-2 bg-gray-50 border">
                <option selected>시/도</option>
              </select>
            </div>

          </div>

        </div>
      </div>
      <div className="w-1/5 flex justify-center items-center py-3 ">
        <div className="border-l border-[#D3D3D3] h-full w-full flex items-center justify-center">
          <img className="w-full px-3" src='../img/findHosBtn.png' />
        </div>
      </div>
    </div>
  )
}
