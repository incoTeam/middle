import {useEffect} from "react";
import axios from "axios";

export const WasteStatisticsData = async () => {
    const dataParams={
        PID : 'NTN004',
        YEAR : '2022',
        USRID : import.meta.env.VITE_WASTE_USRID,
        KEY : import.meta.env.VITE_WASTE_APIKEY
    };

    try{
        const response = await axios.get('http://localhost:8080/wasteStats', {params : dataParams});
        console.log("wasteStatics", response.data);
        return response.data;
    }catch(error){
        console.log(error);
    }
}

export default WasteStatisticsData;