package org.insilicogen.backendmodule.trash.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.insilicogen.backendmodule.trash.domain.TrashStatsDomain;
import org.insilicogen.backendmodule.trash.domain.TrashStatsWords;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

@Service
public class TrashStatsServiceImpl implements TrashStatsService {

    String apiUrl = "https://www.recycling-info.or.kr/sds/JsonApi.do";

    @Override
    public ResponseEntity<?> getTrashStats(Map<String, String> params) {
        try {
            // RestTemplate을 사용하여 외부 API 호출
            RestTemplate restTemplate = new RestTemplate();
            UriComponentsBuilder uriBuilder = UriComponentsBuilder.fromHttpUrl(apiUrl)
                    .queryParam("PID", params.get("PID"))
                    .queryParam("YEAR", params.get("YEAR"))
                    .queryParam("USRID", params.get("USRID"))
                    .queryParam("KEY", params.get("KEY"));
            // API 요청 및 응답 수신
            ResponseEntity<String> response = restTemplate.getForEntity(uriBuilder.toUriString(), String.class);
            // Jackson ObjectMapper를 사용하여 JSON 응답을 List<TrashStatsDomain>으로 변환
            ObjectMapper mapper = new ObjectMapper();
            // JSON 문자열을 JsonNode로 파싱
            JsonNode rootNode = mapper.readTree(response.getBody());
            // "data" 부분만 추출
            JsonNode dataNode = rootNode.path("data"); // "data"를 찾음

            List<TrashStatsDomain> data = mapper.readValue(dataNode.toString(), new TypeReference<>() {});
            List<TrashStatsDomain> refinedData = refineData(data);

            return ResponseEntity.ok(refinedData); // 변환된 데이터 반환

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("API 호출 실패: " + e.getMessage());
        }
    }

    private List<TrashStatsDomain> refineData(List<TrashStatsDomain> data) {
        List<TrashStatsDomain> refinedData = new ArrayList<>();

        List<String> validCities = Arrays.asList(
                TrashStatsWords.SEOUL.getCodeName(),
                TrashStatsWords.DAEJEON.getCodeName(),
                TrashStatsWords.BUSAN.getCodeName(),
                TrashStatsWords.GANGWON.getCodeName(),
                TrashStatsWords.GWANGJU.getCodeName()
        );

        System.out.println(validCities);

        for(int i = 0; i < data.size(); i++) {
        //enum이나 상수값만 따로 뽑는 클래스만들기
            if (validCities.contains(data.get(i).getCityJidtCdNm()) &&
                    TrashStatsWords.VOLUMEBASED.getCodeName().equals(data.get(i).getWtTypeGbNm()) &&
                    TrashStatsWords.FLAMMABLE.getCodeName().equals(data.get(i).getWsteMCodeNm()) &&
                    TrashStatsWords.TOTAL.getCodeName().equals(data.get(i).getWsteCodeNm()))
            {
                refinedData.add(data.get(i));
            }
        }

        System.out.println(refinedData);

        return refinedData;
    }

}
