import {useState, useEffect} from 'react';
import axios from 'axios';
import xmljs from "xml-js";


export function MyComponent() {
    const serviceKey = 'F3lovR93YP57M/ONGC7gbdseWZ4IsI6AYwLie4NRncRFUrk4Z9tOKr6O1pv8UhvMYxDLuDqjRutEl0b0VjVu4w==';
    const today = new Date();

    const postData = {
        serviceKey: serviceKey,
        svcId: 'OPEN_44012_IPCIA', // 서비스 아이디
        para1: '20240101', // 검색 시작일자
        para2: '20240131', // 검색 종료일자
    };

    const [loadedData, setLoadedData] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/garbage/B552519/incineratorInOut/getIncineratorInOut', {params: postData});
                //XML 데이터 를 json 으로 변경
                const jsonData = xmljs.xml2js(response.data, {compact: true, spaces: 4});
                //필요한 item 담기
                const items = jsonData.response.body.items.item;
                console.error('월별 쓰레기 반입 및 소각현황 API 호출 성공:', items);
                //샘플 데이터 예제
                console.log(`
                        ----------example----------
                        월별 쓰레기 반입 및 소각현황: \n'
                        근무일자(COL1): ${items[0].COL1._text}\n 
                        쓰레기반입량(COL2): ${items[0].COL2._text}\n 
                        소각량 1호기(COL3): ${items[0].COL3._text}\n 
                        소각량 2호기(COL4): ${items[0].COL4._text}\n
                        총소각(COL5): ${items[0].COL5._text}\n
                         ----------example----------
                        `);

                setLoadedData(items);

            } catch (error) {
                console.error('월별 쓰레기 반입 및 소각현황 API 호출 실패:', error);
            }
        }
        const postData2 = {
            serviceKey: serviceKey, // 발급 받은 서비스 인증키
            type: 'M', // 일자별(D) / 월별(M) / 연별(Y)
            stdate: '2024-01', //조회할 기간 시작
            endate: today, //조회할 기간 끝
            ctgoup: '10',
            rfcode: '10101',
            stno: '1',
            enno: '100'

        };

        const fetchData2 = async () => {
            try {
                const response = await axios.get('/api2', {params: postData2});
                let data = response.data.dataList;
                console.log('폐기물 처리통계 상세내용:', data);

            } catch (error) {
                console.error('폐기물 처리통계 상세내용 API 호출 실패:', error);
            }


        };
        fetchData2();

        fetchData();

    }, []);


    console.log(loadedData)
    return <>
        <SampleChildren loadedData={loadedData}/>
    </>
}


export const SampleChildren = ({loadedData}) => {
    // graph
    // data

    return <>{loadedData.map((data) => <div>{JSON.stringify(data)}</div>)}</>
    // return <></>
}

export default {MyComponent};
