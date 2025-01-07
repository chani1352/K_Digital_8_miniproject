import HospitalCard from "../../UI/Hospitals/HospitalCard";
import TailButton from "../../UI/TailButton";
import Pagination from "../../UI/Pagination";
import HospitalModal from "../../UI/Hospitals/HospitalModal";
import CustomSelectBox from "../../UI/CustomSelectBox";
import { useLocation, useSearchParams,  useNavigate } from "react-router-dom";
import sggcode from "../../data/sggcode.json";

import { useState, useEffect } from "react";
import axios from 'axios';

export default function Hospitals() {

  const sdOptions = [{ value: "1100000000", label: "서울특별시" }, { value: "2600000000", label: "부산광역시" }, { value: "2700000000", label: "대구광역시" }, { value: "2800000000", label: "인천광역시" },
  { value: "2900000000", label: "광주광역시" }, { value: "3000000000", label: "대전광역시" }, { value: "3100000000", label: "울산광역시" }, { value: "3600000000", label: "세종특별자치시" },
  { value: "4100000000", label: "경기도" }, { value: "4300000000", label: "충청북도" }, { value: "4400000000", label: "충청남도" }, { value: "4600000000", label: "전라남도" }, { value: "4700000000", label: "경상북도" },
  { value: "4800000000", label: "경상남도" }, { value: "5000000000", label: "제주특별자치도" }, { value: "5100000000", label: "강원특별자치도" }, { value: "5200000000", label: "전북특별자치도" }
  ]

  const navigate = useNavigate();

  const [sggOptions, setSggOptions] = useState([]); // 시군구옵션

  const [selectedSD, setSelectedSD] = useState(null); // 선택된 시도 (지역1)
  const [selectedSgg, setSelectedSgg] = useState(null); // 선택된 시군구 (지역2)
  const [sggDisabled, setSggDisabled] = useState(true);

  const [btnDisabled, setBtnDisabled] = useState(true);

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
      // 페이지 네이션 및 검색결과 빈 상태로
      setPages('');
      setHosCards(
      <div className="opacity-30 w-3/5 pt-10">
        <img src="./img/findHospitalImg.png" alt="img" />
        <p className="text-3xl font-[SBAggroM] text-[#002532] text-center mt-5">우리 동네 근처 병원을 찾아보세요</p>
      </div>);
    }
  }, [location.search]);

  // 시/도 선택되면 그에 따른 시/군/구 셋팅하기
  useEffect(() => {
    if(!selectedSD) return;
    console.log("selectedSD:", selectedSD);
    // console.log("selectedOption1:", selectedOption2);
    setSggDisabled(false);  //시군구 비활성화 해제
    setSelectedSgg(null);   //시군구 선택사항 초기화
    setSggOptions(sggcode[selectedSD.value]); //시군구 셋팅
  }, [selectedSD]);

  // 옵션들 선택 여부에 따른 버튼 활성/비활성
  useEffect(()=>{
    if(!selectedSgg)  {
      setBtnDisabled(true);
      return;
    }
    setBtnDisabled(false);
  },[selectedSD, selectedSgg])

  //페이지 변경될때마다
  useEffect(() => {
    if(!selectedSD) return;
    if(!selectedSgg) return;
    let hrefUrl = "?&brtcvalue=";
    hrefUrl += `${selectedSD.value}&sggvalue=${selectedSgg.value}`;
    hrefUrl += `&pageNo=${currentPage}`;
    if (currentPage !== 0) {
      navigate(hrefUrl);
    }

  }, [currentPage]);


  // 병원정보 패치
  const fetchHospital = async (sd, sgg, crtPage) => {
    setHosCards(<div className="flex opacity-30 w-4/5 h-full text-2xl pt-10 justify-center">로딩중...</div>);
    let url = "https://apis.data.go.kr/1790387/orglist3/getOrgList3?"
    const key = process.env.REACT_APP_DATA_KEY;

    url = `${url}serviceKey=${key}`;
    url = `${url}&pageNo=${crtPage}&numOfRows=10&brtcCd=${sd}&sggCd=${sgg}&returnType=JSON`;

    console.log("fetch url : ", url);

    const resp = await axios.get(url);

    let data = resp.data;
    console.log("fetch후 data:",data);
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

    const cards = hospitalAll.map(h=> <HospitalCard key={h.orgvalue} hospital={h} vaccine={vaccineAllList} showDetail={()=>openModal(h)} />);

    setHosCards(cards);
    setPages(pageTags);
    // setPages("페이지");
  }

  //검색버튼 클릭
  const searchBtnClick = () => {
    setCurrentPage(1);

    let hrefUrl = "?&brtcvalue=";
    hrefUrl += `${selectedSD.value}&sggvalue=${selectedSgg.value}`;
    hrefUrl += "&pageNo=1";
    console.log("시구 : ", selectedSD.value);
    console.log("시군구 : ", selectedSgg.value);
    console.log(hrefUrl);
    navigate(hrefUrl);
  }


  return (
    <div className="w-3/5 flex flex-col justify-center">
      <div className="flex justify-center items-center mt-14 mb-10">
        <CustomSelectBox options={sdOptions} selectLabel="시/도" 
          selectedOption={selectedSD} setSelectedOption={setSelectedSD}
          size="w-[220px]" />
        <CustomSelectBox options={sggOptions} selectLabel="시/군/구" 
          selectedOption={selectedSgg} setSelectedOption={setSelectedSgg} 
          disabled={sggDisabled} size="w-[220px]" />
        <TailButton caption={'검색'} color={'blue'} handleClick={searchBtnClick}
          disabled={btnDisabled}
          style={`w-[150px] h-12  mx-2 text-[14px] `} />
      </div>

      <div className="flex flex-col items-center mb-6">
        {hosCards}
        <HospitalModal open={modalOpen} close={closeModal} data={modalData}/>
        <div className="my-12">{pages}</div>
      </div>
    </div>

  )
}
