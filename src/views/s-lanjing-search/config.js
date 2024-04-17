function setSelectData(size) {
  let selectData = [];
  let tempArr = new Array(size || 0).fill("");
  tempArr.forEach((item, index) => {
    let id = index + 1;
    selectData.push({
      id: id,
      name: "option" + id,
    });
  });
  return selectData;
}

export const searchList = [
  {
    type: "SELECT",
    name: "state",
    data: setSelectData(3),
    placeholder: "单选",
  },
  {
    type: "SELECT",
    name: "states",
    multiple: true, //多选
    data: setSelectData(5),
    placeholder: "多选",
  },
  {
    type: "DATERANGE",
    name: "dateRange",
  },
  {
    type: "INPUT",
    name: "name",
    width: 150, //默认120
    placeholder: "输入名称",
  },
];
