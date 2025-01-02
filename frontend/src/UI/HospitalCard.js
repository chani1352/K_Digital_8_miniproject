import "../css/hospitalCardCss.css";
import CardInfoSmall from "./CardInfoSmall"
import { useState, useEffect,useRef } from 'react';
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

export default function HospitalCard({ hospital,vaccine, showDetail }) {

  const dropdownRef = useRef();

  const [expanded, setExpanded] = useState(false);
  const [vlist, setVlist] = useState('');
  const [mandatory, setMandatory] = useState(false);
  const [option, setOption] = useState(false);

  //컴포넌트 첫 로딩시
  useEffect(() => {
    // makeSmallCard();
    // console.log("hospital vcnList :", hospital["vcnList"]);
    const first =  hospital["vcnList"][0]["vcncd"];
    const vlist_items = hospital["vcnList"].filter(i=>i["vcncd"] != first).map(i=>
        <div key={i["vcncd"]} className="flex text-xs py-1"><div className="w-6 h-full px-1"></div>{i["vcnNm"]}</div>
    );
    setVlist(vlist_items);
    setOptionCard();

    //드롭다운 영역 외 클릭시 닫게 하기
    function handleOutsideClick(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setExpanded(false); // 외부 클릭 시 닫기
      }
    }
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };



  }, []);

  const setOptionCard = () => {
    for (let i = 0; i < vaccine.length; i++) {
      for (let j = 0; j < hospital["vcnList"].length; j++) {
        if(mandatory&&option) return;
        if(hospital["vcnList"][j]["vcnNm"].slice(0,3) == vaccine[i]["disease"].slice(0,3)){
          if(vaccine[i]["optional"] == "필수접종") setMandatory(true);
          else setOption(true);
        }
      }
    }
  }

  const listClick = () => {
    setExpanded(!expanded);
    console.log("expanded : ", expanded);

  }

  const handleDetail = () => {
    console.log("병원 카드 클릭 ");
    showDetail();
  }

  return (
    <div className="card flex m-6">
      <div className="w-4/5">
        <div className="h-[44px] pl-3 flex items-end ">
          <CardInfoSmall text={"무료접종"} />

           {mandatory ? <CardInfoSmall text={"필수접종"} /> : ""}
           {option ? <CardInfoSmall text={"선택접종"} className="" /> : ""}

        </div>
        <div className="h-fit px-6 pb-3 flex flex-col justify-start items-start text-sm mt-3 ">
          <div className="py-1 flex w-full">
            <div className="text-[#8B8B8B] mr-6 w-1/6" >병원 이름</div> <div className="w-5/6">{hospital["orgnm"]}</div>
          </div>
          <div className="py-1 flex w-full">
            <div className="text-[#8B8B8B] mr-6 w-1/6" >병원 주소</div> <div className="w-5/6 h-[40px]">{hospital["orgAddr"]}</div>
          </div>
        
          {/* 접종목록 */}
          <div className="py-1 flex w-full">
            <div className="text-[#8B8B8B] mr-6 w-1/6" >접종 목록  </div>
            <div className="w-5/6 flex" ref={dropdownRef}>
              <button type="button" role="combobox" id="vList" aria-expanded={`${expanded}`} onClick={listClick}
                className={`flex flex-col items-start w-full text-xs
                   ${hospital["vcnList"].length - 1 === 0 ?
                  //단독일때
                  "cursor-default"
                  :
                  // 여러개일때
                  "bg-slate-100"}`}>
                    <div className="flex py-1">
                      
                    {hospital["vcnList"].length - 1 === 0 ? "" : <MdOutlineKeyboardArrowDown className="w-6 h-full px-1"/>}
                    {hospital["vcnList"][0]["vcnNm"]} {hospital["vcnList"].length - 1 === 0 ? " 접종 가능" : expanded? "":` 외 ${hospital["vcnList"].length - 1}개 `}
                    </div>
                
                <div  aria-labelledby="vList"
                  className={`${expanded ? "block" : "hidden"} cursor-default bg-slate-100
                                flex flex-col items-start z-10 max-h-[60px] w-full overflow-y-auto`}>
                  {vlist}
                </div>
              </button>
    
            </div>
          </div>

        </div>
      </div>
      <div className="w-1/5 flex justify-center items-center py-3 ">
        <div  onClick={handleDetail}
              className="border-l border-[#D3D3D3] h-full w-full flex items-center justify-center">
          <img className="w-full px-3 hover:cursor-pointer" src='../img/findHosBtn.png' />
        </div>
      </div>
    </div>
  )
}
