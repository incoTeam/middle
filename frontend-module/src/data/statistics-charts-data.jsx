import {useEffect, useState} from "react";
import {chartsConfig} from "@/configs";
import fetchDataOut from "@/data/dashboard-axios.jsx";


const garbageService = async () => {
    try {
        const garbargeData = await fetchDataOut.garbageData();
        return garbargeData;
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

const chartMessage = () => {
    let message = "";
    if (updatedCOL5Items[updatedCOL5Items.length - 1] > updatedCOL5Items[updatedCOL5Items.length - 2]) {
        message = `어제보다 소각량이 ${updatedCOL5Items[updatedCOL5Items.length - 1] - updatedCOL5Items[updatedCOL5Items.length - 2]}Ton 증가 하였습니다.`;
    } else {
        message = `어제보다 소각량이 ${updatedCOL5Items[updatedCOL5Items.length - 2] - updatedCOL5Items[updatedCOL5Items.length - 1]}Ton 감소 하였습니다.`;
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
    height: 220,
    series: [
        {
            name: "Sales",
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
    },
};

const completedTaskChart = {
    type: "line",
    height: 220,
    series: [
        {
            name: "Sales",
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
            categories: [
                "Apr",
                "May",
                "Jun",
                "Jul",
                "Aug",
                "Sep",
                "Oct",
                "Nov",
                "Dec",
            ],
        },
    },
};
const completedTasksChart = {
    ...completedTaskChart,
    series: [
        {
            name: "Tasks",
            data: [50, 40, 300, 220, 500, 250, 400, 230, 500],
        },
    ],
};

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
        title: "일일 쓰레기 소각량",
        description: chartMessage(),
        footer: "from. 대전 도시공사",
        chart: dailySalesChart,
    },
    // {
    //     color: "white",
    //     title: "Completed Tasks",
    //     description: "Last Campaign Performance",
    //     footer: "just updated",
    //     chart: completedTasksChart,
    // },
];


export default statisticsChartsData;
