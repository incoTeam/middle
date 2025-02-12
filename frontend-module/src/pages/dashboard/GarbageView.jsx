import {useEffect, useRef, useState} from 'react';
import $ from 'jquery';

import {
    Card,
    CardHeader,
    CardBody,
    Typography,
} from "@material-tailwind/react";
import fetchDataOut from "@/data/dashboard-axios.jsx";
import DataTable from 'datatables.net-react';
import DT from 'datatables.net-dt';
import 'datatables.net-select-dt';
import 'datatables.net-responsive-dt';
import style from '@/../public/css/dataTables.tailwindcss.css';

DataTable.use(DT);


export function GarbageView() {
    const tableRef = useRef(null);
    const dataTableRef = useRef(null);
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetchDataOut.wasteData();
                setData(response);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    // datatable 초기화 중복 경고 메세지 를 방지
    useEffect(() => {
        if (dataTableRef.current === null) {
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
                    {data: "measuringDay"},
                    {data: "refuseType"},
                    {data: "companyType"},
                    {data: "refuseName"},
                    {data: "cars"},
                ],
                paging: true,
                pageLength: 10,

                columnDefs: [
                    {
                        targets: [0, 1, 2, 3, 4], // 모든 열에 스타일을 적용
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

    return (
        <div className="mt-12 mb-96 mr-5 ml-5 flex flex-col gap-12">
            <Card>
                <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
                    <Typography variant="h6" color="white">
                        쓰레기 처리 데이터
                    </Typography>
                </CardHeader>

                <table ref={tableRef} className={style.dataTable}>
                    <thead className="bg-gray-100">
                    <tr>
                        <th className="text-center border-b border-blue-gray-50 py-3 px-5 text-left">날짜</th>
                        <th className="text-center border-b border-blue-gray-50 py-3 px-5 text-left">처리 방식</th>
                        <th className="text-center border-b border-blue-gray-50 py-3 px-5 text-left">쓰레기 종류</th>
                        <th className="text-center border-b border-blue-gray-50 py-3 px-5 text-left">차량 대수</th>
                        <th className="text-center border-b border-blue-gray-50 py-3 px-5 text-left">처리중량 (kg)</th>
                    </tr>
                    </thead>
                    <tbody></tbody>
                </table>

            </Card>
        </div>
    );
}

export default GarbageView;
