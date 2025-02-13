import {BanknotesIcon, ChartBarIcon,} from "@heroicons/react/24/solid";
import chartDataOutput from "@/data/statistics-charts-data.jsx";
import foodWastePositionData from "@/widgets/map/food-waste-position.json";

export const statisticsCardsData =  [
    {
        color: "gray",
        icon: ChartBarIcon,
        title: "오늘의 소각량",
        value: chartDataOutput.todayGarbage + " 톤",
        footer: {
            color: "text-black",
            label: chartDataOutput.descriptionMessage,
        },
    },
    {
        color: "gray",
        icon: ChartBarIcon,
        title: "대전 내 RFID 음식물 쓰레기장 개수",
        value: Object.keys(foodWastePositionData).length + " 곳",
        footer: {
            color: "text-black",
            label: "2022년 기준",
        },
    },
    {
        color: "gray",
        icon: ChartBarIcon,
        title: "연간 쓰레기 발생량",
        value: "",
        footer: {
            // color: "text-red-500",
            // value: "+5%",
            label: "5개 시(서울, 부산, 광주, 대구, 대전) 기준",
        },
    },
];
export default statisticsCardsData;
