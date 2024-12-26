import '../css/child.css';
import { LuBaby } from "react-icons/lu";
import { IoMdAddCircleOutline } from "react-icons/io";

import { Link,useNavigate } from "react-router-dom"
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { loginToken, memInfo } from "../AtomMem";

import ChildProfileCard from './ChildProfileCard';
import axios from 'axios';

export default function Child() {
  
  const [atomToken, setAtomToken] = useRecoilState(loginToken);
  const [atomMeminfo, setAtomMeminfo] = useRecoilState(memInfo);

  //아이 목록 저장하는 변수
  const [childlist, setChildlist] = useState([]);
  //현재 선택된 아이
  const [selectedChild, setSelectedChild] = useState(null);

  
  const [profile, setProfile] = useState('');
  const navigate = useNavigate();

  const [child_li, setChild_li] = useState('');
  // console.log("atomMeminfo",atomMeminfo);
  useEffect(()=>{
    if(atomMeminfo === null){
      alert("로그인이 필요합니다");
      navigate("/login");
      return;
    }

    fetchChildList();
  },[]);

  const fetchChildList = async() => {
    let url = `http://10.125.121.214:8080/getChild?email=${atomMeminfo.email}`;

    const resp = await axios.get(url);
    // console.log("resp:", resp);

    setChildlist(resp.data);
    setSelectedChild(resp.data[0]);
  }

  // 아이 목록 버튼 생성
  const makeChildList = () => {
    const listTags = childlist.map(child => 
      <li key={child.idx} id={child.idx}
          className={`m-2 namecard flex items-center hover:cursor-pointer
                      ${selectedChild.idx == child.idx? "bg-[#5C99FF] text-white" :""}`}
          onClick={()=>testClick(child)}>
              <span className='text-2xl mx-2'><LuBaby /></span>{child.childName}</li>
      );
  
      setChild_li(listTags);
  }

  // 선택된 아이에 따라 화면 내용 변경
  useEffect(()=>{
    if(selectedChild === null){
      console.log("선택된 아이 없음");
      return;
    } else {
      console.log("selected ? ", selectedChild);
      setProfile(<ChildProfileCard child={selectedChild}/>)
      console.log("childlist ? ", childlist);
      makeChildList();
    }

  },[selectedChild]);

  const testClick = (child) => {
    
    console.log("child click! :", child);

    setSelectedChild(child);
    // makeChildList();
    setProfile(<ChildProfileCard child={child}/>);
  }
  return (
    <div className="flex w-[1020px] bg-gray-50  items-center mt-20 p-3">

      <div className=" childlist flex-col">
        <ul className="w-full flex flex-col items-center" >
          {/* <li className="m-2 namecard bg-[#5C99FF] text-white flex items-center">
            <span className='text-2xl mx-2'><LuBaby /></span>아이1</li> */}

            {child_li}
          <Link to='./register'>
            <li className="m-2 namecard flex items-center text-[#5C99FF]">
              <span className='text-2xl mx-2'><IoMdAddCircleOutline /></span> 아이 등록하기</li>
          </Link>
        </ul>
      </div>


      <div className="w-4/5 bg-gray-50 flex flex-col p-3">
          {profile}

        <div>
        접종일정표 
        </div>  

      </div>
    </div>
  )
}
