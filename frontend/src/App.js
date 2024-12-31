// import logo from './logo.svg';

import './App.css';
import './HeaderCss.css';

import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Signin from "./Signin";
import Signup from "./Signup";
import Welcome from './Welcome';
import Hospitals from './Hospitals';
import Test from "./Test";
import MainPage from './MainPage';
import MyPage from './MyPage';
import Vaccines from './Vaccines';
import Child from './child/Child';
import Register from './child/Register';
import VacInfo from './child/VacInfo';
import OAuth2 from './OAuth2';
import Modifychild from "./child/Modifychild";
import ModifyMyInfo from './pages/ModifyMyInfo';


function App() {

  let loginToken = localStorage.getItem("token");
  let memName = localStorage.getItem("memName");
  console.log("Main- loginToken :", loginToken);
  console.log("Main- memName :", memName);
    return (
    <BrowserRouter>
    
                <div className="w-full min-w-[1000px] h-full ">
                    <header className="w-full h-[120px] px-10 lg:px-[120px] z-50
                                  sticky top-0 flex justify-between items-center
                                  bg-[#ecf3f9]">
                        <div className='min-w-[140px] h-[70px] '>
                            <Link to="/">
                                {/* 로고 */}
                                <img className="h-full " src='./img/headerLogo.png' alt="logo"/>
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
                                { loginToken==null ? 
                                <Link to="/login">로그인</Link> 
                                : <div><span className='mr-5 '>{memName==null?"" : memName+" 님"} </span>
                                <Link to="/mypage">마이페이지</Link></div> }
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
                            <Route path='/child' element={<Child/>} />
                            <Route path='/child/register' element={<Register/>} />
                            <Route path='/child/modify/:idx' element={<Modifychild/>} />
                            <Route path='/child/vacInfo/:idx' element={<VacInfo/>} />
                            <Route path='/oauth2' element={<OAuth2/>} />
                            <Route path='/modify' element={<ModifyMyInfo/>} />

                        </Routes>
                    </main>
                    <footer className='w-full h-[150px] flex bg-slate-300'>
                    </footer>
                </div>
            </BrowserRouter>
    )
}

export default App;
