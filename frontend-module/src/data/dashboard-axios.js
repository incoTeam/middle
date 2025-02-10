import {useState, useEffect} from 'react';
import axios from 'axios';
import xmlToJson from "@/util/xml-to-json.js";

export function MyComponent() {
    const [data, setData] = useState(null);
    const serviceKey = 'F3lovR93YP57M/ONGC7gbdseWZ4IsI6AYwLie4NRncRFUrk4Z9tOKr6O1pv8UhvMYxDLuDqjRutEl0b0VjVu4w==';
    const serviceKey2 = 'F3lovR93YP57M%2FONGC7gbdseWZ4IsI6AYwLie4NRncRFUrk4Z9tOKr6O1pv8UhvMYxDLuDqjRutEl0b0VjVu4w%3D%3D';

    const postData = {
        serviceKey: serviceKey,
        svcId: 'OPEN_44012_IPCIA', // 서비스 아이디
        para1: '20240101', // 검색 시작일자
        para2: '20240131', // 검색 종료일자
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/test/B552519/incineratorInOut/getIncineratorInOut', {params: postData});
                console.log('COL1\tstring\n' +
                    '근무일자\n' +
                    '\n' +
                    'COL2\tstring\n' +
                    '쓰레기반입량\n' +
                    '\n' +
                    'COL3\tstring\n' +
                    '소각량 1호기\n' +
                    '\n' +
                    'COL4\tstring\n' +
                    '소각량 2호기\n' +
                    '\n' +
                    'COL5\tstring\n' +
                    '총소각');
                console.log('월별 쓰레기 반입 및 소각현황:', xmlToJson(response.data));
                setData(response.data);
            } catch (error) {
                console.error('월별 쓰레기 반입 및 소각현황 API 호출 실패:', error);
            }
        }
        const postData2 = {
            serviceKey: serviceKey2, // 발급 받은 서비스 인증키
            type: 'D', // 일자별(D) / 월별(M) / 연별(Y)
            stdate: '2017-01-01', //조회할 기간 시작
            endate: '2017-01-31', //조회할 기간 끝
        };

        const fetchData2 = async () => {
            try {
                const response = await axios.get('/api2', {params: postData2});

                console.log('폐기물 처리통계 상세내용:', response.data);
                setData(response.data);
            } catch (error) {
                console.error('폐기물 처리통계 상세내용 API 호출 실패:', error);
            }


        };
        fetchData2();

        fetchData();

    }, []);


}

export default MyComponent;
