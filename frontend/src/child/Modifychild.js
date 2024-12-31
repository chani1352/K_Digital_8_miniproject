
import TailButton from "../UI/TailButton";
import { useParams } from 'react-router-dom'
import { useEffect, useState, useRef } from "react";
import axios from 'axios';

export default function Modifychild() {
  const child_idx = useParams().idx;

  const [prevInfo, setPrevInfo] = useState('');
  const nameRef = useRef();
  const birthRef = useRef();

  // 달력 날짜 오늘이후로 선택 불가능하도록 max 설정
  useEffect(() => {
    fetchchildData();
    const today = new Date();
    let dateString = '';
    dateString = dateString + today.getFullYear() + "-"
      + (("0" + (today.getMonth() + 1))).slice(-2) + "-"
      + ("0" + today.getDate()).slice(-2)

    birthRef.current.max = dateString;
  }, []);

  const fetchchildData = async () => {
    let url = `http://10.125.121.214:8080/getChild?idx=${child_idx}`;
    const resp = await axios.get(url);
    setPrevInfo(resp.data);
  }

  useEffect(() => {
    if (!prevInfo) return;
    nameRef.current.value = prevInfo.childName;
    birthRef.current.value = prevInfo.birth;
  }, [prevInfo]);

  const doModify = async() => {

    let url = "http://10.125.121.214:8080/updateChild?";
    url = `${url}idx=${prevInfo.idx}&childName=${nameRef.current.value}&birth=${birthRef.current.value}`;

    const modifyChildData = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      }
    }

    const resp = await fetch(url, modifyChildData);
    if (resp.ok) window.location.href = "/child";
  }

  return (
    <div className="w-[560px] h-full flex flex-col justify-start items-center py-12">
      <div>
        <div>
          수정하기
        </div>
        <div>
          이미지??
        </div>
      </div>
      <div className="flex flex-col w-[360px]">
        <label htmlFor="childName" className="input_label mt-[30px]">
          이름<span className='pl-1 text-red-500 '>*</span></label>
        <input id="childName" type="text" placeholder="ex. 김예방" ref={nameRef}
          className="input_box mb-[30px]"></input>
        <label htmlFor="childBirth" className="input_label ">
          생년월일<span className='pl-1 text-red-500 '>*</span></label>
        <input id="childBirth" type="date" placeholder="생년월일" ref={birthRef}
          className="input_box mb-[30px]" />

        <div className="flex items-center justify-center mt-[10px]">
          <TailButton caption={'수정하기'} color={'blue'} handleClick={doModify}
            style={'w-[360px] h-12 text-[14px] '} />
        </div>

      </div>

    </div>
  )
}
