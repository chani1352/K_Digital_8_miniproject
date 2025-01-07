import "./css/vaccines.css";
import VaccineCard from "./UI/VaccineCard";
import { useState, useEffect } from 'react';
import Pagination from "./UI/Pagination";

export default function Vaccines() {

  const [vacCards, setVacCards] = useState([]);
  const [periName, setPeriName] = useState([]);
  const [vaccineAllList, setVaccineAllList] = useState([]);
  const [isClick, setIsClick] = useState(null);
  const [isClicks, setIsClicks] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [pages, setPages] = useState('');

  const period = {
    '전체': { '전체': 15 },
    '신생아': { '출생 직후': 0, '4주이내': 1 },
    '영아기': { '1개월': 2, '2개월': 3, '4개월': 4, '6개월': 5 },
    '유아기': { '12개월': 6, '15개월': 7, '18개월': 8, '19개월': 9, '24개월': 10, '만4세': 11 },
    '아동기': { '만6세': 12, '만11세': 13, '만12세': 14 }
  }

  const dataAll = async () => {
    const url = 'http://10.125.121.214:8080/findVaccine';
    await fetch(url)
      .then(resp => resp.json())
      .then(data => setVaccineAllList(data))
      .catch(err => console.error("Error fetching Board:", err));
  }

  useEffect(() => {
    dataAll();
  }, []);

  useEffect(() => {
    vaccineAll('전체');
  }, [vaccineAllList]);

  useEffect(() => {
    selectVaccine(isClicks, currentPage);
    // console.log("page : ",currentPage)
  }, [currentPage]);

  const vaccineAll = (caption) => {
    setPeriName(Object.entries(period[caption]).map(([key, value]) =>
      <button key={key} onClick={() => selectVaccine(value, 1)}
        id={`cate${value}`}
        className={`category2 font-bold mr-5`}>
        {key}</button>));
    selectVaccine(Object.values(period[caption])[0], 1);
    setIsClick(caption);
    setCurrentPage(1);
  }

  //세부 카테고리 변경될때마다 색상 설정
  useEffect(() => {
    const cateBtns = document.getElementsByClassName("category2");
    for (let i = 0; i < cateBtns.length; i++) {
      cateBtns[i].classList.remove('category2_selected');
      cateBtns[i].classList.add('category2_unselected');
    }

    const selectedBtn = document.getElementById("cate" + isClicks);
    if (!selectedBtn) return;
    selectedBtn.classList.remove('category2_unselected');
    selectedBtn.classList.add('category2_selected');
    setCurrentPage(1);
  }, [isClicks]);

  const selectVaccine = (value, crtPage) => {
    setIsClicks(value);
    console.log("page1 : ", crtPage);
    let selectVaccine = vaccineAllList;
    if (value !== 15 && vaccineAllList !== "") {
      selectVaccine = vaccineAllList.filter(item => {
        return item["periodFrom"] <= value && item["periodTo"] >= value;
      })
    }
    let maxPage = Math.ceil(selectVaccine.length / 6);

    const pageTags = <Pagination totalPage={maxPage}
      setCurrentPage={setCurrentPage}
      currentPage={crtPage}
    />
    selectVaccine = selectVaccine.slice((crtPage * 6) - 6, crtPage * 6);

    const cards = selectVaccine.map(item => <VaccineCard key={item.idx} vaccine={item} />);
    setVacCards(cards);
    setPages(pageTags);
  }

  return (
    <div className="w-full">
      <div className="w-full max-w-[750px] flex justify-between  my-20 mx-auto">
        <div>
          <button onClick={() => vaccineAll('전체')} className={`font-bold ${isClick === "전체" ? "text-black" : "text-gray-400"}`}>
            <img className={`w-32 rounded-3xl  p-7 mb-4 ${isClick === "전체" ? "bg-gray-200" : "bg-gray-50"}`} src='./img/vaccinepage/menuall.png' />
            전체
          </button>
        </div>
        <div>
          <button onClick={() => vaccineAll('신생아')} className={`font-bold ${isClick === "신생아" ? "text-black" : "text-gray-400"}`}>
            <img className={`w-32 rounded-3xl  p-6 mb-4 ${isClick === "신생아" ? "bg-gray-200" : "bg-gray-50"}`} src='./img/vaccinepage/footprint.png' />
            신생아
          </button>
        </div>
        <div>
          <button onClick={() => vaccineAll('영아기')} className={`font-bold ${isClick === "영아기" ? "text-black" : "text-gray-400"}`}>
          <img className={`w-32 rounded-3xl  p-6 mb-4 ${isClick === "영아기" ? "bg-gray-200" : "bg-gray-50"}`} src='./img/vaccinepage/feeding-bottle.png' />
          영아기
          </button>
        </div>
        <div>
          <button onClick={() => vaccineAll('유아기')} className={`font-bold ${isClick === "유아기" ? "text-black" : "text-gray-400"}`}>
          <img className={`w-32 rounded-3xl  p-6 mb-4 ${isClick === "유아기" ? "bg-gray-200" : "bg-gray-50"}`} src='./img/vaccinepage/babyface.png' />
          유아기
          </button>
        </div>
        <div>
          <button onClick={() => vaccineAll('아동기')} className={`font-bold ${isClick === "아동기" ? "text-black" : "text-gray-400"}`}>
          <img className={`w-32 rounded-3xl  p-6 mb-4 ${isClick === "아동기" ? "bg-gray-200" : "bg-gray-50"}`} src='./img/vaccinepage/babyboy.png' />
          아동기
          </button>
        </div>
      </div>
      <div className="w-[700px] mx-auto">
        <div className="m-5 text-lg">{periName}</div>
        <div className="grid grid-cols-2 gap-4 justify-items-center">
          {vacCards}
        </div>
        <div className="w-full flex items-center justify-center my-14">{pages}</div>
      </div>

    </div>
  )
}