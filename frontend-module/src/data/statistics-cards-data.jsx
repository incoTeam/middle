import {BanknotesIcon, ChartBarIcon, UserPlusIcon, UsersIcon,} from "@heroicons/react/24/solid";

// const getWasteStaticsData = async () =>{
//   //22년 5개 시도 합 구하기
//   //21년 5개 시도 합 구하기
//   const data = await getWasteStaticsData('2022', 'map');
//   // const data2 = await getWasteStatisticsData('2021', 'map');
//
//   return data;
// }


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
    value: value,
    footer: {
      color: "text-red-500",
      value: "+5%",
      label: "작년보다 늘었습니다.",
    },
  },
];

export default statisticsCardsData;
