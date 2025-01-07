import '../../css/child.css';
import { LuBaby } from "react-icons/lu";
import { IoMdAddCircleOutline } from "react-icons/io";
import { RiDeleteBin5Line } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom"
import { useEffect, useState } from 'react';

import ChildProfileCard from "../../UI/Children/ChildProfileCard"
import VacSchedule from '../../UI/Children/VacSchedule';
import axios from 'axios';

export default function Child() {

  //아이 목록 저장하는 변수
  const [childlist, setChildlist] = useState([]);
  //현재 선택된 아이
  const [selectedChild, setSelectedChild] = useState(null);
  //아이가 없을 경우 안내문
  const [nochildSection, setNochildSection] = useState('');

  let loginToken = localStorage.getItem("token");
  const memEmail = localStorage.getItem("memEmail");

  const [profile, setProfile] = useState('');
  const [schedule, setSchedule] = useState('');
  const navigate = useNavigate();

  const [child_li, setChild_li] = useState('');

  useEffect(() => {
    if (loginToken === null) {
      alert("로그인이 필요합니다");
      navigate("/login");
      return;
    }

    fetchChildList();
  }, []);

  const fetchChildList = async () => {
    let url = `http://10.125.121.214:8080/getChildren?email=${memEmail}`;

    const resp = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${loginToken}`, // Authorization 헤더에 Bearer 토큰을 포함시킴
      }
    });
    // console.log("resp:", resp);

    let data = resp.data;
    setChildlist(data);

    // 등록된 아이가 0명인 경우
    if (data.length == 0) {
      // console.log("아이가 없는 사용자");
      setNochildSection(
        <div className='w-4/5 h-80 p-2 flex flex-col  justify-center items-center m-2 opacity-30'>
          <img src='./img/faceonly.png' className='h-40 w-40  my-5'></img>
          우리 아이를 등록해보세요!
        </div>
      );

      const deleteTag = document.getElementById("childInfo");
      deleteTag.style.display = "none";
      return;
    }

    // 등록된 아이가 1명 이상인 경우
    setSelectedChild(data[0]);
  }

  // 아이 목록 버튼 생성
  const makeChildList = () => {
    const listTags = childlist.map(child =>
      <li key={child.idx} id={child.idx}
        className={`m-2 flex items-center hover:cursor-pointer
                      ${selectedChild.idx == child.idx ? "seleced_namecard  text-white" : "namecard"}`}
        onClick={() => selectChild(child)}>
        <span className='text-2xl mx-2'><LuBaby /></span>{child.childName}</li>
    );

    setChild_li(listTags);
  }

  // 선택된 아이에 따라 화면 내용 변경
  useEffect(() => {
    if (selectedChild === null) {
      // console.log("선택된 아이 없음");
      return;
    } else {
      setProfile(<ChildProfileCard child={selectedChild} />)
      setSchedule(<VacSchedule child={selectedChild} />);
      makeChildList();
    }

  }, [selectedChild]);

  const selectChild = (child) => {
    setSelectedChild(child);
    setProfile(<ChildProfileCard child={child} />);
    setSchedule(<VacSchedule child={selectedChild} />);
  }

  //아이 삭제하기
  const removeChild = async () => {
    // console.log("remove : ", selectedChild);

    let url = `http://10.125.121.214:8080/deleteChild?child_idx=${selectedChild.idx}`;
    const resp = await fetch(url, { method: 'DELETE' });
    if (resp.ok) window.location.reload();
  }

  const clickRemove = () => {
    if(window.confirm(`"${selectedChild.childName}"을 삭제하시겠습니까?`)){
      removeChild();
    }
  }

  return (
    <div className="flex w-[1020px] items-start my-20 p-3">

      <div className=" childlist flex-col m-2">
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

      {nochildSection}
      <div id="childInfo" className="w-4/5 p-2 flex flex-col m-2  bg-gray-50 rounded-[20px]">

        <div className='h-4 flex justify-end mt-1 mr-1'>
          <div className='h-4 flex items-start text-xs text-gray-600 hover:cursor-pointer'
                onClick={clickRemove}>
            <RiDeleteBin5Line className='flex justify-center items-center'/> 삭제
          </div>

        </div>
        {profile}

        {schedule}

      </div>
    </div>
  );
}
