import foodWastePositionData from "./food-waste-position.json";
import React, {useEffect, useState} from "react";
import {Card, CardBody, CardHeader, Tab, Tabs, TabsHeader} from "@material-tailwind/react";

export function KakaoMapMain(){
    const [map, setMap] = useState(null);
    const [markers, setMarkers] = useState([]);

    const trashMarkers = [
        { latitude: 36.354261, longitude: 127.428529 },
        { latitude: 36.3110919, longitude: 127.4602822 },
    ];

    const foodWasteMarkers = foodWastePositionData;

    useEffect(()=>{
        const mapContainer = document.getElementById("kakaoMapMain");
        const mapOptions ={
            center: new kakao.maps.LatLng(36.3504119, 127.3845475),
            level: 7,
        }
        var kakaoMapMain = new kakao.maps.Map(mapContainer, mapOptions);
        setMap(kakaoMapMain);

        trashMarkers.forEach(position=>{
            const marker = new kakao.maps.Marker({
                position: new kakao.maps.LatLng(position.latitude, position.longitude),
            })
            marker.setMap(kakaoMapMain);
        })
    }, []);

    const addMarkers = (markersData) =>{
        return markersData.map((markerData) => {
            const { latitude, longitude } = markerData;
            const position = new kakao.maps.LatLng(latitude, longitude);
            const marker = new kakao.maps.Marker({
                position,
            });
            marker.setMap(map);  // 마커를 지도에 추가
            return marker;
        });
    }

    const changeMap = (e) =>{
        let mapValue = e.currentTarget.dataset.value;

        if (mapValue === "trashAmtTab") {
            markers.forEach((marker) => marker.setMap(null));
            const newMarkers = addMarkers(trashMarkers);
            setMarkers(newMarkers);
        } else {
            markers.forEach((marker) => marker.setMap(null));  // 모든 마커 숨기기
            const newMarkers = addMarkers(foodWasteMarkers);
            setMarkers(newMarkers);
        }
    }

    return(
        <div className="mb-4 grid grid-cols-1 gap-6 xl:grid-cols-3">
            <Card className="overflow-hidden xl:col-span-3 border border-blue-gra-100 shadow-sm">
                <CardHeader
                    floated={false}
                    shadow={false}
                    color="transparent"
                    className="mt-4 mb-1 flex ml-auto"
                >
                    <div className="w-96">
                        <Tabs value="trashAmtTab">
                            <TabsHeader>
                                <Tab value="trashAmtTab" onClick={changeMap}>
                                    쓰레기 배출량
                                </Tab>
                                <Tab value="foodWasteTab" onClick={changeMap}>
                                    음식물 쓰레기 위치
                                </Tab>
                            </TabsHeader>
                        </Tabs>
                    </div>
                </CardHeader>
                <CardBody>
                    <div
                        id="kakaoMapMain"
                        style={{
                            width: "100%",
                            height: "700px",
                        }}
                    ></div>
                </CardBody>
            </Card>
        </div>
    )
}

KakaoMapMain.displayName="/src/widgets/map/kakao-map-main.jsx";

export default KakaoMapMain;