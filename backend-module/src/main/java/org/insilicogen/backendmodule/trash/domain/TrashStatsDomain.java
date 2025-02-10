package org.insilicogen.backendmodule.trash.domain;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class TrashStatsDomain {

    @JsonProperty("CITY_JIDT_CD_NM")
    private String cityJidtCdNm;

    @JsonProperty("WT_TYPE_GB_NM")
    private String wtTypeGbNm;

    @JsonProperty("WSTE_M_CODE_NM")
    private String wsteMCodeNm;

    @JsonProperty("WSTE_CODE_NM")
    private String wsteCodeNm;

    @JsonProperty("WSTE_QTY")
    private double wsteQty;

    @JsonProperty("TOT_RECY_QTY")
    private double totRecyQty;

    @JsonProperty("TOT_INCI_QTY")
    private double totInciQty;

    @JsonProperty("TOT_FILL_QTY")
    private double totFillQty;

    @JsonProperty("TOT_ETC_QTY")
    private double totEtcQty;

    @JsonProperty("PUB_RECY_QTY")
    private double pubRecyQty;

    @JsonProperty("PUB_INCI_QTY")
    private double pubInciQty;

    @JsonProperty("PUB_FILL_QTY")
    private double pubFillQty;

    @JsonProperty("PUB_ETC_QTY")
    private double pubEtcQty;

    @JsonProperty("SELF_RECY_QTY")
    private double selfRecyQty;

    @JsonProperty("SELF_INCI_QTY")
    private double selfInciQty;

    @JsonProperty("SELF_FILL_QTY")
    private double selfFillQty;

    @JsonProperty("SELF_ETC_QTY")
    private double selfEtcQty;

    @JsonProperty("COM_RECY_QTY")
    private double comRecyQty;

    @JsonProperty("COM_INCI_QTY")
    private double comInciQty;

    @JsonProperty("COM_FILL_QTY")
    private double comFillQty;

    @JsonProperty("COM_ETC_QTY")
    private double comEtcQty;
}
