import { useState, useEffect } from 'react';

export default function Pagination({ totalPage, setCurrentPage, currentPage }) {
    const pageList = [];

    const crtPage = parseInt(currentPage);
    const [pagesBtn, setPagesBtn] = useState('');

    useEffect(() => {
        // console.log("페이지네이션 시작");
        //시작페이지 (5개기준)
        const startPage = (Math.floor((crtPage-1)/5))*5 + 1;
        
        for (let i = startPage; (i <= (startPage+4)) && (i<=totalPage); i++) {
            pageList.push(i);
        }
        // console.log("pageList : ", pageList);
        const pagelist = pageList.map(page =>
            <div className={`w-8 h-8 rounded-md m-2
                flex justify-center items-center font-NanumSquareNeoB
                ${crtPage === page ? "text-red-500 bg-red-100" : "text-gray-500 hover:bg-gray-100"}`}
                key={page}
            >
                <button
                        onClick={() => setCurrentPage(page)}
                >
                {page}
                </button>
            </div>);

        setPagesBtn(pagelist);
    }, [crtPage]);


    const goNextPage = () => {
        setCurrentPage(crtPage + 1);
    }

    const goToPrevPage = () => {
        setCurrentPage(crtPage - 1);
    }

    if (totalPage === 1) {
        return null;
    }
    return (
        <div className='flex'>
            <button onClick={()=>setCurrentPage(1)} 
                    disabled={crtPage === 1}
                    className='text-gray-500 mx-4 font-NanumSquareNeoB'>
                {'<<'}
            </button>

            <button onClick={goToPrevPage} disabled={crtPage === 1}
                    className='text-gray-500 mr-4 font-NanumSquareNeoB'>
                {'<'}
            </button>

            { pagesBtn }
            <button onClick={goNextPage} 
                    disabled={crtPage === totalPage}
                    className='text-gray-500 ml-4 font-NanumSquareNeoB'>
                {'>'}
            </button>

            <button onClick={()=>setCurrentPage(totalPage)} disabled={crtPage === totalPage}
                    className='text-gray-500 mx-4 font-NanumSquareNeoB'>
                {'>>'}
            </button>
        </div>
    )
}
