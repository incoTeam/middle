import axios from 'axios';
import xmljs from "xml-js";


const serviceKey = 'F3lovR93YP57M/ONGC7gbdseWZ4IsI6AYwLie4NRncRFUrk4Z9tOKr6O1pv8UhvMYxDLuDqjRutEl0b0VjVu4w==';
const today = new Date();
// 연도, 월, 일 추출
const year = today.getFullYear();
const month = String(today.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1 필요
const day = String(today.getDate()).padStart(2, '0'); // 일자 두 자리 맞추기

const formattedDate = `${year}${month}${day}`; //현재날짜 250211 형식으로 변경

// 2개월 전 날짜 계산
const threeMonthsAgo = new Date();
threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 1);

// 2개월 전 날짜 포맷 (20240101 형식)
const yearAgo = threeMonthsAgo.getFullYear();
const monthAgo = String(threeMonthsAgo.getMonth() + 1).padStart(2, '0');
const dayAgo = String(threeMonthsAgo.getDate()).padStart(2, '0');
const formattedDateAgo = `${yearAgo}${monthAgo}${dayAgo}`;

// 2년 전 날짜 계산
const twoYearsAgo = new Date();
twoYearsAgo.setFullYear(twoYearsAgo.getFullYear() - 2);

// 2년 전 날짜 포맷 (YYYYMMDD 형식)
const twoYearAgo = twoYearsAgo.getFullYear();
const monthAgo2 = String(twoYearsAgo.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1
const dayAgo2 = String(twoYearsAgo.getDate()).padStart(2, '0');

// 최종 포맷
const formattedDateTwoYearAgo = `${twoYearAgo}${monthAgo2}${dayAgo2}`;

const garbagePostData = {
    serviceKey: serviceKey,
    svcId: 'OPEN_44012_IPCIA', // 서비스 아이디wa
    para1: formattedDateAgo, // 검색 시작일자
    para2: formattedDate, // 검색 종료일자
};

const wastePostData = {
    serviceKey: serviceKey, // 발급 받은 서비스 인증키
    type: 'M', // 일자별(D) / 월별(M) / 연별(Y)
    stdate: formattedDateTwoYearAgo, // 조회할 기간 시작
    endate: today, // 조회할 기간 끝
    ctgoup: '10',
    rfcode: '10101',
    stno: '1',
    enno: '100'
};


// 첫 번째 API 호출
// 월별 쓰레기 반입 소각현황
const garbageData = async () => {
    try {
        const response = await axios.get('/garbage/B552519/incineratorInOut/getIncineratorInOut', {params: garbagePostData});
        // XML 데이터를 JSON으로 변환
        const jsonData = xmljs.xml2js(response.data, {compact: true, spaces: 4});
        const items = jsonData.response.body.items.item;
        return items;
    } catch (error) {
        console.error('월별 쓰레기 반입 및 소각현황 API 호출 실패:', error);
        return error;
    }
};


// 두 번째 API 호출
// 폐기물 처리 데이터
const wasteData = async () => {
    try {
        const response = await axios.get('/api2', {params: wastePostData});
        return response.data.dataList;
    } catch (error) {
        console.error('폐기물 처리통계 상세내용 API 호출 실패:', error);
        return error;
    }
};


const fetchDataOut = {
    garbageData, wasteData
};

export default fetchDataOut;




