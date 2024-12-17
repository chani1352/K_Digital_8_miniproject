import React from 'react'

export default function CardInfoSmall({text}) {
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
    <div className={`px-2 py-1 mx-1 ${colors[text]} ${textColors[text]} flex justify-center items-center
                    text-[11px] font-NanumSquareNeoB rounded-[3px]`}>
        {text}
    </div>
  )
}
