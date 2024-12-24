import { useState,useEffect } from 'react';

export default function Plan() {
  const [child, setChild] = useState([]);
  const [childName, setChildName] = useState([]);


  useEffect( async () => {
    const url = 'http://10.125.121.214:8080/getChild';
    await fetch(url)
      .then(resp => resp.json())
      .then(data => console.log(data))
      //.then(data => setChild(data))
      .catch(err => console.error("Error fetching Board:", err));
  }, []);

  //useEffect(() => {
 
  //}, [dataAll]);



  return (

    <div>
      <div>{child}</div>
      <a href='/signinChild'>아이 등록하기</a>
    </div>
  )
}