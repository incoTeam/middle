import {HomeIcon, TableCellsIcon,} from "@heroicons/react/24/solid";
import {GarbageView, Home} from "@/pages/dashboard";
import {MapDetail} from "@/widgets/map/index.js";

const icon = {
    className: "w-5 h-5 text-inherit",
};

export const routes = [
    {
        layout: "dashboard",
        pages: [
            {
                icon: <HomeIcon {...icon} />,
                name: "메인 페이지",
                path: "/home",
                element: <Home/>,
            },
            {
                icon: <TableCellsIcon {...icon} />,
                name: "생활폐기물 데이터 상세",
                path: "/GarbageView",
                element: <GarbageView/>,
            },
            {
                icon: <TableCellsIcon {...icon} />,
                name: "전국 쓰레기 배출량 상세",
                path: "/MapDetailView",
                element: <MapDetail/>,
            },
        ],
    },
    // {
    //     title: "auth pages",
    //     layout: "auth",
    //     pages: [
    //         {
    //             icon: <ServerStackIcon {...icon} />,
    //             name: "sign in",
    //             path: "/sign-in",
    //             element: <SignIn/>,
    //         },
    //         {
    //             icon: <RectangleStackIcon {...icon} />,
    //             name: "sign up",
    //             path: "/sign-up",
    //             element: <SignUp/>,
    //         },
    //     ],
    // },
];

export default routes;
