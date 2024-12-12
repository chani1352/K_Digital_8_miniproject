
export default function TailButton({caption, color, handleClick, style}) {
    const btnStyle = {
        'naver' : 'bg-[#00C300] text-white font-bold rounded',
        'kakao' : 'bg-[#FAE100] text-[#666666] font-bold rounded',
        'google' : 'bg-[#f5f5f5] text-[#666666] font-bold rounded '
    }

    const logoStyle = {
        'naver' : 'h-[32px] w-[32px] mx-2 mt-[2px]',
        'kakao' : 'h-[32px] w-[32px] mx-2',
        'google' : 'h-[32px] w-[32px] mx-2'
    }

    const imgSrc = {
        'naver' : './img/naverLogo.png',
        'kakao' : './img/kakaoLogo.png',
        'google' : './img/googleLogo.png'

    }


    
    return (
        <button className={`inline-flex justify-center items-center
        ${style ? style : ''}
        ${btnStyle[color]}  rounded-lg
        transition duration-300
        text-sm font-bold font-[NanumSquareR] `}
            onClick={handleClick}
        >
            <div className={logoStyle[color]}>
                <img src={imgSrc[color]}/>
            </div> 
            {caption}
        </button>
    )
}
