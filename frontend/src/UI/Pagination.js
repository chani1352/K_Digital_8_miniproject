import { useState, useEffect } from 'react';

export default function Pagination({ totalPage, setCurrentPage, currentPage }) {
    const pageList = [];

    const crtPage = parseInt(currentPage);
    const [pagesBtn, setPagesBtn] = useState('');

    useEffect(() => {

        //시작페이지 (5개기준)
        const startPage = (Math.floor((crtPage-1)/5))*5 + 1;
        
        for (let i = startPage; (i <= (startPage+4)) && (i<=totalPage); i++) {
            pageList.push(i);
        }
        console.log("pageList : ", pageList);
        const pagelist = pageList.map(page =>
            <div className={`w-8 h-8 rounded-md m-1
                flex justify-center items-center 
                ${crtPage === page ? "text-red-500 bg-slate-300" : "hover:bg-slate-100"}`}
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
            <button onClick={()=>setCurrentPage(1)} disabled={crtPage === 1}>
                처음
            </button>

            <button onClick={goToPrevPage} disabled={crtPage === 1}>
                이전
            </button>

            { pagesBtn }
            <button onClick={goNextPage} disabled={crtPage === totalPage}>
                다음
            </button>

            <button onClick={()=>setCurrentPage(totalPage)} disabled={crtPage === totalPage}>
                마지막
            </button>
        </div>
    )
}
