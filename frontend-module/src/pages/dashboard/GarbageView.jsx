import {
    Card,
    CardHeader,
    CardBody,
    Typography,
} from "@material-tailwind/react";
import fetchDataOut from "@/data/dashboard-axios.jsx";

const wasteService = async () => {
    try {
        return await fetchDataOut.wasteData();
    } catch (error) {
        console.log(error);
    }
};
const wasteData = await wasteService();

export function GarbageView() {
    return (
        <div className="mt-12 mb-8 flex flex-col gap-12">
            <Card>
                <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
                    <Typography variant="h6" color="white">
                        쓰레기 처리 데이터
                    </Typography>
                </CardHeader>
                <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
                    <table className="w-full min-w-[640px] table-auto">
                        <thead>
                        <tr>
                            {["날짜", "처리 방식", "회사 구분", "쓰레기 종류", "차량 대수", "처리 중량 (kg)"].map((el) => (
                                <th
                                    key={el}
                                    className="border-b border-blue-gray-50 py-3 px-5 text-left"
                                >
                                    <Typography
                                        variant="small"
                                        className="text-[11px] font-bold uppercase text-blue-gray-400"
                                    >
                                        {el}
                                    </Typography>
                                </th>
                            ))}
                        </tr>
                        </thead>
                        <tbody>
                        {wasteData.map(({
                                            measuringDay,
                                            refuseType,
                                            companyType,
                                            refuseName,
                                            cars,
                                            refuseWeight
                                        }, key) => {
                            const className = `py-3 px-5 ${key === wasteData.length - 1 ? "" : "border-b border-blue-gray-50"}`;

                            return (
                                <tr key={measuringDay}>
                                    <td className={className}>
                                        <Typography
                                            variant="small"
                                            className="text-xs font-semibold text-blue-gray-600"
                                        >
                                            {measuringDay}
                                        </Typography>
                                    </td>
                                    <td className={className}>
                                        <Typography
                                            variant="small"
                                            className="text-xs font-semibold text-blue-gray-600"
                                        >
                                            {refuseType}
                                        </Typography>
                                    </td>
                                    <td className={className}>
                                        <Typography
                                            variant="small"
                                            className="text-xs font-semibold text-blue-gray-600"
                                        >
                                            {companyType}
                                        </Typography>
                                    </td>
                                    <td className={className}>
                                        <Typography
                                            variant="small"
                                            className="text-xs font-semibold text-blue-gray-600"
                                        >
                                            {refuseName}
                                        </Typography>
                                    </td>
                                    <td className={className}>
                                        <Typography
                                            variant="small"
                                            className="text-xs font-semibold text-blue-gray-600"
                                        >
                                            {cars}
                                        </Typography>
                                    </td>
                                    <td className={className}>
                                        <Typography
                                            variant="small"
                                            className="text-xs font-semibold text-blue-gray-600"
                                        >
                                            {refuseWeight}
                                        </Typography>
                                    </td>
                                </tr>
                            );
                        })}
                        </tbody>
                    </table>
                </CardBody>
            </Card>
        </div>
    );
}

export default GarbageView;
