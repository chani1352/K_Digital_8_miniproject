import { useEffect } from "react";
import { afterLogin } from "./Signin";

export default function OAuth2() {
    useEffect(() => {
        // 비동기 작업을 처리할 함수 정의
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:8080/oauth2', {
                    method: 'GET',
                    credentials: 'include',
                });
                const token = await response.text();  // JSON 형식으로 응답 받기
                console.log("data", token);
                if (token) {
                    localStorage.setItem('token', token);
                    afterLogin(token);
                }
            } catch (error) {
                console.error('Error fetching data', error);
            }
        };
        // 비동기 함수 호출
        fetchData();
    }, []);

}