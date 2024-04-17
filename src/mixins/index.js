import store from "@/store/index.js";

const baseMixin = {
  data() {
    return {
      elIcon: {
        //全局icon设置
        size: 18,
        color: "#1890ff",
      },
      echartColors: [
        "#3375F5",
        "#00DF04",
        "#FF7C20",
        "#00FFE0",
        "#FFD539",
        "#FB7193",
        "#3375F5",
        "#00DF04",
        "#FF7C20",
      ],
    };
  },
  methods: {
    // 公用页面按钮权限表达式
    validateButtonPermission(pattern) {
      return store.state.permission.buttonPatternList.indexOf(pattern) !== -1;
    },
    //自定义表格合计行类名回调
    customTableSumRowClass({ row, rowIndex }) {
      if (rowIndex === 0) {
        return "table-summary-row";
      }
    },
    //根据星级数设置类名
    setClassByStarLevel(star) {
      let starClass = "row-star-1";
      if ((star > 0 && star < 3.8) || !star) {
        starClass = "star-level-1";
      }
      if (star >= 3.8 && star < 4.5) {
        starClass = "star-level-2";
      }
      if (star >= 4.5) {
        starClass = "star-level-3";
      }
      return starClass;
    },
    //千分符
    NumFormatInPart(value) {
      var intPart = Number(value);
      var intPartFormat = intPart
        .toString()
        .replace(/(\d)(?=(?:\d{3})+$)/g, "$1,");
      return intPartFormat;
    },
    //整数千分符
    NumFormatInt(value) {
      var intPart = Number(value).toFixed(0);
      var intPartFormat = intPart
        .toString()
        .replace(/(\d)(?=(?:\d{3})+$)/g, "$1,");
      return intPartFormat;
    },
    //浮点千分符
    NumFormatFloat(value) {
      if (isNaN(value)) {
        return "";
      }
      var intPart = (Math.round(value * 100) / 100).toFixed(2);
      var intPartArray = intPart.toString().split(".");
      var intPartIntPart = intPartArray[0];
      var intPartString = intPartIntPart.replace(/(\d)(?=(?:\d{3})+$)/g, "$1,");
      if (intPartArray.length > 1) {
        intPartString = intPartString + "." + intPartArray[1];
      }
      return intPartString;
    },
    validateDateRange(dateRange, maxRange) {
      if (!dateRange || dateRange.length === 0) {
        return false;
      }
      let startTime = new Date(dateRange[0]);
      let endTime = new Date(dateRange[1]);
      let rangDay =
        parseInt(Math.abs(endTime - startTime) / 1000 / 60 / 60 / 24) + 1;
      if (rangDay > maxRange) {
        this.$message.warning({
          message: "最大时间间隔不能超过" + maxRange + "天",
        });
        return true;
      }
    },
    newUuid(prefix = "") {
      var s = [];
      var hexDigits = "0123456789abcdef";
      for (var i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
      }
      s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
      s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
      s[8] = s[13] = s[18] = s[23] = "-";
      var uuid = s.join("");
      return prefix + uuid;
    },
  },
};

export default baseMixin;
