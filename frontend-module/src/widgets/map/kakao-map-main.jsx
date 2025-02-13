import React, {useEffect, useState} from "react";
import foodWastePositionData from "./food-waste-position.json";
import trashMarkerPosition from "./trash-marker-position.json";
import trashPosition from "./trash-position.json";
import {getWasteStatisticsData} from "@/data/index.js";

import {Card, CardBody, CardFooter, CardHeader, Tab, Tabs, TabsHeader, Typography} from "@material-tailwind/react";
import {ClockIcon} from "@heroicons/react/24/solid/index.js";

export const KakaoMapMain = ({ setExportWasteValue }) => {

    const [map, setMap] = useState(null);
    const [markers, setMarkers] = useState([]);
    const [polygons, setPolygons] = useState([]);
    const [infoWindowsTrash, setInfoWindowsTrash] = useState([]);
    const [infoWindowsFood, setInfoWindowsFood] = useState([]);
    const [wasteStaticsData, setWasteStaticsData] = useState([]);

    const trashPolygons = trashPosition;
    const trashMarkers = trashMarkerPosition;
    const foodWasteMarkers = foodWastePositionData;
    const initialWasteStaticsYear = '2022';

    const calc = (wasteStaticsData) => {
        if (wasteStaticsData && wasteStaticsData.length > 0) {
            const calculatedData = calculateStatisticsData(wasteStaticsData);
            console.log("calculateData:", calculatedData);

            setExportWasteValue(calculatedData);
        }
    };

    const calculateStatisticsData = (wasteStaticsData) => {
        if (!wasteStaticsData || wasteStaticsData.length === 0) return { sumWsteQty: 0 };

        const extractColumnValues = (items, columnName) => {
            return items.map((item) => item[columnName]);
        };
        const wsteQty = extractColumnValues(wasteStaticsData, "WSTE_QTY");
        const sumWsteQty = wsteQty.reduce((sum, value) => sum + value, 0);
        return sumWsteQty;
    };

    useEffect(() => {
        const initializeMap = async() => {
            // Kakao 지도 생성
            const mapContainer = document.getElementById("kakaoMapMain");
            const mapOptions = {
                center: new kakao.maps.LatLng(36.3504119, 127.3845475),
                level: 12,
            };
            const kakaoMapMain = new kakao.maps.Map(mapContainer, mapOptions);
            setMap(kakaoMapMain);
            kakaoMapMain.setMaxLevel(12);
            // 초기 마커 추가
            const initialMarkers = addMarkers(kakaoMapMain, trashMarkers);
            setMarkers(initialMarkers);

            // 초기 마커의 인포 윈도 값 추가
            const staticsData = await getWasteStatisticsData(initialWasteStaticsYear, 'map');
            setWasteStaticsData(staticsData);

            // 초기 폴리곤 추가
            const initialPolygons = addPolygons(kakaoMapMain, trashPolygons);
            setPolygons(initialPolygons);

            try {
                if (initialMarkers.length > 0) {
                    // 초기 인포윈도 설정
                    const initialInfoWindows = addInfoWindowsForTrash(kakaoMapMain, staticsData, trashMarkers);
                    setInfoWindowsTrash(initialInfoWindows);
                    calc(staticsData);
                }
            } catch (error) {
                console.error("데이터를 가져오는 중 오류가 발생했습니다:", error);
            }
        }
        initializeMap();
    }, []);

    const addInfoWindowsForTrash = (mapInstance, staticsData, markersData) => {

        infoWindowsTrash.forEach((infoWindow) => infoWindow.setMap(null));

        const newInfoWindows = markersData.map((markerData, index) => {
            const {latitude, longitude, "marker-name": markerName} = markerData;
            const iwPosition = new kakao.maps.LatLng(latitude, longitude);
            const infoWindowData = staticsData[index];

            const iwContent = infoWindowData
                ? `<div style="width:250px; height:100%; padding:5px;">
                  <strong>${markerName}</strong><br/>
                  2022년 기준 쓰레기 배출량 : ${infoWindowData.WSTE_QTY.toLocaleString()} 톤
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

    const addInfoWindowsForFoodWaste = (mapInstance, positionData, newMarkers) => {

        const newInfoWindows = positionData.map((markerData, index) => {
            const {locationName, locationAddress} = markerData;
            const infoWindowData = positionData[index];

            const iwContent = infoWindowData
                ? `
                <div style="width:250px; height:100%; padding:5px;">
                    <strong>${locationName}</strong><br/>
                    ${locationAddress}
                </div>`
                : `<div style="padding:5px;">데이터 불러오기 실패</div>`;

            const iwRemovable = true;

            const infoWindow = new kakao.maps.InfoWindow({
                content: iwContent,
                removable: iwRemovable
            });

            kakao.maps.event.addListener(newMarkers[index], 'mouseover', function () {
                infoWindow.open(mapInstance, newMarkers[index]);
            })

            kakao.maps.event.addListener(newMarkers[index], 'mouseout', function () {
                infoWindow.close();
            })
            return infoWindow;
        })
        return newInfoWindows;
    }

    const addMarkers = (mapInstance, markersData) => {
        return markersData.map((markerData) => {
            const {latitude, longitude} = markerData;
            const position = new kakao.maps.LatLng(latitude, longitude);
            const marker = new kakao.maps.Marker({
                position,
                clickable: "true"
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

            const newInfoWindows = addInfoWindowsForTrash(map, wasteStaticsData, trashMarkers);
            setInfoWindowsTrash(newInfoWindows);

            let moveLatLon = new kakao.maps.LatLng(36.3504119, 127.3845475);

            // 지도 중심을 이동
            map.setCenter(moveLatLon);
            // 지도 레벨 변경
            map.setMaxLevel(12);
            map.setLevel(12);
        } else if (mapValue === "foodWasteTab") {
            // 쓰레기 배출량 폴리곤 제거
            polygons.forEach((polygon) => polygon.setMap(null));
            setPolygons([]);

            // 음식물 쓰레기 마커 추가
            const newMarkers = addMarkers(map, foodWasteMarkers);
            setMarkers(newMarkers);

            infoWindowsTrash.forEach((infoWindow) => infoWindow.setMap(null));
            setInfoWindowsTrash([]);

            // 음식물 쓰레기 위치의 인포 윈도 값 추가
            const foodWasteInfoWindows = addInfoWindowsForFoodWaste(map, foodWasteMarkers, newMarkers);
            setInfoWindowsFood(foodWasteInfoWindows);

            let moveLatLon = new kakao.maps.LatLng(36.3504119, 127.3845475);

            // 지도 중심을 이동
            map.setCenter(moveLatLon);
            // 지도 레벨 변경
            map.setMaxLevel(7);
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
                                    연간 쓰레기 배출량
                                </Tab>
                                <Tab value="foodWasteTab" onClick={changeMap}>
                                    음식물 쓰레기장 위치
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
                <CardFooter>
                    <Typography
                        variant="small"
                        className="flex items-center font-normal text-blue-gray-600"
                    >
                        <ClockIcon strokeWidth={2} className="h-4 w-4 text-blue-gray-400"/>
                        &nbsp;
                        From 2022
                        <a href="/dashboard/MapDetailView" className="text-blue-500 hover:underline ml-auto">
                            상세 페이지로 이동
                        </a>
                    </Typography>
                </CardFooter>
            </Card>
        </div>
    );
}

KakaoMapMain.displayName = "/src/widgets/map/kakao-map-main.jsx";
export default KakaoMapMain;
