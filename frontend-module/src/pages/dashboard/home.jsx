import React, {useState} from "react";
import {Typography,} from "@material-tailwind/react";
import {StatisticsCard} from "@/widgets/cards";
import {StatisticsChart} from "@/widgets/charts";

import {statisticsCardsData, statisticsChartsData,} from "@/data";
import {ClockIcon} from "@heroicons/react/24/solid";
import {KakaoMapMain} from "@/widgets/map";

export function Home() {
    const [exportWasteValue, setExportWasteValue] = useState(0);

    const updatedStatisticsCardsData = statisticsCardsData.map(card => ({
        ...card,
        value: card.title === "연간 쓰레기 발생량" ? exportWasteValue.toLocaleString() + " Ton" : card.value,
    }));

    return (
        <div className="mt-12">
            <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-2">
                {updatedStatisticsCardsData.map(({icon, title, footer, ...rest}) => (
                    <StatisticsCard
                        key={title}
                        {...rest}
                        title={title}
                        icon={React.createElement(icon, {
                            className: "w-6 h-6 text-white",
                        })}
                        footer={
                            <Typography className="font-normal text-blue-gray-600">
                                <strong className={footer.color}>{footer.value}</strong>
                                &nbsp;{footer.label}
                            </Typography>
                        }
                    />
                ))}
            </div>
            <div className="mb-6 grid grid-cols-1 gap-y-12 gap-x-6 md:grid-cols-2 xl:grid-cols-3">
                {statisticsChartsData.map((props) => (

                    <StatisticsChart
                        key={props.title}
                        {...props}
                        footer={
                            <Typography
                                variant="small"
                                className="flex items-center font-normal text-blue-gray-600"
                            >
                                <ClockIcon strokeWidth={2} className="h-4 w-4 text-blue-gray-400"/>
                                &nbsp;
                                {props.footer}
                                <a href="/dashboard/GarbageView" className="text-blue-500 hover:underline ml-auto">
                                    상세 페이지로 이동
                                </a>
                            </Typography>
                        }

                    />
                ))}
            </div>
            <KakaoMapMain setExportWasteValue={setExportWasteValue}/>
        </div>
    );
}

export default Home;
