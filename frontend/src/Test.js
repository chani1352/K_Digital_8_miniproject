import './css/signCss.css';
import { useState, useEffect } from 'react';
import  Pagination  from "./UI/Pagination";

export default function Test() {
  const [currentPage, setCurrentPage] = useState(1);
  
  useEffect(()=>{
    // console.log("currentPage : ",currentPage);
  },[currentPage]);
  return (
    <div>
      <Pagination totalPage={ 18 } 
                  setCurrentPage = {setCurrentPage}
                  currentPage   = {currentPage} 
      />
    </div>

  )
}
