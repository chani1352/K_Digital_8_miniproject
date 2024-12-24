import { Link } from "react-router-dom"

export default function Child() {
  return (
    <div>
      우리아이페이지
      <Link to='./register'>등록하기</Link>


    </div>
  )
}
