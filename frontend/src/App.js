// import logo from './logo.svg';

import './App.css';
import './css/HeaderCss.css';

import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Signin from "./Pages/Common/Signin";
import Signup from "./Pages/Common/Signup";
import Welcome from './Pages/Common/Welcome';
import MainPage from './Pages/Common/MainPage';
import NotFound from './Pages/Common/NotFound';

import Vaccines from './Pages/Vaccine/Vaccines';

import Hospitals from './Pages/Hospitals/Hospitals';

import MyPage from './Pages/Mypage/MyPage';
import ModifyMyInfo from './Pages/Mypage/ModifyMyInfos';

import Child from './Pages/Children/Child';
import Register from './Pages/Children/Register';
import VacInfo from './Pages/Children/VacInfo';
import Modifychild from "./Pages/Children/Modifychild";

import OAuth2 from './OAuth2';


function App() {

    let loginToken = localStorage.getItem("token");
    let memName = localStorage.getItem("memName");

    return (
        <BrowserRouter>

            <div className="w-full min-w-[1000px] h-full ">
                <header className="w-full h-[120px] px-10 lg:px-[120px] z-50
                                  sticky top-0 flex justify-between items-center
                                  bg-[#ecf3f9]">
                    <div className='min-w-[140px] h-[70px] '>
                        <Link to="/">
                            {/* 로고 */}
                            <img className="h-full " src='./img/headerLogo.png' alt="logo" />
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
                                <Link to="/child">우리아이 접종 플랜</Link>
                            </li>
                        </ul>
                    </div>

                    {/* 로그인 or 마이페이지 */}
                    <div className='header_text whitespace-nowrap'>
                        {loginToken == null ?
                            <Link to="/login">로그인</Link>
                            : <div><span className='mr-5 '>{memName == null ? "" : memName + " 님"} </span>
                                <Link to="/mypage">마이페이지</Link></div>}
                    </div>
                </header>
                {/* ===================== 메인 =================== */}
                <main className='w-full h-full min-h-[650px] grow flex flex-col items-center
                                  overflow-y-auto'>

                    <Routes>
                        <Route path='/' element={<MainPage />} />
                        <Route path='/login' element={<Signin />} />
                        <Route path='/signup' element={<Signup />} />
                        <Route path='/welcome' element={<Welcome />} />
                        <Route path='/hospitals' element={<Hospitals />} />
                        <Route path='/mypage' element={<MyPage />} />
                        <Route path='/vaccines' element={<Vaccines />} />
                        <Route path='/child' element={<Child />} />
                        <Route path='/child/register' element={<Register />} />
                        <Route path='/child/modify/:idx' element={<Modifychild />} />
                        <Route path='/child/vacInfo/:idx' element={<VacInfo />} />
                        <Route path='/oauth2' element={<OAuth2 />} />
                        <Route path='/modify' element={<ModifyMyInfo />} />

                        <Route path='/*' element={<NotFound/>} />

                    </Routes>
                </main>
                <footer className='w-full h-[150px] flex bg-slate-300 justify-center'>
                    <div className='w-full xl:w-2/3 flex justify-center  p-4'>
                        <div className='w-3/6 '>
                            <p className='font-bold text-gray-800 my-1'>우리 아이 접종 관리, 예방이</p>
                            <div className='flex flex-col text-sm text-gray-600'>

                                <p className='my-1'>
                                    <span className="pr-3">만든이</span> 
                                    <span className="pr-3">박래찬</span>
                                    <span className="pr-3">조은빈</span>
                                </p>
                                <p className='my-1'>PNU K-Digital Training 8</p>
                                <p className='my-1 lg:text-xs'>(46241) 부산광역시 금정구 부산대학로63번길 2 (장전동) 부산대학교 </p>
                            </div>
                        </div>
                        
                        <div className='w-2/6 '>
                            <p className='font-bold text-gray-800 my-1'>CONTACT US</p>
                            <div className='flex flex-col text-sm text-gray-600'>
                                <p className='my-1'>TEL 051-123-4567 </p>
                                <p className='my-1'>EMAIL vaccines@contact.com</p>
                            </div>
                        </div>

                        <div className='w-1/6 '>
                            <p className='font-bold text-gray-800 my-1'>CATEGORY</p>
                            <div className='flex flex-col text-sm text-gray-600'>
                                <p className='my-1'><Link to="/vaccines">연령별 예방접종 정보</Link></p>
                                <p className='my-1'><Link to="/hospitals">우리 동네 병원</Link></p>
                                <p className='my-1'><Link to="/child">우리아이 접종 플랜</Link></p>
                            </div>
                        </div>
               
                    </div>
                </footer>
            </div>
        </BrowserRouter>
    )
}

export default App;
