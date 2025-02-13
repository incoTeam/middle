import React, {useEffect, useRef, useState} from "react";
import {getWasteStatisticsData} from "@/data/index.js";
import TableHeaderMapping from "@/widgets/map/Table-header-mapping.jsx";
import $ from 'jquery';

import {
    Card,
    CardHeader,
    CardBody,
    Typography, Tabs, TabsHeader, Tab,
} from "@material-tailwind/react";
import DataTable from 'datatables.net-react';
import DT from 'datatables.net-dt';
import 'datatables.net-select-dt';
import 'datatables.net-responsive-dt';
import style from '@/../public/css/dataTables.tailwindcss.css';

DataTable.use(DT);

export function MapDetail() {
    const tableRef = useRef(null);
    const dataTableRef = useRef(null);
    const [data, setData] = useState([]);
    const [year, setYear] = useState('2020');

    const selectedHeader = ['WT_TYPE_GB_NM', 'WSTE_M_CODE_NM',
        'WSTE_CODE_NM', 'WSTE_QTY', 'TOT_RECY_QTY', 'TOT_INCI_QTY', 'TOT_FILL_QTY', 'TOT_ETC_QTY'];

    useEffect(() => {
        const initializeTable = async () => {
            const staticsData = await getWasteStatisticsData(year, 'table');
            setData(staticsData);
            console.log(staticsData);
        }
        initializeTable();
    }, [year]);

    useEffect(()=>{
        if(dataTableRef.current === null){
            $(tableRef.current).DataTable({
                paging: true,
                pageLength: 10,
                destroy: true
            });
            dataTableRef.current = true;
        }
    }, []);

    useEffect(() => {
        // pageLength: 페이지 에 보여줄 row 갯수 설정
        if (dataTableRef.current) {
            $(tableRef.current).DataTable().destroy();
            $(tableRef.current).DataTable({
                data,
                columns: [
                    {data:"CITY_JIDT_CD_NM"},
                    {data: "WT_TYPE_GB_NM"},
                    {data: "WSTE_M_CODE_NM"},
                    {data: "WSTE_CODE_NM"},
                    {data: "WSTE_QTY"},
                    {data: "TOT_RECY_QTY"},
                    {data: "TOT_INCI_QTY"},
                    {data: "TOT_FILL_QTY"},
                    {data: "TOT_ETC_QTY"},
                ],
                paging: true,
                pageLength: 20,

                columnDefs: [
                    {
                        targets: [0, 1, 2, 3, 4, 5, 6, 7, 8], // 모든 열에 스타일을 적용
                        createdCell: (td, cellData, rowData, row, col) => {
                            $(td).css({
                                'border': '1px solid #e0e0e0', // 테두리 색상
                                'padding': '12px 15px',            // 패딩
                                'text-align': 'center',        // 텍스트 중앙 정렬
                                'font-size': '14px',           // 글자 크기
                                'color': '#333',               // 글자 색상
                                'background-color': '#ffffff', // 배경 색상 (밝은 회색)
                                'transition': 'background-color 0.3s', // 마우스 호버시 부드러운 전환 효과
                            });

                            // 마우스 호버시 배경색 변경 (조금 더 인터랙티브하게)
                            $(td).hover(
                                function () {
                                    $(this).css('background-color', '#e0f7fa'); // 푸른 배경색
                                },
                                function () {
                                    $(this).css('background-color', '#ffffff'); // 원래 색상으로 복귀
                                }
                            );
                        }
                    },
                ],
                destroy: true
            });
        }
    }, [data]);



    const renderTableHeader = () => {
        if (data.length === 0) return null;

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
        if (data.length === 0) return null;

        return data.map((row, rowIndex) => (
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
                <table ref={tableRef} className={style.dataTable}>
                    <thead className="bg-gray-100">
                    <tr>
                        <th className="text-center border-b border-blue-gray-50 py-3 px-5 text-left">시도</th>
                        <th className="text-center border-b border-blue-gray-50 py-3 px-5 text-left">폐기물 종류</th>
                        <th className="text-center border-b border-blue-gray-50 py-3 px-5 text-left">폐기물 종류</th>
                        <th className="text-center border-b border-blue-gray-50 py-3 px-5 text-left">폐기물 종류</th>
                        <th className="text-center border-b border-blue-gray-50 py-3 px-5 text-left">총 발생량(톤)</th>
                        <th className="text-center border-b border-blue-gray-50 py-3 px-5 text-left">총 재활용량(톤)</th>
                        <th className="text-center border-b border-blue-gray-50 py-3 px-5 text-left">총 소각량(톤)</th>
                        <th className="text-center border-b border-blue-gray-50 py-3 px-5 text-left">총 매립량(톤)</th>
                        <th className="text-center border-b border-blue-gray-50 py-3 px-5 text-left">총 기타량(톤)</th>
                    </tr>
                    </thead>
                    <tbody></tbody>
                </table>


                {/*<CardBody className="pt-0">*/}
                {/*    <Tabs value={year}>*/}
                {/*        <TabsHeader>*/}
                {/*            <Tab value="2020" onClick={changeTable}>*/}
                {/*                2020년*/}
                {/*            </Tab>*/}
                {/*            <Tab value="2021" onClick={changeTable}>*/}
                {/*                2021년*/}
                {/*            </Tab>*/}
                {/*            <Tab value="2022" onClick={changeTable}>*/}
                {/*                2022년*/}
                {/*            </Tab>*/}
                {/*        </TabsHeader>*/}
                {/*    </Tabs>*/}
                {/*    <table className="w-full min-w-[640px] table-fixed ">*/}
                {/*        <thead className="bg-gray-300">*/}
                {/*        {renderTableHeader()}*/}
                {/*        </thead>*/}
                {/*    </table>*/}
                {/*    <div className="max-h-[800px] overflow-y-auto">*/}
                {/*        <table className="w-full min-w-[640px] table-fixed">*/}
                {/*            <tbody>*/}
                {/*                {renderTableBody()}*/}
                {/*            </tbody>*/}
                {/*        </table>*/}
                {/*    </div>*/}
                {/*</CardBody>*/}
            </Card>
        </div>
    )
}

MapDetail.displayName = "/src/widgets/map/Map-detail.jsx";

export default MapDetail;