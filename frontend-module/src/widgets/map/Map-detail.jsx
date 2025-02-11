import React, {useEffect, useState} from "react";
import {Card, CardBody, CardHeader, Tab, Tabs, TabsHeader, Typography} from "@material-tailwind/react";
import {getWasteStatisticsData} from "@/data/index.js";


export function MapDetail(){

    const [wasteStaticsData, setWasteStaticsData] = useState([]);
    const [year, setYear] = useState('2020');

    useEffect(() => {
        const initializeTable = async() =>{
            const wasteStaticsData = await getWasteStatisticsData(year, 'table');
            console.log(wasteStaticsData[0]);
            setWasteStaticsData(wasteStaticsData);
        }

        initializeTable();
    }, [year]);

    const renderTableHeader = () =>{

        // 이거 다시봐야함
        const headers = Object.keys(wasteStaticsData[0]).filter(key => key !== "cityJidtCdNm");


        return (
            <tr>
                <th>도시</th>
                {headers.map((header, index) => (
                    <th key={index}>{header}</th>
                ))}
            </tr>
        );
    }

    const renderTableBody = () => {
        return wasteStaticsData.map((row, rowIndex) => (
            <tr key={rowIndex}>
                <td>{row.city}</td>
                {Object.keys(row).filter(key => key !== "city").map((key, colIndex) => (
                    <td key={colIndex}>{row[key]}</td>
                ))}
            </tr>
        ));
    }

    const changeTable = (e) => {
        const selectedYear = e.currentTarget.value;
        setYear(selectedYear);
    };
    return(
        <Card>
            <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
                <Typography variant="h6" color="white">
                    쓰레기 배출량 상세보기 페이지
                </Typography>
                <Tabs value="2020">
                    <TabsHeader>
                        <Tab value="2020" onClick={changeTable}>
                            2020년
                        </Tab>
                        <Tab value="2021" onClick={changeTable}>
                            2021년
                        </Tab>
                        <Tab value="2022" onClick={changeTable}>
                            2022년
                        </Tab>
                    </TabsHeader>
                </Tabs>
            </CardHeader>
            <CardBody>
                <table className="w-full min-w-[640px] table-auto">
                    <thead>
                        {renderTableHeader()}
                    </thead>
                    <tbody>
                        {renderTableBody()}
                    </tbody>
                </table>
            </CardBody>
        </Card>
    )
}

MapDetail.displayName = "/src/widgets/map/Map-detail.jsx";

export default MapDetail;