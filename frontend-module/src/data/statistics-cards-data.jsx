import {BanknotesIcon, ChartBarIcon, UserPlusIcon, UsersIcon,} from "@heroicons/react/24/solid";
import getWasteStatisticsData from "@/data/get-waste-statistics-data.jsx";

const getWasteStaticData = async () =>{
  try{
    return await getWasteStatisticsData('2022', 'map');
  }catch(error){
    console.log(error);
  }
};

const wasteStaticData = await getWasteStaticData();

const sumWasteStaticData = (wasteStaticData) => {
  const result = {};

  console.log(wasteStaticData);

  // wasteStaticData.forEach(item => {
  //   const {wsteQty, value} = item;
  //
  //   result.value += value;
  //
  // })
  return wasteStaticData[0].WSTE_QTY;
}

const result = sumWasteStaticData(wasteStaticData);


export const statisticsCardsData = [
  {
    color: "gray",
    icon: BanknotesIcon,
    title: "Today's Money",
    value: "$53k",
    footer: {
      color: "text-green-500",
      value: "+55%",
      label: "than last week",
    },
  },
  {
    color: "gray",
    icon: UsersIcon,
    title: "Today's Users",
    value: "2,300",
    footer: {
      color: "text-green-500",
      value: "+3%",
      label: "than last month",
    },
  },
  {
    color: "gray",
    icon: UserPlusIcon,
    title: "New Clients",
    value: "3,462",
    footer: {
      color: "text-red-500",
      value: "-2%",
      label: "than yesterday",
    },
  },
  {
    color: "gray",
    icon: ChartBarIcon,
    title: "연간 쓰레기 발생량",
    value: result,
    footer: {
      color: "text-red-500",
      value: "+5%",
      label: "작년보다 늘었습니다.",
    },
  },
];

export default statisticsCardsData;
