import React, {useEffect, useState} from "react";
import foodWastePositionData from "./food-waste-position.json";
import trashMarkerPosition from "./trash-marker-position.json";
import trashPosition from "./trash-position.json";
import {getWasteStatisticsData} from "@/data/index.js";

import {Button, Card, CardBody, CardHeader, Tab, Tabs, TabsHeader} from "@material-tailwind/react";

export function KakaoMapMain() {
    const [map, setMap] = useState(null);
    const [markers, setMarkers] = useState([]);
    const [polygons, setPolygons] = useState([]);
    const [infoWindows, setInfoWindows] = useState([]);
    const [wasteStaticsData, setWasteStaticsData] = useState([]);

    const trashPolygons = trashPosition;
    const trashMarkers = trashMarkerPosition;
    const foodWasteMarkers = foodWastePositionData;
    const initialWasteStaticsYear = '2022';

    useEffect(() => {
        const initializeMap = async() =>{
            // Kakao 지도 생성
            const mapContainer = document.getElementById("kakaoMapMain");
            const mapOptions = {
                center: new kakao.maps.LatLng(36.3504119, 127.3845475),
                level: 12,
            };
            const kakaoMapMain = new kakao.maps.Map(mapContainer, mapOptions);
            setMap(kakaoMapMain);

            // 초기 마커 추가
            const initialMarkers = addMarkers(kakaoMapMain, trashMarkers);
            setMarkers(initialMarkers);

            // 초기 마커의 인포 윈도 값 추가
            const staticsData = await getWasteStatisticsData(initialWasteStaticsYear, 'map');
            setWasteStaticsData(staticsData);

            // 초기 폴리곤 추가
            const initialPolygons = addPolygons(kakaoMapMain, trashPolygons);
            setPolygons(initialPolygons);

            try{
                if (initialMarkers.length > 0) {
                    const initialInfoWindows = addInfoWindows(kakaoMapMain, staticsData, trashMarkers);
                    setInfoWindows(initialInfoWindows);
                }
            }catch(error){
                console.error("데이터를 가져오는 중 오류가 발생했습니다:", error);
            }
        }
        initializeMap()
    }, []);

    const addInfoWindows = (mapInstance, staticsData, markersData) => {

        infoWindows.forEach((infoWindow)=>infoWindow.setMap(null));

        const newInfoWindows = markersData.map((markerData, index) => {
            const {latitude, longitude, "marker-name": markerName} = markerData;
            const iwPosition = new kakao.maps.LatLng(latitude, longitude);

            const infoWindowData = staticsData[index];

            const iwContent = infoWindowData
                ? `<div style="width:200px; height:100%; padding:5px;">
                  <strong>${markerName}</strong><br/>
                  2022년 기준 쓰레기 배출량: ${infoWindowData.WSTE_QTY.toLocaleString()} 톤
              </div>`
                : `<div style="padding:5px;">데이터 불러오기 실패</div>`;
            // const iwContent = `<div style="padding:5px;">${markerName}</div>`;
            const iwRemovable = true;

            const infoWindow = new kakao.maps.InfoWindow({
                position: iwPosition,
                content: iwContent,
                removable: iwRemovable
            });
            infoWindow.setMap(mapInstance);
            return infoWindow;
        });
        return newInfoWindows;
    };


    const addMarkers = (mapInstance, markersData) => {
        return markersData.map((markerData) => {
            const {latitude, longitude} = markerData;
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

            const newInfoWindows = addInfoWindows(map, wasteStaticsData, trashMarkers);
            setInfoWindows(newInfoWindows);

            let moveLatLon = new kakao.maps.LatLng(36.3504119, 127.3845475);

            // 지도 중심을 이동
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

            infoWindows.forEach((infoWindow) => infoWindow.setMap(null));
            setInfoWindows([]);

            let moveLatLon = new kakao.maps.LatLng(36.3504119, 127.3845475);

            // 지도 중심을 이동
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
                <Button className="mb-5 mr-5 ml-auto bg-gray-300" color="gray">
                    상세보기
                </Button>
            </Card>
        </div>
    );
}

KakaoMapMain.displayName = "/src/widgets/map/kakao-map-main.jsx";

export default KakaoMapMain;
