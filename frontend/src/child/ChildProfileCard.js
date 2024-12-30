import '../css/child.css';
import { IoIosArrowDropright } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom"

export default function ChildProfileCard({ child }) {

    return (
        <div className='flex w-full'>
            <div className='flex w-1/2 shadowBox h-[200px] m-3 bg-red-50'>
                <div className='w-1/2 m-3 h-auto p-3 bg-red-50'>
                    프로필사진
                </div>
                <div className='w-1/2 p-3 h-auto'>
                    <p className='font-bold text-lg my-3'>{child.childName}</p>
                    <div className='flex items-center'>
                        <img src='./img/child/birthday.png' className='size-5 mr-2 rounded-full border'></img>
                        <p className='text-xs'>
                            {child.birth}
                        </p>
                    </div>
                </div>

            </div>
            <div className='w-1/2 h-[200px] m-3 bg-[#5C99FF] rounded-[20px] p-4 pb-6'>
                <div className="flex h-2/6 items-center">
                    <div className="bg-white w-[40px] h-[40px] rounded-full flex justify-center items-center">
                        <img src='./img/flushot.png' className='w-[25px] h-[25px]'></img>
                    </div>
                    <div className="text-xl font-bold text-white ml-4">
                        우리 아이 접종 상태는?
                    </div>
                </div>

                <div className="h-3/6 bg-white rounded-lg flex items-center">
                    <div className='w-1/2 py-1 h-2/3 flex flex-col justify-between items-center border-r-2 border-[#94bbff]'>
                        <p>필수접종</p>
                        <p className='text-pink-600 font-bold'>{child.mandatory} / 32개</p>
                    </div>

                    <div className='w-1/2 py-1 h-2/3 flex flex-col justify-between items-center'>
                        <p>선택접종</p>
                        <p className='text-amber-600 font-bold'>{child.optional} / 11개</p>
                    </div>
                </div>
                <div className="flex justify-end items-center pt-3 hover:cursor-pointer">
                    <Link to={`./vacInfo/${child.idx}`} className="flex justify-center items-center text-white">자세히보기 <IoIosArrowDropright /></Link>
                </div>

            </div>
        </div>
    )
}
