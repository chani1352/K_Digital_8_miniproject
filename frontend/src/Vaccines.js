import TailButton from "./UI/TailButton";
import VaccineCard from "./UI/VaccineCard";
import {useState} from 'react';

export default function Vaccines(){

  const [vacCards, setVacCards] = useState([]);

  const vaccineAll = async () => {
    console.log("aa");
    const url = 'http://10.125.121.214:8080/findVaccine';
    let vaccineAll = "";
    await fetch(url)
    .then(resp=>resp.json())
    .then(data=>vaccineAll = data)
    .catch(err=>console.error("Error fetching Board:", err));
    const cards = vaccineAll.map(item => <VaccineCard key={item.index} vaccine={item} />);
    console.log(cards);
    setVacCards(cards);

  }


  return(
    <div>
      <div className="flex justify-center items-center my-5">
        <TailButton caption={'검색'} color={'blue'} handleClick={vaccineAll}
                    style={'w-1/3 h-12  mx-2 text-[14px] '} />
      </div>
      <div className="flex flex-col items-center">
          {vacCards}
      <div>페이징</div>
      </div>
    </div>
  )
}