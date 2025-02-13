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
                name: "dashboard",
                path: "/home",
                element: <Home/>,
            },
            {
                icon: <TableCellsIcon {...icon} />,
                name: "GarbageView",
                path: "/GarbageView",
                element: <GarbageView/>,
            },
            {
                icon: <TableCellsIcon {...icon} />,
                name: "MapDetailView",
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
