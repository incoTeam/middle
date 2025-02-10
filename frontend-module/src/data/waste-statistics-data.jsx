import {useEffect} from "react";
import axios from "axios";


export function WasteStatisticsData(){
//    <script type="text/javascript" src="http://www.recycling-info.or.kr/sds/JsonApi.do?PID=NTN004&YEAR=2023&USRID=jhhong3527&KEY=%VITE_WASTE_APIKEY%"></script>

    const dataParams={
        PID : 'NTN004',
        YEAR : '2022',
        USRID : import.meta.env.VITE_WASTE_USRID,
        KEY : import.meta.env.VITE_WASTE_APIKEY
    };
    console.log(dataParams);
    useEffect(() => {

        const getData = async () => {
            try{
                const response = await axios.get('http://localhost:8080/wasteStats', {params : dataParams});
                console.log(response.data);




            }catch(error){
                console.log(error);
            }
        }
        getData();

    }, []);
}

export default WasteStatisticsData;