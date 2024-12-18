import './css/signCss.css';
export default function Test() {
    const signinPw = () => {}
  return (
    <div>
      <label for="password" className="input_label ">
            비밀번호</label>
          <input id="password" type="password" placeholder="********" ref={signinPw}
            className="input_box mb-[30px]" />
    </div>
  )
}
