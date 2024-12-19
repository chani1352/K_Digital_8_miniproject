import TailButton from "./UI/TailButton"

import { useRecoilState } from 'recoil';
import { loginToken } from "./AtomMem";

export default function MyPage() {
    const [atomToken, setAtomToken] = useRecoilState(loginToken);

    const handleLogout = () => {
        setAtomToken(null);
        window.location.href = "/";
        console.log("logout 후 atomToken : ", atomToken);
    }

    return (
        <div>
            마이페이지 입니다.

            <div> <TailButton caption={"로그아웃"} color={"blue"} handleClick={handleLogout} /> </div>
        </div>
    )
}
