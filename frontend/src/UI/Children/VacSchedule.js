import '../../css/child.css';
import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import CardInfoSmall from '../CardInfoSmall';
import SmallSelectBox from '../SmallSelectBox';

export default function VacSchedule({ child }) {
    const [data, setData] = useState([]);
    const [trTags, setTrTags] = useState('');

    const [dateOptions, setDateOptions] = useState([]);
    const [selectedDate, setSelectedDate] = useState('');

    useEffect(() => {
        // console.log("VacSchedule child: ", child);
        makeMonthOptions();
        fetchData();
    }, [child]);

    useEffect(() => {
        handleMonthChange();
        // console.log("[VacSchedule] data :", data);
    }, [data]);

    const makeMonthOptions = () => {
        const options = [];
        const today = new Date();
        const thisMonth = today.getMonth();
        const thisYear = today.getFullYear();

        for (let i = 0; i < 156; i++) {
            const month = (thisMonth + i) % 12; // 월 계산
            const year = thisYear + Math.floor((thisMonth + i) / 12); // 연도 계산
            const displayMonth = (month + 1).toString().padStart(2, "0"); // 1~9월은 앞에 0 추가
            options.push({ "year": year, "displayMonth": displayMonth });
        }

        let listtmp = [];
        options.map(i => listtmp.push({ value: `${i.year}-${i.displayMonth}`, label: `${i.year}년 ${i.displayMonth}월` }));
        setDateOptions(listtmp);
    }

    useEffect(()=>{
        if(!dateOptions) return;
        setSelectedDate(dateOptions[0]);
    },[dateOptions]);

    const fetchData = async () => {
        let url = `${process.env.REACT_APP_SERVER_ADDR}/child/scheduleVaccines?child_idx=${child.idx}`;
        // console.log("스케쥴 url : ", url);
        const resp = await axios.get(url);
        setData(resp.data);
        // console.log("[VacSchedule] resp:", resp);
    }

    // 년도/월 기준 날짜 비교
    const compareYearMonth = (date1, date2) => {
        const value1 = date1.getFullYear() * 100 + date1.getMonth(); // YYYYMM 형식으로 숫자화
        const value2 = date2.getFullYear() * 100 + date2.getMonth();

        return value1 - value2;
    };

    useEffect(() => {
        handleMonthChange();
    }, [selectedDate]);

    const handleMonthChange = () => {
        if(!selectedDate) return;
        const selected = new Date(selectedDate.value);
        const thisSchedule = data.filter(i => compareYearMonth(selected, new Date(i.scheduledFrom)) >= 0 && compareYearMonth(selected, new Date(i.scheduledTo)) <= 0);
        // console.log("thisSchedule : ", thisSchedule);

        if (thisSchedule.length < 1) {
            setTrTags(<tr className='h-32'><td colSpan={4} className='text-center' >접종 예정 스케쥴이 없습니다.</td></tr>);
            return;
        }
        setTrTags(thisSchedule.map(i => <tr key={i.idx} className="bg-white hover:bg-blue-50">
            <td className="px-6 py-2">{i.vaccine.disease}</td>
            <td className="px-6 py-2">{i.vaccine.vaccineName}</td>
            <td className="px-6 py-2">{(i.scheduledFrom === i.scheduledTo) ? i.scheduledFrom : i.scheduledFrom + " ~ " + i.scheduledTo}</td>
            <td className="px-6 py-2"><CardInfoSmall text={i.vaccine.optional} type="short" /></td>
        </tr>));
    }



    return (
        <div className="w-auto shadowBox m-3 p-4">
            <div className='m-2 mb-5 flex items-center relative '>
                <p className='font-bold'>접종 일정표</p>
                
                <SmallSelectBox options={dateOptions} selectLabel="날짜선택"
                    selectedOption={selectedDate} setSelectedOption={setSelectedDate}
                    type="small" />
                <p className='text-sm absolute right-0 top-0 text-gray-700 font-[LINESeedKR-Rg] '><span className='text-red-500'>* </span>월별로 접종 해야하는 예방 접종 목록을 확인해보세요!</p>
            </div>

            <div className='w-auto h-[200px] overflow-y-auto relative'>
                <table className="w-full h-auto text-xs text-left font-NanumSquareNeo text-gray-600  ">

                    <thead className="text-gray-400 bg-gray-50 sticky top-0 z-10">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                예방 접종명
                            </th>
                            <th scope="col" className="px-6 py-3">
                                백신명
                            </th>
                            <th scope="col" className="px-6 py-3">
                                날짜
                            </th>
                            <th scope="col" className="px-6 py-3">
                                기타
                            </th>
                        </tr>
                    </thead>
                    <tbody className="">
                        {trTags}
                    </tbody>

                </table>
            </div>
        </div>
    )
}
