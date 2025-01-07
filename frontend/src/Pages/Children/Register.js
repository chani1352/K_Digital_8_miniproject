import { useEffect, useState } from "react";

import Register1 from "./Register1";

export default function Register() {

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
