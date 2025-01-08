import React from 'react'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react';

import axios from 'axios';
import "../../css/checkbox.css";
import CardInfoSmall from '../../UI/CardInfoSmall';
import TailButton from '../../UI/TailButton';

export default function VacInfo() {

    const child_idx = useParams().idx;

    // 수정 모드 체크
    const [isUpdate, setIsUpdate] = useState(false);
    //테이블 Tr 만들기
    const [vacTrs, setVacTrs] = useState('');

    // 접종 완료한 백신 목록
    const [prevVac, setprevVac] = useState([]);
    const vaccineList = [
        { disease: "결핵", code: "BCG", idx: [1], optional: "필수접종" },
        { disease: "수두", code: "VAR", idx: [2], optional: "필수접종" },
        { disease: "폴리오", code: "IPV", idx: [3, 4, 5, 6], optional: "필수접종" },
        { disease: "일본뇌염", code: "IJEV", idx: [7, 8, 9, 10, 11], optional: "필수접종" },
        { disease: "일본뇌염", code: "LJEV", idx: [12, 13], optional: "필수접종" },
        { disease: "폐렴구균", code: "IJEV", idx: [14, 15, 16, 17], optional: "필수접종" },
        { disease: "폐렴구균", code: "PPSV", idx: [18], optional: "필수접종" },
        { disease: "인플루엔자", code: "IIV", idx: [19], optional: "필수접종" },
        { disease: "로타바이러스", code: "RV1", idx: [20, 21], optional: "필수접종" },
        { disease: "로타바이러스", code: "RV5", idx: [22, 23, 24], optional: "필수접종" },
        { disease: "디프테리아, 파상풍, 백일해", code: "DTaP", idx: [27, 28, 29, 30, 31], optional: "필수접종" },
        { disease: "홍역, 유행성이하선염, 풍진", code: "MMR", idx: [33, 34], optional: "필수접종" },
        { disease: "A형간염", code: "HepA", idx: [35, 36], optional: "필수접종" },
        { disease: "b형 헤모필루스 인플루엔자", code: "Hib", idx: [37, 38, 39, 40], optional: "필수접종" },
        { disease: "B형간염", code: "HepB", idx: [41, 42, 43], optional: "필수접종" },
        { disease: "사람유두종바이러스 감염증", code: "HPV", idx: [25, 26], optional: "선택접종" },
        { disease: "디프테리아, 파상풍, 백일해", code: "TdaP/Td", idx: [32], optional: "선택접종" }
    ]

    const vaccineOptional = [6, 9, 10, 11, 17, 25, 26, 30, 31, 32, 40]
    const count = [1,2,6,11,13,17,18,19,21,24,31,34,36,40,43,26]
    const count1 = [3, 7, 12, 14, 20, 22, 27, 33, 35, 37, 41, 25]
    const [vaccineCheck , setVaccineCheck] = useState('');
    const [selDisabled, setSelDisabled] = useState(true);

    useEffect(() => {
        fetchVacInfo();
    }, [])

    useEffect(() => {
        // console.log("[VacInfo] prevVac : ", prevVac); 
        makeTable();
        console.log("배열 :", prevVac);
    }, [prevVac]);

    const makeTable = () => {

        const tags = vaccineList.map(item =>
            <tr className="bg-white border-b" key={item.idx[0]}>
                <th scope="row" className="px-2 py-4 font-medium text-gray-900 "><CardInfoSmall text={item.optional} type={"short"} /></th>
                <td className="px-6 py-4">{item.disease}</td>
                <td className="px-6 py-4">{item.code}</td>
                    <td className="px-6 py-4 flex">{item.idx.map(idx =>
                    <div className={`round ${(vaccineOptional.includes(idx))?"roundyellow":"roundred"} w-[28px] h-[28px] mx-1`} key={idx}>
                            <input id={"check" + idx} type="checkbox" value={idx} onClick={(e) => handleCheck(e.target.checked, e.target.value)}
                                   disabled = {item.idx[0] === idx ? false : true}
                            />
                            <label htmlFor={"check" + idx}></label>
                        </div>
                    )}</td>

   
            </tr>
        );

        setVacTrs(tags);
        makeCheck();
    }

    const makeCheck = () => {
        prevVac.map(idx => {
            const checkbox = document.getElementById("check" + idx);
 
            if (checkbox) {
                console.log("idx :",idx)
                checkbox.checked = true; // 체크 여부 설정
            }
        });

        // console.log("makeCheck 할때 isUpdate :",isUpdate );
        if (!isUpdate) {
            const allCheck = document.getElementsByTagName("input");
            // console.log("makeCheck 할때 allCheck :",allCheck );
            for (let i = 0; i < allCheck.length; i++) {
                allCheck[i].disabled = true;
            }
        }
    }

    useEffect(() => {
        if(count.includes(parseInt(vaccineCheck))) return;
        const vaccineCh = document.getElementById("check" + (parseInt(vaccineCheck) - 1).toString());
        const vaccineCh1 = document.getElementById("check" + (parseInt(vaccineCheck) + 1).toString());
        console.log("vaccineCh:",vaccineCh1);
        if (!vaccineCh && !vaccineCh1) return ;
        vaccineCh1.disabled = selDisabled;  
        vaccineCh1.onclick = (e) => {
            handleCheck(e.target.checked, e.target.value);
        };
        if(!count1.includes(parseInt(vaccineCheck))) vaccineCh.disabled = !selDisabled;  
    },[vaccineCheck,selDisabled]);

    const handleCheck = (checked, id) => {
        console.log("checked : ", checked);
        console.log("checked : ", id);
        setVaccineCheck(id);
        setSelDisabled(!checked);

        const checked_id = parseInt(id);
        if (checked) {
            setprevVac((prev) => [...prev, checked_id]);
        } else {
            setprevVac((prev) => prev.filter((i) => i !== checked_id));
        }
    }

    const fetchVacInfo = async () => {
        let url = `http://10.125.121.214:8080/checkVaccine?child_idx=${child_idx}`;

        const resp = await axios.get(url);
        // console.log("[VacInfo] data : ", resp.data);

        setprevVac(resp.data);
    }

    // 수정하기 버튼 클릭시 모드 변경
    const changeToModify = () => {
        console.log("수정하기");
        setIsUpdate(true);

        const checkboxs = document.getElementsByTagName("input");
        for (var i = 0; i < checkboxs.length; i++) {
            var checkbox1 = checkboxs.item(i);
            checkbox1.disabled = false;
            checkbox1.classList.remove('hover:cursor-not-allowed');
        }
    }

    const putModify = async () => {
        prevVac.sort((a, b) => a - b);
        let vaccine_idxs = ""
        prevVac.forEach(idx => { vaccine_idxs = vaccine_idxs + idx + "," })
        // console.log("vaccine_idxs", vaccine_idxs);

        let url = "http://10.125.121.214:8080/selectVaccine?";
        url = `${url}child_idx=${child_idx}&vaccine_idx=${vaccine_idxs}`

        // console.log("put URL : ", url);
        const VaccineListData = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const resp = await fetch(url, VaccineListData);
        if (resp.ok) window.location.href = "/child/vacInfo/" + child_idx;
        setIsUpdate(false);
        window.location.href = "/child/vacInfo/" + child_idx;
    }

    return (
        <div className='w-[800px] h-full flex flex-col justify-start items-center py-12'>
            <img src='/img/flushot.png' className='w-20 m-6' />
            <div className='text-4xl font-bold m-6'> 우리 아이 접종 체크리스트 </div>
            <div className="relative overflow-x-auto  m-6 mt-12">
                <div onClick={changeToModify}
                    className={`w-full text-right p-4 text-gray-500 font-NanumSquareNeoB
                                hover:cursor-pointer ${isUpdate ? "hidden" : ""}`}>
                    {isUpdate ? "" : "수정"}
                </div>
                <table className="w-full text-sm text-left text-gray-500 ">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                구분
                            </th>
                            <th scope="col" className="px-6 py-3">
                                예방 접종명
                            </th>
                            <th scope="col" className="px-6 py-3">
                                백신명
                            </th>
                            <th scope="col" className="px-6 py-3">
                                횟수
                            </th>
                        </tr>
                    </thead>
                    <tbody>

                        {vacTrs}
                    </tbody>
                </table>

                <div className='w-full flex justify-center'>
                <TailButton caption="수정하기" color={"blue"}
                    style={isUpdate ? "w-full m-10 h-12" : "hidden"}
                    fontStyle={`text-base`}
                    handleClick={putModify} />
                </div>
                
            </div>
        </div>
    )
}