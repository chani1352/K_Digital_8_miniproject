import TailButton from "./UI/TailButton";
import VaccineCard from "./UI/VaccineCard";
import { useState,useEffect } from 'react';

export default function Vaccines() {

  const [vacCards, setVacCards] = useState([]);
  const [periName,setPeriName] = useState([]);
  const [vaccineAllList,setVaccineAllList] = useState([]);

  const period = {
    '전체': {'전체':15},
    '신생아': {'출생 직후' : 0 , '4주이내' : 1},
    '영아기': {'1개월' : 2 , '2개월' : 3, '4개월' : 4, '6개월' : 5},
    '유아기': {'12개월' : 6, '15개월' : 7, '18개월' : 8, '19개월' : 9, '24개월' : 10, '만4세' : 11},
    '아동기': {'만6세' : 12, '만11세' : 13, '만12세' : 14}
  }

  const dataAll = async () =>{
    const url = 'http://10.125.121.214:8080/findVaccine';
    await fetch(url)
      .then(resp => resp.json())
      .then(data => setVaccineAllList(data))
      .catch(err => console.error("Error fetching Board:", err));
  }

  useEffect(()=>{
    dataAll();
  },[]);

  useEffect(()=>{
    vaccineAll('전체');
    selectVaccine(15);
  },[vaccineAllList]);

  const vaccineAll =(caption) => {
    setPeriName(Object.entries(period[caption]).map(([key,value])=><button key={key} onClick={()=>selectVaccine(value)}>{key}</button>));
    selectVaccine(Object.values(period[caption])[0]);
  }

  const selectVaccine = (value) =>{
    let selectVaccine = vaccineAllList;
    if(value != 15 && vaccineAllList!=""){
      selectVaccine = vaccineAllList.filter(item => {
        return item["periodFrom"] <= value && item["periodTo"] >= value;
      } )
    }
    const cards = selectVaccine.map(item => <VaccineCard key={item.idx} vaccine={item} />);
    setVacCards(cards);
  }

  return (
    <div>
      <div className="flex justify-center">
        <div className="flex justify-center items-center my-5">
          <TailButton caption={'전체'} color={'blue'} handleClick={() => vaccineAll('전체')}
            style={'w-20 h-12  mx-2 text-[14px] '} />
        </div>
        <div className="flex justify-center items-center my-5">
          <TailButton caption={'신생아'} color={'blue'} handleClick={() => vaccineAll('신생아')}
            style={'w-20 h-12  mx-2 text-[14px] '} />
        </div>
        <div className="flex justify-center items-center my-5">
          <TailButton caption={'영아기'} color={'blue'} handleClick={() => vaccineAll('영아기')}
            style={'w-20 h-12  mx-2 text-[14px] '} />
        </div>
        <div className="flex justify-center items-center my-5">
          <TailButton caption={'유아기'} color={'blue'} handleClick={() => vaccineAll('유아기')}
            style={'w-20 h-12  mx-2 text-[14px] '} />
        </div>
        <div className="flex justify-center items-center my-5">
          <TailButton caption={'아동기'} color={'blue'} handleClick={() => vaccineAll('아동기')}
            style={'w-20 h-12  mx-2 text-[14px] '} />
        </div>
      </div>
      <div>{periName}</div>
      <div className="grid grid-cols-2 gap-4">
        {vacCards}
      </div>
      <div>페이징</div>
    </div>
  )
}