package org.insilicogen.backendmodule.trash.controller;

import org.insilicogen.backendmodule.trash.service.TrashStatsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;
import java.util.Map;

@Controller
public class TrashController {

    @Autowired
    TrashStatsService trashStatsService;

    @ResponseBody
    @GetMapping("/wasteStats")
    @CrossOrigin(origins = "http://localhost:5173")
    public ResponseEntity<?> getTrashStats(@RequestParam Map<String, String> params) {
        ResponseEntity<?> responseEntity = trashStatsService.getTrashStats(params);

        if (responseEntity.getBody() instanceof List) {
            return ResponseEntity.ok(responseEntity.getBody());
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("잘못된 응답 형식입니다.");
        }
    }

}
