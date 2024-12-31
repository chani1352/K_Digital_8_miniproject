// import VacSchedule from "./child/VacSchedule"
// export default function Test() {


//   return (
//     <div className="w-[800px] h-full flex flex-col justify-start items-center py-12">
// <VacSchedule/>
//     </div>

//   )
// }

import React, { useEffect, useState } from 'react';

export default function Test() {
    const [address, setAddress] = useState('');
    const [hospitalName, setHospitalName] = useState('');

    useEffect(() => {
        // URL에서 'data' 파라미터를 가져와서 상태로 설정
        const params = new URLSearchParams(window.location.search);
        if (params.get('address') && params.get('name')) {
            setAddress(params.get('address'));
            setHospitalName(params.get('name'));
        }

    }, []); // 컴포넌트가 마운트될 때 한 번만 실행

    useEffect(() => {
        // 'data'가 설정되면 지도 초기화
        if (address) {
            const { kakao } = window;

            const mapContainer = document.getElementById('map'); // 지도를 표시할 div
            const mapOption = {
                center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
                level: 3, // 지도의 확대 레벨
            };

            // 지도를 생성합니다
            const map = new kakao.maps.Map(mapContainer, mapOption);
            const geocoder = new kakao.maps.services.Geocoder();
            console.log('Geocoder 객체 준비 완료:', geocoder);

            // 주소를 검색하여 지도를 갱신
            geocoder.addressSearch(address, function (result, status) {
                if (status === kakao.maps.services.Status.OK) {
                    const coords = new kakao.maps.LatLng(result[0].y, result[0].x);

                    // 마커 표시
                    const marker = new kakao.maps.Marker({
                        map: map,
                        position: coords,
                    });

                    // 인포윈도우
                    const infowindow = new kakao.maps.InfoWindow({
                        content: `<div style="width:150px;text-align:center;padding:6px 0;">${hospitalName}</div>`,
                    });
                    infowindow.open(map, marker);

                    // 지도의 중심을 결과값으로 받은 위치로 이동
                    map.setCenter(coords);
                }
            });
        }
    }, [address]); // 'data' 값이 바뀔 때마다 지도를 업데이트

    return (
        <div className="w-1/2 block mx-1">
            <div id="map" className="w-full h-[500px]"></div>
        </div>
    );
}

