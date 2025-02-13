import {chartsConfig} from "@/configs";
import fetchDataOut from "@/data/dashboard-axios.jsx";


const wasteService = async () => {
    try {
        return await fetchDataOut.wasteData();
    } catch (error) {
        console.log(error);
    }
};
const waseteData = await wasteService();
// 같은 measuringDay의 refuseWeight 합산
const aggregateWasteData = (data) => {
    const result = {};

    data.forEach(item => {
        const {measuringDay, refuseWeight} = item;

        // 해당 measuringDay가 이미 result에 있으면 refuseWeight 합산
        if (result[measuringDay]) {
            result[measuringDay].refuseWeight += Number(refuseWeight);
        } else {
            // 없으면 새로운 항목 추가
            result[measuringDay] = {
                ...item,
                refuseWeight: Number(refuseWeight) // refuseWeight를 숫자로 변환하여 저장
            };
        }
    });

    // 객체에서 배열로 변환하여 반환
    return Object.values(result);
};

const aggregatedData = aggregateWasteData(waseteData);

const aggregateColumnValues = (items, columnName) => {
    return items.map(item => item[columnName]);
};

//컬럼 쓰레기 배열에 담기
const aggregateColumNameValue = aggregateColumnValues(aggregatedData, "measuringDay");
const refuseWeightValue = aggregateColumnValues(aggregatedData, "refuseWeight");

const garbageService = async () => {
    try {
        return await fetchDataOut.garbageData();
    } catch (error) {
        console.log(error);
    }
};
const items = await garbageService();

const extractColumnValues = (items, columnName) => {
    return items.map(item => item[columnName]?._text);
};

// COL2 값들을 배열로 변환
const updatedCOL5Items = extractColumnValues(items, 'COL5');
const updatedCOL1Items = extractColumnValues(items, 'COL1');
//오늘의 소각량

const todayGarbage = updatedCOL5Items[updatedCOL5Items.length - 1];
const chartMessage = (culumName, text, text2) => {
    let message = "";
    const difference = Number(Math.abs(culumName[culumName.length - 1] - culumName[culumName.length - 2]).toFixed(2)).toLocaleString(); // 차이를 소수점 둘째 자리까지만 표시


    if (culumName[culumName.length - 1] > culumName[culumName.length - 2]) {
        message = `${text}보다 소각량이 ${difference}${text2} 증가 하였습니다.`;
    } else {
        message = `${text}보다 소각량이 ${difference}${text2} 감소 하였습니다.`;
    }

    return message;
};


const websiteViewsChart = {
    type: "bar",
    height: 220,
    series: [
        {
            name: "Views",
            data: [10, 20, 10, 22, 50, 10, 40],
        },
    ],
    options: {
        ...chartsConfig,
        colors: "#388e3c",
        plotOptions: {
            bar: {
                columnWidth: "16%",
                borderRadius: 5,
            },
        },
        xaxis: {
            ...chartsConfig.xaxis,
            categories: ["M", "T", "W", "T", "F", "S", "S"],
        },
    },
};


const dailySalesChart = {
    type: "bar",
    height: 400,
    series: [
        {
            name: "톤",
            data: updatedCOL5Items,
        },
    ],
    options: {
        ...chartsConfig,
        colors: ["#0288d1"],
        stroke: {
            lineCap: "round",
        },
        markers: {
            size: 5,
        },
        xaxis: {
            ...chartsConfig.xaxis,
            categories: updatedCOL1Items,
        },
        yaxis: {
            ...chartsConfig.yaxis,
            labels: {
                ...chartsConfig.yaxis.labels,
                formatter: function (value) {
                    return `${value} 톤`; // Y축 값에 "톤"을 추가
                },
            },
        },
        tooltip: {
            ...chartsConfig.tooltip,
            y: {
                formatter: function (value) {
                    return `${value}`; // 툴팁 값에 "톤" 추가
                },
            },
        },
    },
};

const completedTaskChart = {
    type: "line",
    height: 400,
    series: [
        {
            name: "톤",
            data: [50, 40, 300, 320, 500, 350, 200, 230, 500],
        },
    ],
    options: {
        ...chartsConfig,
        colors: ["#388e3c"],
        stroke: {
            lineCap: "round",
        },
        markers: {
            size: 5,
        },
        xaxis: {
            ...chartsConfig.xaxis,
            categories: aggregateColumNameValue,
        },
    },
};
const completedTasksChart = {
    ...completedTaskChart,
    series: [
        {
            name: "kg",
            data: refuseWeightValue,
        },
    ],
};
const descriptionMessage = chartMessage(updatedCOL5Items, "어제", "톤");
export const statisticsChartsData = [
    // {
    //     color: "white",
    //     title: "Website View",
    //     description: "Last Campaign Performance",
    //     footer: "campaign sent 2 days ago",
    //     chart: websiteViewsChart,
    // },
    {
        color: "white",
        title: "대전광역시 일일 쓰레기 소각량",
        description: descriptionMessage,
        footer: "대전 도시공사 소각장 월별 쓰레기 반입 및 소각량 현황 API",
        chart: dailySalesChart,
    },
    {
        color: "white",
        title: "대전광역시 생활 폐기물 월별 처리량(소각 + 매립)",
        description: chartMessage(refuseWeightValue, "지난달", "kg"),
        footer: "대전 도시공사 생활폐기물반입정보 API",
        chart: completedTasksChart,
    },
];

const chartDataOutput = {
    wasteService,
    fetchDataOut,
    descriptionMessage,
    todayGarbage
}

export default chartDataOutput;
