import {BanknotesIcon, ChartBarIcon,} from "@heroicons/react/24/solid";
import chartDataOutput from "@/data/statistics-charts-data.jsx";

export const statisticsCardsData =  [
    {
        color: "gray",
        icon: BanknotesIcon,
        title: "오늘의 소각량",
        value: chartDataOutput.todayGarbage + "Ton",
        footer: {
            color: "text-black",
            label: chartDataOutput.descriptionMessage,
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
            // label: "작년보다 늘었습니다.",
        },
    },
];
export default statisticsCardsData;
