export default function TailButton({caption, color, handleClick, style}) {
    const btnStyle = {
        'blue' : 'bg-blue-500 hover:bg-blue-700 text-white font-bold rounded focus:outline-none focus:shadow-outline'
    }

    const btColorHover = {
        'blue' : 'bg-blue-500 hover:bg-blue-700 text-white font-bold rounded focus:outline-none focus:shadow-outline'
    }
    
    return (
        <button className={`inline-flex justify-center items-center
        // p-2 px-5 mx-1 
        ${style ? style : ''}
        ${btnStyle[color]} ${btColorHover[color]} rounded-lg
        transition duration-300
        text-sm font-bold font-[NanumSquareR]`}
            onClick={handleClick}
        >
            {caption}
        </button>
    )
}
