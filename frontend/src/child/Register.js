import TailButton from "../UI/TailButton";
import { useEffect, useState } from "react";

import Register1 from "./Register1";
import Register2 from "./Register2";

export default function Register() {
    const url="localhost:8080/registerChild?childName=aa&member=chan@naver.com&vaccine=1";

    const [tags, setTags] = useState('');
    
    useEffect(()=>{
        setTags(<Register1 goNext={setTags}/>);
    },[]);
    
    return (
    <div className="">
        {tags}
    </div>
  )
}
