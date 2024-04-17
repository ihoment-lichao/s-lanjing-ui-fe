/*
 * @Author: lichao
 * @Date: 2022-08-02 14:12:50
 * @FilePath: /S-yundeng-bi-fe/packages/ads/src/utils/propsType.js
 * @Description:
 */
export const PropsType = {
  // ArrayOrNull:{
  //   type: [Array,Number],
  //   default: 0
  // },
  Array: {
    type: Array,
    default: () => [],
  },
  Object: {
    type: Object,
    default: () => ({}),
  },
  Boolean: {
    type: Boolean,
    default: false,
  },
  BooleanTrue: {
    type: [Boolean, String],
    default: true,
  },
  String: {
    type: String,
    default: "",
  },
  Number: {
    type: [Number, String],
    default: 0,
  },
  Function: Function,
  FunSring: {
    type: [String, Function],
    default: "",
  },
  Promise: Promise,
};
