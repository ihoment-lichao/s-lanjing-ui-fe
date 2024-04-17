// 组件菜单
const componentMenu = {
  key: "/sljTable", //路由
  title: "组件", //标题
  icon: "menu-icon-board", //图标
  children: [
    {
      key: "/sljTable",
      title: "表格",
    },
    {
      key: "/sljSearch",
      title: "搜索栏",
    },
  ],
};

const menuList = [
  componentMenu,
];
export default menuList;
