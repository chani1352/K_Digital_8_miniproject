import HospitalCard from "./UI/HospitalCard";
import TailButton from "./UI/TailButton";
import Pagination from "./UI/Pagination";
import HospitalModal from "./hospital/HospitalModal";
import { useLocation, useSearchParams, Link, useNavigate } from "react-router-dom";
import sggcode from "./data/sggcode.json";

import { useRef, useState, useEffect } from "react";
import axios from 'axios';

export default function Hospitals() {

  const region1 = [{ cd: "1100000000", cdNm: "서울특별시" }, { cd: "2600000000", cdNm: "부산광역시" }, { cd: "2700000000", cdNm: "대구광역시" }, { cd: "2800000000", cdNm: "인천광역시" },
  { cd: "2900000000", cdNm: "광주광역시" }, { cd: "3000000000", cdNm: "대전광역시" }, { cd: "3100000000", cdNm: "울산광역시" }, { cd: "3600000000", cdNm: "세종특별자치시" },
  { cd: "4100000000", cdNm: "경기도" }, { cd: "4300000000", cdNm: "충청북도" }, { cd: "4400000000", cdNm: "충청남도" }, { cd: "4600000000", cdNm: "전라남도" }, { cd: "4700000000", cdNm: "경상북도" },
  { cd: "4800000000", cdNm: "경상남도" }, { cd: "5000000000", cdNm: "제주특별자치도" }, { cd: "5100000000", cdNm: "강원특별자치도" }, { cd: "5200000000", cdNm: "전북특별자치도" }
  ]

  const navigate = useNavigate();

  const ops1Ref = useRef();
  const ops2Ref = useRef();

  const [ops1, setOps1] = useState([]);
  const [ops2, setOps2] = useState([]);

  const [hosCards, setHosCards] = useState([]);

  const location = useLocation();
  const [sparams] = useSearchParams();
  const qlist = [...sparams];

  const [vaccineAllList, setVaccineAllList] = useState([]);

  //페이지 정보
  const [currentPage, setCurrentPage] = useState(0);
  const [pages, setPages] = useState('');

  //필수접종,선택접종 구분을 위한 백신 정보
  useEffect(()=>{
    const dataAll = async () => {
      const url = 'http://10.125.121.214:8080/findVaccine';
      await fetch(url)
        .then(resp => resp.json())
        .then(data => setVaccineAllList(data))
        .catch(err => console.error("Error fetching Board:", err));
    }
    dataAll();
  },[]);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState('');

  const openModal = (data) => {
    // console.log("openModal");
    setModalData(data)
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  //쿼리 파라미터들이 변경될때마다 실행
  useEffect(() => {
    window.scrollTo(0, 0);
    // 쿼리가 1개 이상일 때
    if (qlist.length >= 1) {
      // console.log("if : ", qlist[0][1],qlist[1][1],qlist[2][1] );
      fetchHospital(qlist[0][1], qlist[1][1], qlist[2][1]);
    }

    //쿼리가 없을 때 (첫 페이지 로딩)
    else {
      let options1 = region1.map(ops => <option key={ops.cd} value={ops.cd}>{ops.cdNm}</option>);
      setOps1(options1);

      // 페이지 네이션 및 검색결과 빈 상태로
      setPages('');
      setHosCards(
      <div className="opacity-30 w-4/5 pt-10">
        <img src="./img/findHospitalImg.png" />
        <p className="text-3xl font-[SBAggroM] text-[#002532] text-center mt-5">우리 동네 근처 병원을 찾아보세요</p>
      </div>);
    }
  }, [location.search]);

  // 시/도 선택되면 그에 따른 시/군/구 셋팅하기
  const selectReg1 = async (e) => {
    // ============== json 파일 바로 처리하기 ========================
    let sggdata = sggcode[e.target.value];
    let options2 = sggdata.map(ops => <option key={ops.cd} value={ops.cd}>{ops.cdNm}</option>);
    setOps2(options2);
  }

  //페이지 변경될때마다
  useEffect(() => {
    let sggCd = ops2Ref.current.value;

    let hrefUrl = "?&brtcCd=";
    hrefUrl += `${ops1Ref.current.value}${(sggCd === "default2") ? "" : `&sggCd=${sggCd}`}`;
    hrefUrl += `&pageNo=${currentPage}`;
    if (currentPage !== 0) {
      navigate(hrefUrl);
    }

  }, [currentPage]);


  // 병원정보 패치
  const fetchHospital = async (cd1, cd2, crtPage) => {
    setHosCards(<div className="flex opacity-30 w-4/5 h-full text-2xl pt-10 justify-center">로딩중...</div>);
    let url = "https://apis.data.go.kr/1790387/orglist3/getOrgList3?"
    const key = process.env.REACT_APP_DATA_KEY;

    url = `${url}serviceKey=${key}`;
    url = `${url}&pageNo=${crtPage}&numOfRows=10&brtcCd=${cd1}&sggCd=${cd2}&returnType=JSON`;

    console.log("fetch url : ", url);

    const resp = await axios.get(url);

    let data = resp.data;
    // 데이터 오류 처리
    data = data.replace('"resultCode":00', '"resultCode":"00"');
    data = data.replace(/"item":/g, '');
    data = data.replace(/"vcnInfo":/g, '');



    let parsedData = JSON.parse(data);
    const dataAll = parsedData.response.body;
    console.log("data :", dataAll);
    // //총 페이지 수
    let maxPage = dataAll.maxPage;
    // console.log("maxPage : ",maxPage);

    const pageTags = <Pagination totalPage={maxPage}
      setCurrentPage={setCurrentPage}
      currentPage={crtPage}
    />

    let hospitalAll = dataAll.items;

    const cards = hospitalAll.map(h=> <HospitalCard key={h.orgcd} hospital={h} vaccine={vaccineAllList} showDetail={()=>openModal(h)} />);

    setHosCards(cards);
    setPages(pageTags);
    // setPages("페이지");
  }

  //검색버튼 클릭
  const searchBtnClick = () => {
    // console.log("시/도 : ", ops1Ref.current.value);
    // console.log("시/군/구  : ", ops2Ref.current.value);

    let sggCd = ops2Ref.current.value;
    if (ops1Ref.current.value === "default1") {
      alert("시/도를 선택하세요");
      ops1Ref.current.focus();
      return;
    }

    setCurrentPage(1);

    let hrefUrl = "?&brtcCd=";
    hrefUrl += `${ops1Ref.current.value}${(sggCd === "default2") ? "" : `&sggCd=${sggCd}`}`;
    hrefUrl += "&pageNo=1";

    navigate(hrefUrl);
  }


  return (
    <div className="w-3/5 flex flex-col justify-center">
      <div className="flex justify-center items-center mt-14 mb-10">
        <select id="countries"
          onChange={selectReg1}
          ref={ops1Ref}
          className=" w-1/3 h-12 mx-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-0 focus:border-2 focus:border-blue-500">
          <option defaultValue value="default1">시/도</option>
          {ops1}
        </select>
        <select id="countries"
          ref={ops2Ref}
          className=" w-1/3 h-12 mx-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-0 focus:border-2 focus:border-blue-500">
          <option defaultValue value="default2">시/군/구</option>
          {ops2}
        </select>
        <TailButton caption={'검색'} color={'blue'} handleClick={searchBtnClick}
          style={'w-1/3 h-12  mx-2 text-[14px] '} />
      </div>
      <div className="flex flex-col items-center mb-6">
        {hosCards}
        <HospitalModal open={modalOpen} close={closeModal} data={modalData}/>
        <div className="my-12">{pages}</div>
      </div>
    </div>

  )
}
