import '../css/child.css';
import { LuBaby } from "react-icons/lu";
import { IoMdAddCircleOutline } from "react-icons/io";

import { Link } from "react-router-dom"

export default function Child() {
  return (
    <div className="flex w-[1020px] bg-gray-50  items-center mt-20">

      <div className=" childlist flex-col">
        <ul className="w-full flex flex-col items-center" >
          <li className="m-2 namecard bg-[#5C99FF] text-white flex items-center">
            <span className='text-2xl mx-2'><LuBaby /></span>아이1</li>
          <li className="m-2 namecard flex items-center">
            <span className='text-2xl mx-2'><LuBaby /></span>아이2</li>
          <li className="m-2 namecard flex items-center">
            <span className='text-2xl mx-2'><LuBaby /></span>아이3</li>
          <Link to='./register'>
            <li className="m-2 namecard flex items-center text-[#5C99FF]">
              <span className='text-2xl mx-2'><IoMdAddCircleOutline /></span> 아이 등록하기</li>
          </Link>
        </ul>
      </div>
      <div className="w-4/5 bg-gray-50">
        아이정보 div
        우리아이페이지

      </div>



    </div>
  )
}
