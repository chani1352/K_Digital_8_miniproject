import './App.css';
import './HeaderCss.css';

import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useRecoilState } from 'recoil';
import { loginToken, memInfo } from "./AtomMem";

import Signin from "./Signin";
import Signup from "./Signup";
import Welcome from './Welcome';
import Hospitals from './Hospitals';
import Test from "./Test";
import MainPage from './MainPage';
import MyPage from './MyPage';
import Vaccines from './Vaccines';


export default function Main() {

    const [atomToken, setAtomToken] = useRecoilState(loginToken);
    const [atomMeminfo, setAtomMeminfo] = useRecoilState(memInfo);

    // console.log("사용자 정보 " , atomMeminfo.name);
    return (
        <BrowserRouter>

            <div className="w-full min-w-[1000px] h-full ">
                <header className="w-full h-[120px] px-10 lg:px-[120px] z-50
                              sticky top-0 flex justify-between items-center
                              bg-[#ecf3f9]">
                    <div className='min-w-[140px] h-[70px] '>
                        <Link to="/">
                            {/* 로고 */}
                            <img className="h-full " src='./img/headerLogo.png' />
                        </Link>
                    </div>

                    <div>
                        <ul className='flex justify-between '>
                            <li className='header_li_box'>
                                <Link to="/vaccines">연령별 예방접종 정보</Link>
                            </li>
                            <li className='header_li_box '>
                                <Link to="/hospitals">우리 동네 병원</Link>
                            </li>
                            <li className='header_li_box '>
                                <Link to="/">우리아이 접종 플랜</Link>
                            </li>
                        </ul>
                    </div>
                   
                    {/* 로그인 or 마이페이지 */}
                    <div className='header_text whitespace-nowrap'>
                        
                        {atomToken||atomToken!=="" ? 
                            <div> 
                                <span className='mr-5 '>{atomMeminfo==null?"" : atomMeminfo.name+" 님"} </span> 
                                <Link to="/mypage">마이페이지</Link> 
                            </div>: <Link to="/login">로그인</Link>}
                    </div>
                </header>
                {/* ===================== 메인 =================== */}
                <main className='w-full h-full min-h-[800px] grow flex flex-col items-center
                              overflow-y-auto'>

                    <Routes>
                        <Route path='/' element={<MainPage />} />
                        <Route path='/login' element={<Signin />} />
                        <Route path='/signup' element={<Signup />} />
                        <Route path='/welcome' element={<Welcome />} />
                        <Route path='/hospitals' element={<Hospitals />} />
                        <Route path='/test' element={<Test />} />
                        <Route path='/mypage' element={<MyPage/>}/>
                        <Route path='/vaccines' element={<Vaccines/>} />
                    </Routes>
                </main>
                <footer className='w-full h-[150px] flex bg-slate-300'>


                </footer>
            </div>

        </BrowserRouter>
    )
}
