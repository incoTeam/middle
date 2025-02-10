import React, { useEffect, useState } from "react";
import foodWastePositionData from "./food-waste-position.json";
import trashMarkerPosition from "./trash-marker-position.json";
import trashPosition from "./trash-position.json";
import {WasteStatisticsData} from "@/data/index.js";

import { Card, CardBody, CardHeader, Tab, Tabs, TabsHeader } from "@material-tailwind/react";

export function KakaoMapMain() {
    const [map, setMap] = useState(null);
    const [markers, setMarkers] = useState([]);
    const [polygons, setPolygons] = useState([]);
    const infoWindows = [];

    const trashPolygons = trashPosition;
    const trashMarkers = trashMarkerPosition;
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
        // 초기 마커 추가
        const initialMarkers = addMarkers(kakaoMapMain, trashMarkers);
        setMarkers(initialMarkers);
        console.log(trashMarkers)
        // 초기 마커의 인포 윈도 값 추가

        const fetchData = async() =>{
            const data = await WasteStatisticsData();
            console.log("fetchData ", data);

            if(initialMarkers.length > 0){
                addInfoWindows(kakaoMapMain, data, trashMarkers);
            }
        };

        fetchData();
    }, []);

    const addInfoWindows = (mapInstance, infoWindowsData, markersData) => {
        console.log("addInfoWindows", infoWindowsData);
        console.log("markersData", markersData);

        return markersData.map((markerData, index) => {
            const { latitude, longitude, "marker-name": markerName } = markerData;
            const iwPosition = new kakao.maps.LatLng(latitude, longitude);

            // infoWindowsData의 순서가 맞다면 index로 매칭
            const infoWindowData = infoWindowsData[index]; // 순서대로 매칭

            // infoWindowData가 존재하면 iwContent 설정, 없으면 기본 값 설정
            const iwContent = infoWindowData
                ? `<div style="padding:5px;">
                  <strong>${markerName}</strong><br/>
                  Waste Quantity: ${infoWindowData.WSTE_QTY}
              </div>`
                : `<div style="padding:5px;">No data available</div>`;

            const iwRemovable = true;

            const infoWindow = new kakao.maps.InfoWindow({
                map: mapInstance,
                position: iwPosition,
                content: iwContent,
                removable: iwRemovable
            });

            infoWindows.push(infoWindow);

            infoWindow.setMap(mapInstance);
            return infoWindow;
        });
    };


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

            infoWindows.map((infoWindow) => {
                infoWindow.open(map, markers);
            })

            let moveLatLon = new kakao.maps.LatLng(36.3504119, 127.3845475);
            // 지도 중심을 이동 시킵니다
            map.setCenter(moveLatLon);
            // 지도 레벨 변경
            map.setLevel(12);
        } else if (mapValue === "foodWasteTab") {
            // 쓰레기 배출량 폴리곤 제거
            polygons.forEach((polygon) => polygon.setMap(null));
            setPolygons([]);

            // 음식물 쓰레기 마커 추가
            const newMarkers = addMarkers(map, foodWasteMarkers);
            setMarkers(newMarkers);

            infoWindows.map((infoWindow)=>{
                infoWindow.close();
            })

            let moveLatLon = new kakao.maps.LatLng(36.3504119, 127.3845475);
            // 지도 중심을 이동 시킵니다
            map.setCenter(moveLatLon);
            // 지도 레벨 변경
            map.setLevel(6);
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
