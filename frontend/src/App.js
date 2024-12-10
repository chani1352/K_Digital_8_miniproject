// import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Signin from "./Signin";
import Signup from "./Signup";

function App() {
  return (
    <BrowserRouter>
    <div className= "w-full h-screen ">
      <header className="w-full min-w-[800px] h-40 sticky top-0 flex justify-between items-center
                          bg-slate-20 bg-slate-300">
        <p>이름</p>
        <ul className='flex justify-between'>
          <li className='mx-3'>
            <Link to="/">예방접종</Link>
          </li>
          <li className='mx-3'>
            <Link to="/">병원 찾기</Link>
          </li>
          <li className='mx-3'>
            <Link to="/">우리아이 관리</Link>
          </li>
        </ul>

        {/* 로그인 및 회원가입 */}
        <div className=''>
          <ul  className='flex'>
            <li className='mx-3'>
              <Link to="/login">로그인</Link>
            </li>
            <li className='mx-3'>
              <Link to="/signup">회원가입</Link>
            </li>
          </ul>
        </div>
      </header>
      <main className='w-full h-full grow flex flex-col items-center
                          overflow-y-auto'>

        <Routes>
          <Route path='/login' element={<Signin/>} />
          <Route path='/signup' element={<Signup/>} />
        </Routes>
      </main>
      <footer className='w-full h-48 flex bg-slate-300'> 


      </footer>
    </div>
    </BrowserRouter>
  );
}

export default App;
