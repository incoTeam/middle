import { useEffect, useRef } from 'react';

function KakaoMap() {
    useEffect(()=>{
        const mapContainer = document.getElementById("kakaoMap");
        const mapOptions ={
            center: new kakao.maps.LatLng(33.450701, 126.570667),
            level: 3,
        }
        const kakaoMap = new kakao.maps.Map(mapContainer, mapOptions);
    }, []);

    return (
        <div
            id="kakaoMap"
            style={{
                width: "100%",
                height: "500px",
            }}
        ></div>
    );
}

KakaoMap.displayName = "/src/widgets/map/kakao-map.jsx";

export default KakaoMap;
