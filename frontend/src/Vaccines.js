import VaccineCard from "./UI/VaccineCard";
import { useState, useEffect } from 'react';

export default function Vaccines() {

  const [vacCards, setVacCards] = useState([]);
  const [periName, setPeriName] = useState([]);
  const [vaccineAllList, setVaccineAllList] = useState([]);
  const [isClick, setIsClick] = useState(null);
  const [isClicks, setIsClicks] = useState(null);

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

  useEffect(()=>{
    // console.log("isClicks1",isClicks);
  },[isClicks]);

  const vaccineAll = (caption) => {
    setPeriName(Object.entries(period[caption]).map(([key, value]) =>
                              <button key={key} onClick={() => selectVaccine(value)} 
                              className={`font-bold mr-5 ${isClicks === value ? "text-black-500" : "text-gray-400"}`}>
                              {key}</button>));
    selectVaccine(Object.values(period[caption])[0]);   
    setIsClick(caption);
  }

  const selectVaccine = (value) => {
    setIsClicks(value);
    // console.log("isClicks",isClicks);
    // console.log("value",value);
    let selectVaccine = vaccineAllList;
    if (value !== 15 && vaccineAllList !== "") {
      selectVaccine = vaccineAllList.filter(item => {
        return item["periodFrom"] <= value && item["periodTo"] >= value;
      })
    }
    const cards = selectVaccine.map(item => <VaccineCard key={item.idx} vaccine={item} />);
    setVacCards(cards);
  }

  return (
    <div className="w-full">
      <div className="w-1/2 flex justify-between my-10 mx-auto">
        <div>
          <button onClick={() => vaccineAll('전체')} className={`font-bold ${isClick === "전체" ? "text-black-500" : "text-gray-500"}`}>
            <img className="w-20 " src='./img/baby.png' />
            전체
          </button>
        </div>
        <div>
          <button onClick={() => vaccineAll('신생아')} className={`font-bold ${isClick === "신생아" ? "text-black-500" : "text-gray-500"}`}>
            <img className="w-20 " src='./img/baby.png' />
            신생아
          </button>
        </div>
        <div>
          <button onClick={() => vaccineAll('영아기')} className={`font-bold ${isClick === "영아기" ? "text-black-500" : "text-gray-500"}`}>
            <img className="w-20 " src='./img/baby.png' />
            영아기
          </button>
        </div>
        <div>
          <button onClick={() => vaccineAll('유아기')} className={`font-bold ${isClick === "유아기" ? "text-black-500" : "text-gray-500"}`}>
            <img className="w-20 " src='./img/baby.png' />
            유아기
          </button>
        </div>
        <div>
          <button onClick={() => vaccineAll('아동기')} className={`font-bold ${isClick === "아동기" ? "text-black-500" : "text-gray-500"}`}>
            <img className="w-20 " src='./img/baby.png' />
            아동기
          </button>
        </div>
      </div>
      <div className="w-1/2 mx-auto">
        <div className="mx-5">{periName}</div>
        <div className="grid grid-cols-2 gap-4 justify-items-center">
          {vacCards}
        </div>
      </div>
      <div>페이징</div>
    </div>
  )
}