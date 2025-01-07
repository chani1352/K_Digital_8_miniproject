export default function TailButton({caption, color, handleClick, style, fontStyle, disabled}) {
    const btnStyle = {
        'blue' : 'bg-blue-500 text-white font-bold rounded focus:outline-none focus:shadow-outline disabled:bg-opacity-40',
        'gray' : 'bg-gray-300 text-gray-600'
    }

    const btColorHover = {
        
    }
    
    return (
        <button className={`inline-flex justify-center items-center
        ${style ? style : ''}   disabled:cursor-not-allowed
        ${btnStyle[color]} ${btColorHover[color]} rounded-lg
        transition duration-300 ${fontStyle? fontStyle : 'text-sm font-bold font-[NanumSquareR]'}
        `}
            onClick={handleClick}
            disabled = {disabled ? disabled : ""}
        >
            {caption}
        </button>
    )
}
