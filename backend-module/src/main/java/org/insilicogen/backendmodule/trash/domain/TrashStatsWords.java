package org.insilicogen.backendmodule.trash.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum TrashStatsWords {
    SEOUL("서울"),
    DAEJEON("대전"),
    BUSAN("부산"),
    GANGWON("강원"),
    GWANGJU("광주"),
    VOLUMEBASED("종량제방식 등 혼합배출"),
    FLAMMABLE("가연성"),
    TOTAL("소계");

    private final String codeName;

}
