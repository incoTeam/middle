export const chartsConfig = {
  chart: {
    toolbar: {
      show: true,
    },
  },
  title: {
    show: "",
  },
  dataLabels: {
    enabled: false,
  },
  xaxis: {
    axisTicks: {
      show: false,
    },
    axisBorder: {
      show: false,
    },
    labels: {
      style: {
        colors: "#37474f",
        fontSize: "13px",
        fontFamily: "inherit",
        fontWeight: 300,

      },
    },
  },
  yaxis: {
    labels: {

      style: {
        colors: "#37474f",
        fontSize: "13px",
        fontFamily: "inherit",
        fontWeight: 300,
      },
      formatter: function (value) {
        return `${value.toLocaleString()} kg`; // Y축 값에 "톤"을 추가
      },
    },
  },
  grid: {
    show: true,
    borderColor: "#dddddd",
    strokeDashArray: 5,
    xaxis: {
      lines: {
        show: true,
      },
    },
    padding: {
      top: 5,
      right: 20,
    },
  },
  fill: {
    opacity: 0.8,
  },
  tooltip: {
    theme: "dark",
    y: {
      formatter: function (value) {
        return `${value}`;
      },
    },
  },
};

export default chartsConfig;
