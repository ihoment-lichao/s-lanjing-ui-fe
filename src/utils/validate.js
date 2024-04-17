import { values } from "lodash";

/**
 * 字符串是否为空，去除字符串两端的空格
 */
export function isEmpty(value) {
  if (value === undefined || value === "") {
    return true;
  }
  return false;
}

/**
 * 合法邮箱
 */
export function validateEmail(value) {
  const reg =
    /^([a-zA-Z0-9+_.-])+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)*\.[a-zA-Z0-9]{2,6}$/;
  return reg.test(value);
}

/**
 * 合法邮箱
 */
export function validateCellphone(value) {
  const reg =
    /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;
  return reg.test(value);
}

/**
 *  数组是否存在重复元素
 */
export function isRepeatArr(arr) {
  var hash = {};
  for (var i in arr) {
    if (hash[arr[i]]) {
      return true;
    }
    hash[arr[i]] = true;
  }
  return false;
}

/** 下面是匹配 el-form rule 规则的验证 */

/**
 * 验证密码是否符合规则
 */
export function validatePassword(rule, value, callback) {
  if (!value) {
    callback(new Error("请输入密码"));
  } else {
    if (!/^.{6,20}$/.test(value)) {
      callback(new Error("6-20位，区分大小写，使用字母、数字、特殊字符"));
    } else {
      callback();
    }
  }
}

/**
 * 验证账号名是否合法
 */
export function validateUsername(rule, value, callback) {
  if (!value) {
    callback(new Error("请输入账号名"));
  } else {
    if (!/^[0-9a-zA-Z_]{6,20}$/.test(value)) {
      callback(new Error("6-20位，不区分大小写，使用字母、数字、_"));
    } else {
      callback();
    }
  }
}

/**
 * 验证手机号是否符合规则
 */
export function validatePhone(rule, value, callback) {
  if (!value) {
    callback(new Error("请输入手机号码"));
  } else {
    if (
      !/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/.test(
        value
      )
    ) {
      callback(new Error("手机号码不合法"));
    } else {
      callback();
    }
  }
}

// 验证邮编或电话号码，匹配数字和符号-、空格
export function validateNumber(rule, value, callback) {
  if (value) {
    if (!/^[0-9\-, ]+$/.test(value)) {
      callback(new Error("格式不规范"));
    } else {
      callback();
    }
  } else {
    callback();
  }
}

/**
 * 验证邮箱是否符合规则
 */
export function validateEmail2(rule, value, callback) {
  if (!value) {
    callback(new Error("请输入邮箱"));
  } else if (
    !/^([a-zA-Z0-9_.-])+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)*\.[a-zA-Z0-9]{2,6}$/.test(
      value
    )
  ) {
    callback(new Error("邮箱格式不正确"));
  } else {
    callback();
  }
}

/**
 * 验证邮箱是否符合规则 - 非必填
 */
export function validateEmail3(rule, value, callback) {
  if (value) {
    if (
      !/^([a-zA-Z0-9_.-])+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)*\.[a-zA-Z0-9]{2,6}$/.test(
        value
      )
    ) {
      callback(new Error("邮箱格式不正确"));
    } else {
      callback();
    }
  } else {
    callback();
  }
}

// 不能输入汉字
export function validateHanzi(rule, value, callback) {
  if (value) {
    if (/[\u4E00-\u9FA5]/g.test(value)) {
      callback(new Error("不能输入汉字！"));
    } else {
      callback();
    }
  } else {
    callback();
  }
}

/**
 * 验证正整数
 */
export function validateInt(num) {
  var regu = /^[1-9]\d*$/;
  if (regu.test(num)) {
    return true;
  }
  return false;
}

/**
 * 验证正自然数正数
 */
export function validateNatureInt(num) {
  var regu = /^\d+(?=\.{0,1}\d+$|$)/;
  if (regu.test(num)) {
    return true;
  }
  return false;
}
/**
 * 验证字母数字下划线
 */
export function validateName(num) {
  var regu = /^[a-zA-Z0-9_\u4e00-\u9fa5]+$/;
  if (regu.test(num)) {
    return true;
  }
  return false;
}

/**
 * 验证浮点数
 * @num 要验证的数字
 * @decimals 要保留的小数位数
 */
export function validateDecimal(num, decimals) {
  var decimal = decimals || 2;
  var str = "(^\\d+(\\.\\d{1," + decimal + "})?)$";
  var reg = new RegExp(str);
  if (reg.test(num)) {
    return true;
  } else {
    return false;
  }
}

/**
 * 校验url格式
 */
export function validateUrl(value) {
  const reg =
    /^(https?|ftp|file):\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]$/;
  return reg.test(value);
}

// 同时校验多个form
export function validateForms(formRefs) {
  let objectList = [];
  let results = formRefs.map(
    (formRef) =>
      new Promise((resolve, reject) => {
        formRef.validate((valid, object) => {
          if (valid) {
            resolve();
          } else {
            objectList.push(object);
            reject();
          }
        });
      })
  );
  return Promise.all(results).catch(() => {
    return Promise.reject(objectList);
  });
}

//校验亚马逊ASIN
export function validateAmzAsin(asin) {
  if (asin.length === 0 || asin === null) {
    return false;
  } else {
    // let asinRuleReg = /[A-Z].*[0-9]|[0-9].*[A-Z]+$/
    let asinRuleReg = /^[A-ZZ-Z0-9]+$/;
    if (
      asin.indexOf("B") != 0 ||
      asin.indexOf(" ") > 0 ||
      asin.length != 10 ||
      !asinRuleReg.test(asin)
    ) {
      return false;
    } else {
      return true;
    }
  }
}
