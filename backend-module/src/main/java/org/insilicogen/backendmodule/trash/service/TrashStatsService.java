package org.insilicogen.backendmodule.trash.service;


import org.springframework.http.ResponseEntity;

import java.util.Map;

public interface TrashStatsService {

    ResponseEntity<?> getTrashStats(Map<String, String> params);

}
