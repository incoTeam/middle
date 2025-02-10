import React, { useEffect, useState } from "react";
import foodWastePositionData from "./food-waste-position.json";
import trashPosition from "./trash-position.json";
import { Card, CardBody, CardHeader, Tab, Tabs, TabsHeader } from "@material-tailwind/react";

export function KakaoMapMain() {
    const [map, setMap] = useState(null);
    const [markers, setMarkers] = useState([]);
    const [polygons, setPolygons] = useState([]);

    const trashPolygons = trashPosition;
    const foodWasteMarkers = foodWastePositionData;

    useEffect(() => {
        // Kakao 지도 생성
        const mapContainer = document.getElementById("kakaoMapMain");
        const mapOptions = {
            center: new kakao.maps.LatLng(36.3504119, 127.3845475),
            level: 12,
        };
        const kakaoMapMain = new kakao.maps.Map(mapContainer, mapOptions);
        setMap(kakaoMapMain);

        // 초기 폴리곤 추가
        const initialPolygons = addPolygons(kakaoMapMain, trashPolygons);
        setPolygons(initialPolygons);

        return () => {
            // 컴포넌트 언마운트 시 폴리곤 제거
            initialPolygons.forEach((polygon) => polygon.setMap(null));
        };
    }, []);

    const addMarkers = (mapInstance, markersData) => {
        return markersData.map((markerData) => {
            const { latitude, longitude } = markerData;
            const position = new kakao.maps.LatLng(latitude, longitude);
            const marker = new kakao.maps.Marker({
                position,
            });
            marker.setMap(mapInstance); // 지도에 마커 추가
            return marker;
        });
    };

    const addPolygons = (mapInstance, polygonsData) => {
        return polygonsData.map((polygonData) => {
            const path = polygonData.coordinates.map(
                ([lng, lat]) => new window.kakao.maps.LatLng(lat, lng)
            );

            const polygon = new kakao.maps.Polygon({
                path,
                strokeWeight: 3,
                strokeColor: "#39DE2A",
                strokeOpacity: 0.8,
                strokeStyle: "longdash",
                fillColor: "#A2FF99",
                fillOpacity: 0.7,
            });
            polygon.setMap(mapInstance); // 지도에 폴리곤 추가
            return polygon;
        });
    };

    const changeMap = (e) => {
        const mapValue = e.currentTarget.dataset.value;

        if (mapValue === "trashAmtTab") {
            // 음식물 쓰레기 마커 제거
            markers.forEach((marker) => marker.setMap(null));
            setMarkers([]);

            // 쓰레기 배출량 폴리곤 추가
            polygons.forEach((polygon) => polygon.setMap(null));
            const newPolygons = addPolygons(map, trashPolygons);
            setPolygons(newPolygons);

            // 지도 레벨 변경
            map.setLevel(12);
        } else if (mapValue === "foodWasteTab") {
            // 쓰레기 배출량 폴리곤 제거
            polygons.forEach((polygon) => polygon.setMap(null));
            setPolygons([]);

            // 음식물 쓰레기 마커 추가
            const newMarkers = addMarkers(map, foodWasteMarkers);
            setMarkers(newMarkers);

            // 지도 레벨 변경
            map.setLevel(5);
        }
    };

    return (
        <div className="mb-4 grid grid-cols-1 gap-6 xl:grid-cols-3">
            <Card className="overflow-hidden xl:col-span-3 border border-blue-gra-100 shadow-sm">
                <CardHeader floated={false} shadow={false} color="transparent" className="mt-4 mb-1 flex ml-auto">
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
    );
}

KakaoMapMain.displayName = "/src/widgets/map/kakao-map-main.jsx";

export default KakaoMapMain;
