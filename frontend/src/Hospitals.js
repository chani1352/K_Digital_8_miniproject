import HospitalCard from "./UI/HospitalCard";
import TailButton from "./UI/TailButton";
import { useRef, useState, useEffect } from "react";
import axios from 'axios';

export default function Hospitals() {
  const region1 = [ {cd:"1100000000", cdNm:"서울특별시"}, {cd:"2600000000", cdNm:"부산광역시"}, {cd:"2700000000", cdNm:"대구광역시"}, {cd:"2800000000", cdNm:"인천광역시"},
                    {cd:"2900000000", cdNm:"광주광역시"}, {cd:"3000000000", cdNm:"대전광역시"}, {cd:"3100000000", cdNm:"울산광역시"}, {cd:"3600000000", cdNm:"세종특별자치시"},
                    {cd:"4100000000", cdNm:"경기도"}, {cd:"4300000000", cdNm:"충청북도"}, {cd:"4400000000", cdNm:"충청남도"}, {cd:"4600000000", cdNm:"전라남도"}, {cd:"4700000000", cdNm:"경상북도"},
                    {cd:"4800000000", cdNm:"경상남도"}, {cd:"5000000000", cdNm:"제주특별자치도"}, {cd:"5100000000", cdNm:"강원특별자치도"}, {cd:"5200000000", cdNm:"전북특별자치도"}
  ]

  const [ops1, setOps1] = useState([]);
  
  //페이지 첫 로딩시 실행 (시/도 옵션 만들기)
  useEffect(()=>{
    let options1 = region1.map(ops=> <option key={ops.cd} value={ops.cd}>{ops.cdNm}</option>);
    setOps1(options1);
  },[]);

  const selectReg1 = async (e) => {
    console.log("시/도 :" , e.target.value);
    let url = "https://apis.data.go.kr/1790387/orglist3/getCondSggCd3?";
    let key = "BrWobrMEW9ec09ztWv0IXtPs3Z39MOf8jtxl27UnVy4jnZ%2FCktcP1mCywJd%2F%2FBTF300vXPA2aV8HGakMYTWopw%3D%3D";
    // let key = "BrWobrMEW9ec09ztWv0IXtPs3Z39MOf8jtxl27UnVy4jnZ/CktcP1mCywJd//BTF300vXPA2aV8HGakMYTWopw==";
    
    url += "serviceKey="+key;
    url += "&brtcCd="+e.target.value +"&returnType=JSON";
    console.log("url: ", url);
    
    // ============= axios ==============
    // const {data} = axios.get(url, {
    //     headers: {
    //       'Accept': 'application/json'
    //     }
    //   });
    //   console.log("data : ", data);


    // ============ fetch ==================
    const resp = await fetch(url);
    // console.log("resp : ", typeof(resp.ok));
    console.log("resp : ", resp);
    // console.log("resp : ", resp.Response);
    // if(resp.ok) console.log("ok data : ", resp.data);
    const data = await (resp.json());
    console.log("data : ", data);
  }
  const examples = [
    {
      name : "365삼성의원",
      address : "서울특별시 강남구 도곡로 331, (역삼동) 7층",
      vlist : "인플루엔자(Flu) 접종 가능"
    },
    {
      name : "강남더드림병원",
      address : "서울특별시 서울특별시 서울특별시 강남구 선릉로 404, (대치동) 더드림병원 ",
      vlist : "사람유두종바이러스_자궁경부암 접종 가능"
    }
  ]

  const hospitalSearch = () => {

  }
  return (
    <div className="w-3/5 flex flex-col justify-center bg-lime-50 ">
      <div className="flex justify-center items-center my-5">
        <select id="countries" 
                onChange={selectReg1}
                class=" w-1/3 h-12 mx-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
          <option selected>시/도</option>
          {ops1}
        </select>
        <select id="countries" class=" w-1/3 h-12   mx-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
          <option selected>시/군/구</option>
          <option value="US">United States</option>
          <option value="CA">Canada</option>
          <option value="FR">France</option>
          <option value="DE">Germany</option>
        </select>
        <TailButton caption={'검색'} color={'blue'} handleClick={hospitalSearch}
            style={'w-1/3 h-12  mx-2 text-[14px] '} />
      </div>
      <div className="flex flex-col items-center">
        <HospitalCard name={examples[0].name} address={examples[0].address} vlist={examples[0].vlist}/>
        <HospitalCard name={examples[1].name} address={examples[1].address} vlist={examples[1].vlist}/>
        <div>페이징</div>
      </div>
    </div>
    
  )
}
