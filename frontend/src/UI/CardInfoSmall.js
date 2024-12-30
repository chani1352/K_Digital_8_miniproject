import React from 'react'

export default function CardInfoSmall({text, type}) {
    const colors = {
        "무료접종" : 'bg-blue-100',
        "필수접종" : 'bg-pink-100',
        "선택접종" : 'bg-amber-100'
    }

    const textColors = {
      "무료접종" : 'text-blue-600',
      "필수접종" : 'text-pink-600',
      "선택접종" : 'text-amber-600'
  }
  return (
    <div className={`${type==="short" ? "text-[9px] w-8 font-NanumSquareNeo" : "text-[11px] px-2 py-1 mx-1 font-NanumSquareNeoB"}  ${colors[text]} ${textColors[text]} flex justify-center items-center
                      rounded-[3px]`}>
        {type==="short" && text? text.substring(0,2):text}
    </div>
  )
}
