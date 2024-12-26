import { useRecoilState, useRecoilValue } from "recoil"
import { loginToken, memInfo } from "./AtomMem";

export default function MainPage() {

    const [atomToken, setAtomToken] = useRecoilState(loginToken);
    const [atomMeminfo, setAtomMeminfo] = useRecoilState(memInfo);

    console.log("atomMeminfo : ", atomMeminfo);

  return (
    <div>
      메인입니다.
    </div>
  )
}
