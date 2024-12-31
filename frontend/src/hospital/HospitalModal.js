import { LuPhoneCall, LuMapPin } from "react-icons/lu";
import { useEffect, useState } from 'react';
import './modal.css';;


export default function HospitalModal({ open, close, data }) {

  // console.log("data : ", data);

  const [address, setAddress] = useState('');

  //컴포넌트 첫 실행시 정보 셋팅
  useEffect(() => {
    if (data) {
      setAddress(data.orgAddr.split(',')[0]);
    }
  }, [data]);

  useEffect(() => {
    if (!open) return;

    const { kakao } = window;

    const mapContainer = document.getElementById('map'); // 지도를 표시할 div
    if (!mapContainer) return;

    const mapOption = {
      center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
      level: 3, // 지도의 확대 레벨
    };

    // 지도를 생성합니다
    const map = new kakao.maps.Map(mapContainer, mapOption);
    const geocoder = new kakao.maps.services.Geocoder();
    // console.log('Geocoder 객체 준비 완료:', geocoder);

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
          content: `<div style="width:150px;text-align:center;padding:6px 0;font-size: 0.7rem;">${data.orgnm}</div>`,
        });
        infowindow.open(map, marker);

        // 지도의 중심을 결과값으로 받은 위치로 이동
        map.setCenter(coords);
      }
    });


  }, [open, address])

  return (
    // 모달이 열릴때 openModal 클래스가 생성된다.
    <div className={open ? 'openModal modal' : 'modal'}>
      {open ? (
        <section className='h-[450px] bg-red-50'>
          {/* <header className="text-2xl font-bold">
            {data.orgnm}
            <button className="close" onClick={close}>
              &times;
            </button>
          </header> */}
          <main className='w-full p-4 flex flex-col items-center justify-start relative'>
            <button className="absolute right-4 text-right text-[#999] text-xl" onClick={close}>
              &times;
            </button>
            <div className='w-[450px] text-center text-2xl font-bold mt-4  mb-8 text-[#3b82f6]'>{data.orgnm}</div>
            <div id="map" className='w-[450px] h-[300px] bg-lime-100'>지도</div>
            <div className='w-[400px] flex flex-col items-start bg-gray-100 rounded-xl m-6 p-4'>
              <p className="flex items-center mb-2">
                {/* <GiRotaryPhone className="flex items-center mr-2 text-[#3b82f6]"/>{data.orgTlno} */}
                <LuPhoneCall className="flex items-center mr-3 text-[#3b82f6]" />{data.orgTlno}
              </p>
              <p className="flex items-center">
                <LuMapPin className="flex items-center mr-3 text-[#3b82f6]" />{address}

              </p>
            </div>
          </main>
          <footer className="pb-3 px-4">
            <button className="w-[300px]" onClick={close}>
              close
            </button>
          </footer>
        </section>
      ) : null}
    </div>
  );
}
