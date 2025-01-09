import { IoMdCamera } from "react-icons/io";
import TailButton from "../../UI/TailButton";
import { useParams } from 'react-router-dom'
import { useEffect, useState, useRef } from "react";
import axios from 'axios';

export default function Modifychild() {
  const child_idx = useParams().idx;

  const [prevInfo, setPrevInfo] = useState('');

  const [imagUrl, setImageUrl] = useState('/img/child/child_profile_0.png');
  const [image, setImage] = useState('');

  const nameRef = useRef();
  const birthRef = useRef();
  const fileRef = useRef();
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
    let url = `http://10.125.121.214:8080/child?idx=${child_idx}`;
    const resp = await axios.get(url);
    setPrevInfo(resp.data);
  }

  // 아이의 기존 정보를 화면에 셋팅
  useEffect(() => {
    if (!prevInfo) return;
    nameRef.current.value = prevInfo.childName;
    birthRef.current.value = prevInfo.birth;
    if(!prevInfo.image) return;
    setImageUrl(`http://10.125.121.214:8080/registerChild/${prevInfo.image}`);
  }, [prevInfo]);

  const doModify = async () => {

    let url = "http://10.125.121.214:8080/child";

    const formData = new FormData();
    formData.append("idx", prevInfo.idx);
    formData.append("childName", nameRef.current.value);
    formData.append("birth", birthRef.current.value);
    if (image) formData.append("file", image);

    const modifyChildData = {
      method: 'PUT',
      body: formData
    }

    const resp = await fetch(url, modifyChildData);
    // console.log("resp :", resp);
    if (resp.ok) window.location.href = "/child";
    else throw new Error(`HTTP error! status: ${resp.status}`);
  }

  // =========== 사진 셋팅 ================
  const handleFileClick = () => {
    fileRef.current.click();    //input 클릭
  }

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];  //첫번째 파일만 선택

    if (file) {
      setImage(file);

      const reader = new FileReader();

      //파일 읽기가 완료 되었을 때 실행되는 콜백
      reader.onload = (e) => {
        setImageUrl(e.target.result);
      }
      reader.readAsDataURL(file);
    }
  }

  return (
    <div className="w-[560px] h-full flex flex-col justify-start items-center py-12 ">
      <div className="w-2/3 flex flex-col justify-center items-center m-6">
        <div className='w-full text-3xl font-bold mb-10 text-center'> 아이 정보 수정하기</div>
        <div className="w-[180px] h-[180px] m-6 relative drop-shadow-lg ">
          <img src={imagUrl} alt="child_profile" className='w-fit aspect-square mr-2 rounded-lg border'></img>

          <input type="file" accept="image/*" ref={fileRef} onChange={handlePhotoChange} className="hidden" />
          <button onClick={handleFileClick}
            className="size-9 bg-white absolute right-2 top-2
                                        rounded-full flex justify-center items-center text-xl
                                        drop-shadow-lg">
            <IoMdCamera />
          </button>

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
