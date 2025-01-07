import { IoMdCamera } from "react-icons/io";
import TailButton from "../UI/TailButton";
import Register2 from "./Register2";
import { useEffect, useState, useRef, use } from "react";

export default function Register1({goNext}) {
    const nameRef = useRef();
    const birthRef = useRef();
    const fileRef = useRef();

    const [childName, setChildName] = useState(null);
    const [childBirth, setChildBirth] = useState(null);
    const [imageUrl,setImageUrl] = useState('/img/child/child_profile_0.png');
    const [image,setImage] = useState('');

    const [btnDisabled, setBtnDisabled] = useState(true);

    // 달력 날짜 오늘이후로 선택 불가능하도록 max 설정
    useEffect(() => {
        const today= new Date();
        let dateString = '';
        dateString = dateString + today.getFullYear() +"-"
                    +(("0" +(today.getMonth()+1))).slice(-2) + "-"
                    +("0" +today.getDate()).slice(-2)

        birthRef.current.max = dateString;
    }, []);

    const nameChange = (e) => {
        setChildName(e.target.value);
    }

    const birthChange = (e) => {
        setChildBirth(e.target.value);
    }
    useEffect(()=>{
        if(!childName) return;
        if(!childBirth) return;
        setBtnDisabled(false);
    },[childName, childBirth])
    // useEffect(()=>{
    //     if(!nameRef.current.value) return;
    //     if(!birthRef.current.value) return;
    //     setBtnDisabled(true);
    // },[nameRef.current.value, birthRef.current.value])

    const beforeNext = () => {
        const childInfo = {
            name : nameRef.current.value,
            birth : birthRef.current.value,
            file : image
        }
        goNext(<Register2 info={childInfo}/>);
    }

    const handleFileClick = () => {
        fileRef.current.click();    //input 클릭
    }

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];  //첫번째 파일만 선택

        if(file) {
            setImage(file);

            const reader = new FileReader();

            //파일 읽기가 완료 되었을 때 실행되는 콜백
            reader.onload = (e) => {
                setImageUrl(e.target.result);
            }
            reader.readAsDataURL(file);
        }
    }
    
    useEffect(()=>{
        console.log("image : ", image);
    },[image]);
    return (
        <div className="w-[560px] h-full flex flex-col justify-start items-center py-12">
            <div className="w-full flex flex-col items-center m-6">
                <div className="text-3xl font-bold">
                    1단계
                </div>
                <div className="text-xl my-4">
                    아이의 기본 정보를 입력해주세요.
                </div>

                <div className="w-[180px] h-[180px] m-6 relative drop-shadow-lg ">
                <img src={imageUrl} alt="child_profile" className='w-fit h-fit mr-2 rounded-lg'></img>
                
                <input type="file" accept="image/*" ref={fileRef} onChange={handlePhotoChange} className="hidden"/>
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
                    className="input_box mb-[30px]" onChange={nameChange}></input>
                <label htmlFor="childBirth" className="input_label ">
                    생년월일<span className='pl-1 text-red-500 '>*</span></label>
                <input id="childBirth" type="date" placeholder="생년월일" ref={birthRef}
                    onChange={birthChange}
                    className="input_box mb-[30px]" />

                <div className="flex items-center justify-center mt-[10px]">
                    <TailButton caption={'다음'} color={'blue'} handleClick={beforeNext}
                        style={'w-[360px] h-12 text-[14px] disabled:cursor-not-allowed '} disabled={btnDisabled}/>
                </div>

            </div>

        </div>
    )
}
