// import logo from './logo.svg';

import './App.css';
import './HeaderCss.css';

import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Signin from "./Signin";
import Signup from "./Signup";

function App() {
  return (
    <BrowserRouter>
    <div className= "w-full min-w-[1000px] h-full ">
      <header className="w-full h-[120px] px-10 lg:px-[120px]
                          sticky top-0 flex justify-between items-center
                          bg-[#F5FAFF]">
        <div>
          <p className='header_text'>로고 및 이름</p>
        </div>                    
        
        <div>
          <ul className='flex justify-between'>
            <li className='header_li_box'>
              <Link to="/">연령별 예방접종 정보</Link>
            </li>
            <li className='header_li_box'>
              <Link to="/">우리 동네 병원</Link>
            </li>
            <li className='header_li_box'>
              <Link to="/">우리아이 접종 플랜</Link>
            </li>
          </ul>
        </div>
        

        {/* 로그인 or 마이페이지 */}
        <div className='header_text whitespace-nowrap'>
              <Link to="/login">로그인</Link>
        </div>
      </header>
      {/* ===================== 메인 =================== */}
      <main className='w-full h-full grow flex flex-col items-center
                          overflow-y-auto'>

        <Routes>
          <Route path='/login' element={<Signin/>} />
          <Route path='/signup' element={<Signup/>} />
        </Routes>
      </main>
      <footer className='w-full h-[150px] flex bg-slate-300'> 


      </footer>
    </div>
    </BrowserRouter>
  );
}

export default App;
