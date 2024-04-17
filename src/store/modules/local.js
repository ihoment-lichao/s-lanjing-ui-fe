const local = {
  namespaced: true,
  state: {
    ppcTypeList: [
      //广告类别
      { id: "sp", name: "SP" },
      { id: "sb", name: "SB" },
      { id: "sbv", name: "SBV" },
      { id: "sd", name: "SD" },
    ],
    applyTypeList: [
      //应用类型
      { id: "manual", name: "手动" },
      { id: "auto", name: "自动" },
    ],
    //英文国家站点类型
    countrySiteList: [
      { name: "US", id: "US" },
      { name: "CA", id: "CA" },
      { name: "DE", id: "DE" },
      { name: "UK", id: "UK" },
      { name: "FR", id: "FR" },
      { name: "IT", id: "IT" },
      { name: "ES", id: "ES" },
      { name: "MX", id: "MX" },
    ],
    // 广告活动类型
    campaignTypeList: [
      { id: "SP", name: "SP" },
      { id: "SB", name: "SB" },
      { id: "SD", name: "SD" },
    ],
    //广告活动状态类型
    activeStatus: [
      { id: "enabled", name: "已开启" },
      { id: "paused", name: "已暂停" },
      { id: "archived", name: "已归档" },
    ],
    //货币类型
    currencyList: [
      { id: "USD", name: "USD" },
      { id: "current", name: "原币种" },
    ],
    //匹配类型
    matchTypeList: [
      { id: "exact", name: "Exact" },
      { id: "phrase", name: "Phrase" },
      { id: "broad", name: "Broad" },
    ],
    //规则预算、竞价掉价类型
    adjustActionList: [
      {
        biddingType: 5,
        name: "将竞价调整到",
        id: 7,
      },
      {
        biddingType: 3,
        name: "按照百分比提高竞价",
        id: 8,
      },
      {
        biddingType: 4,
        name: "按照百分比调低竞价",
        id: 10,
      },
      {
        biddingType: 3,
        name: "按照固定金额提高竞价",
        id: 9,
      },
      {
        biddingType: 4,
        name: "按照固定金额降低竞价",
        id: 11,
      },
      {
        budgetType: 5,
        name: "将预算调整到",
        id: 2,
      },
      {
        budgetType: 3,
        name: "按照百分比提高预算",
        id: 3,
      },
      {
        budgetType: 4,
        name: "按照百分比调低预算",
        id: 5,
      },
      {
        budgetType: 3,
        name: "按照固定金额提高预算",
        id: 4,
      },
      {
        budgetType: 4,
        name: "按照固定金额降低预算",
        id: 6,
      },
    ],
  },
  mutations: {},
  actions: {},
};

export default local;
