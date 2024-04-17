function initTableData(size) {
  let objItem = {
    id: 0,
    fixed: "fixed",
    custom: 2,
    thousandths: 1234,
    ratio: 0.1,
    ellipsis: "0123456789",
  };
  let tableData = [];
  let tempArr = new Array(size || 0).fill("");
  tempArr.forEach((item, index) => {
    let tempItem = Object.assign({}, objItem);
    tempItem.id = index;
    tempItem.fixed = tempItem.fixed + index;
    tableData.push(tempItem);
  });
  return tableData;
}

export const tableData = initTableData(10);

export const tablecolumn = [
  {
    prop: "fixed",
    label: "固定列",
    width: 100,
    fixed: "left",
  },
  {
    prop: "id",
    label: "排序列",
    width: 100,
    customFlag: true,
    sortBy: "id",
  },
  {
    prop: "custom",
    label: "自定义列",
    slotName: "custom",
    width: 80,
  },
  {
    prop: "thousandths",
    label: "千分符",
    width: 100,
    formart: "thousandths",
  },
  {
    prop: "ratio",
    label: "百分数",
    width: 100,
    formart: "ratio",
  },
  {
    prop: "ellipsis",
    label: "省略行",
    width: 60,
    formart: "ellipsis",
  },
];
