import HospitalCard from "./UI/HospitalCard";
import TailButton from "./UI/TailButton";
import { useRef, useState, useEffect } from "react";
import axios from 'axios';

export default function Hospitals() {
  
  const region1 = [{ cd: "1100000000", cdNm: "서울특별시" }, { cd: "2600000000", cdNm: "부산광역시" }, { cd: "2700000000", cdNm: "대구광역시" }, { cd: "2800000000", cdNm: "인천광역시" },
  { cd: "2900000000", cdNm: "광주광역시" }, { cd: "3000000000", cdNm: "대전광역시" }, { cd: "3100000000", cdNm: "울산광역시" }, { cd: "3600000000", cdNm: "세종특별자치시" },
  { cd: "4100000000", cdNm: "경기도" }, { cd: "4300000000", cdNm: "충청북도" }, { cd: "4400000000", cdNm: "충청남도" }, { cd: "4600000000", cdNm: "전라남도" }, { cd: "4700000000", cdNm: "경상북도" },
  { cd: "4800000000", cdNm: "경상남도" }, { cd: "5000000000", cdNm: "제주특별자치도" }, { cd: "5100000000", cdNm: "강원특별자치도" }, { cd: "5200000000", cdNm: "전북특별자치도" }
  ]

  const ops1Ref = useRef();
  const ops2Ref = useRef();

  const [ops1, setOps1] = useState([]);
  const [ops2, setOps2] = useState([]);

  const [hosCards, setHosCards] = useState([]);

  //페이지 첫 로딩시 실행 (시/도 옵션 만들기)
  useEffect(() => {
    let options1 = region1.map(ops => <option key={ops.cd} value={ops.cd}>{ops.cdNm}</option>);
    setOps1(options1);

    setHosCards(<div className="opacity-30 w-4/5 pt-10"><img src="./img/findHospitalImg.png"/></div>);
  }, []);


  // 첫번째 선택되면 그에 따른 시/군/구 셋팅하기
  const selectReg1 = async (e) => {
    let items;
    console.log("시/도 :", e.target.value);
    let url = "https://apis.data.go.kr/1790387/orglist3/getCondSggCd3?";
    let key = "BrWobrMEW9ec09ztWv0IXtPs3Z39MOf8jtxl27UnVy4jnZ%2FCktcP1mCywJd%2F%2FBTF300vXPA2aV8HGakMYTWopw%3D%3D";
    
    url += "serviceKey=" + key;
    url += "&brtcCd=" + e.target.value + "&returnType=JSON";
    console.log("url: ", url);

    await axios.get(url)
      .then(resp => {
        console.log("resp : ", resp);
        let data = resp.data;
        console.log("data : ", data);
        data = data.replace('"resultCode":00', '"resultCode":"00"');
        data = data.replace(/"item":/g, '');

        let parsedData;
        try {
          parsedData = JSON.parse(data);
          // console.log("파싱된 JSON 데이터:", parsedData.response);
          items = parsedData.response.body.items;
        } catch (error) {
          console.error("JSON 파싱 오류:", error);
        }

      }).catch(err => { console.log(err); });

      let options2 = items.map(ops => <option key={ops.cd} value={ops.cd}>{ops.cdNm}</option>);
      setOps2(options2);
      
  }
  const examples = [
    {
      name: "365삼성의원",
      address: "서울특별시 강남구 도곡로 331, (역삼동) 7층",
      vlist: "인플루엔자(Flu) 접종 가능"
    },
    {
      name: "강남더드림병원",
      address: "서울특별시 서울특별시 서울특별시 강남구 선릉로 404, (대치동) 더드림병원 ",
      vlist: "사람유두종바이러스_자궁경부암 접종 가능"
    }
  ]

  const fetchHospital = async(cd1, cd2) => {
    let url = "https://apis.data.go.kr/1790387/orglist3/getOrgList3?"
    let key = "BrWobrMEW9ec09ztWv0IXtPs3Z39MOf8jtxl27UnVy4jnZ%2FCktcP1mCywJd%2F%2FBTF300vXPA2aV8HGakMYTWopw%3D%3D";
    url = `${url}serviceKey=${key}`;
    url = `${url}&pageNo=1&numOfRows=10&brtcCd=${cd1}&sggCd=${cd2}&returnType=JSON`;
    // &searchTpcd=ADDR&searchWord=%EC%84%9C%EC%9A%B8&returnType=XML

    console.log("url : ", url);
    
    const resp = await axios.get(url);
    // console.log("resp : ", resp.data);

    let data = resp.data;
    // 데이터 오류 처리
    data = data.replace('"resultCode":00', '"resultCode":"00"');
    data = data.replace(/"item":/g, '');
    data = data.replace(/"vcnInfo":/g, '');
    
    let parsedData = JSON.parse(data);
    console.log("파싱된 JSON 데이터:", parsedData);

    const dataAll = parsedData.response.body;
    
    //총 페이지수
    let totalPage = dataAll.maxPage;
    // 총 데이터 개수
    let totalCount = dataAll.totalCount;

    let hospitalAll = dataAll.items;

    const cards = hospitalAll.map(h=> <HospitalCard key={h.orgcd} hospital={h} />);
    
    setHosCards(cards);


  }
  const hospitalSearch = () => {
    console.log("시/도 : ", ops1Ref.current.value);
    console.log("시/군/구  : ", ops2Ref.current.value);

    let sggCd = ops2Ref.current.value;
    if(ops1Ref.current.value === "default1"){
      alert("시/도를 선택하세요");
      ops1Ref.current.focus();
      return;
    }

    if(ops2Ref.current.value === "default2"){
      sggCd = "";
    }
    fetchHospital(ops1Ref.current.value, sggCd);
  }

  return (
    <div className="w-3/5 flex flex-col justify-center">
      <div className="flex justify-center items-center my-5">
        <select id="countries"
                onChange={selectReg1}
                ref={ops1Ref}
                class=" w-1/3 h-12 mx-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-0 focus:border-2 focus:border-blue-500">
          <option selected value="default1">시/도</option>
          {ops1}
        </select>
        <select id="countries" 
                ref={ops2Ref}
                class=" w-1/3 h-12 mx-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-0 focus:border-2 focus:border-blue-500">
          <option selected value="default2">시/군/구</option>
          {ops2}
        </select>
        <TailButton caption={'검색'} color={'blue'} handleClick={hospitalSearch}
          style={'w-1/3 h-12  mx-2 text-[14px] '} />
      </div>
      <div className="flex flex-col items-center">
        {hosCards}
        <div>페이징</div>
      </div>
    </div>

  )
}
