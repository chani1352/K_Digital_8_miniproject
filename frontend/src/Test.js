import './css/signCss.css';
import { useState } from 'react';
export default function Test() {
  const signinPw = () => { }
  const [expanded, setExpanded] = useState(false);

  const handleOnclick = () => {
    setExpanded(!expanded);
    console.log("expanded : ", expanded);
  }
  return (
    <div>
      {/* <button type="button" role="combobox" className="w-96 bg-red-200" onClick={handleOnclick}>
        <strong>과금</strong><span>미사용된 아이템을 환불 받을 수 있나요?</span>
      </button>
      <div className={`${expanded? "block":"hidden"} w-96 bg-red-50`}>
        <div className="">
          <strong>답변</strong>
          <span>사이트 운영자 답변</span>
          <p>
            구매한 후에 24시간 이내에 환불 요청을 하신다면 가능합니다.
          </p>
          <p>
            구매한 후에 24시간 이내에 환불 요청을 하신다면 가능합니다.
          </p>
        </div>
      </div> */}


      <button type="button" role="combobox" className="w-96 bg-red-200" 
              id = "aria1"
              aria-expanded={`${expanded}`}
              onClick={handleOnclick}>
        <strong>과금</strong><span>미사용된 아이템을 환불 받을 수 있나요?</span>
      
      <div className={`${expanded? "block":"hidden"} w-96 cursor-default bg-red-50`} aria-labelledby='aria1'>
        <div className="">
          <strong>답변</strong>
          <span>사이트 운영자 답변</span>
          <p>
            구매한 후에 24시간 이내에 환불 요청을 하신다면 가능합니다.
          </p>
          <p>
            구매한 후에 24시간 이내에 환불 요청을 하신다면 가능합니다.
          </p>
        </div>
      </div>
      </button>
    </div>

  )
}
