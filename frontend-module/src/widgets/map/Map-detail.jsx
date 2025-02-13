import React, {useEffect, useState} from "react";
import {Card, CardBody, CardHeader, Tab, Tabs, TabsHeader, Typography} from "@material-tailwind/react";
import {getWasteStatisticsData} from "@/data/index.js";
import TableHeaderMapping from "@/widgets/map/Table-header-mapping.jsx";

export function MapDetail() {

    const [wasteStaticsData, setWasteStaticsData] = useState([]);
    const [year, setYear] = useState('2020')
    const selectedHeader = ['WT_TYPE_GB_NM', 'WSTE_M_CODE_NM',
        'WSTE_CODE_NM', 'WSTE_QTY', 'TOT_RECY_QTY', 'TOT_INCI_QTY', 'TOT_FILL_QTY', 'TOT_ETC_QTY'];

    useEffect(() => {
        const initializeTable = async () => {
            const staticsData = await getWasteStatisticsData(year, 'table');
            setWasteStaticsData(staticsData);
        }

        initializeTable();
    }, [year]);

    const renderTableHeader = () => {
        if (wasteStaticsData.length === 0) return null;

        return (
            <tr>
                <th
                    className="border-b border-blue-gray-50 py-3 px-5 text-left"
                >
                    시도
                </th>
                {selectedHeader.map((header, index) => (
                    <th
                        key={index}
                        className="border-b border-blue-gray-50 py-3 px-5 text-left"
                    >
                        {TableHeaderMapping[header] || header}
                    </th>
                ))}
            </tr>
        );
    }

    const renderTableBody = () => {
        if (wasteStaticsData.length === 0) return null;

        return wasteStaticsData.map((row, rowIndex) => (
            <tr key={rowIndex}>
                <td
                    className="py-3 px-5 border-b border-blue-gray-100"
                >
                    {row.CITY_JIDT_CD_NM}
                </td>
                {selectedHeader.map((key, colIndex) => (
                    <td
                        key={colIndex}
                        className="py-3 px-5 border-b border-blue-gray-100"
                    >
                        {row[key]}
                    </td>
                ))}
            </tr>
        ));
    }

    const changeTable = (e) => {
        const selectedYear = e.currentTarget.dataset.value;
        setYear(selectedYear);
    };

    return (
        <div className="mt-12 mb-96 mr-5 ml-5 flex flex-col gap-12">
            <Card>
                <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
                    <Typography variant="h6" color="white">
                        쓰레기 배출량 상세보기 페이지
                    </Typography>
                </CardHeader>
                <CardBody className="pt-0">
                    <Tabs value={year}>
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
                    <table className="w-full min-w-[640px] table-fixed ">
                        <thead className="bg-gray-300">
                        {renderTableHeader()}
                        </thead>
                    </table>
                    <div className="max-h-[800px] overflow-y-auto">
                        <table className="w-full min-w-[640px] table-fixed">
                            <tbody>
                                {renderTableBody()}
                            </tbody>
                        </table>
                    </div>
                </CardBody>
            </Card>
        </div>
    )
}

MapDetail.displayName = "/src/widgets/map/Map-detail.jsx";

export default MapDetail;