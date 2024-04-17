import { ElMessage, ElMessageBox } from "element-plus";

export function commonMessageBox(params) {
  let defOpt = {
    "button-size": "small",
  };
  let paramsOpt = Object.assign(defOpt, params.options);
  var options = Object.assign({ dangerouslyUseHTMLString: true }, paramsOpt);
  return ElMessageBox.confirm(
    `<div class="confirm-content">
      <i class="${params.popupClass}"></i>
        <div class="message">
          <p class="text">${params.message}</p>
        </div>
    </div>`,
    params.title || "提示",
    options
  );
}

export function paramsToObj(message, title, options) {
  var payload = {};
  if (message) {
    payload["message"] = message;
  }
  if (title && typeof title === "string") {
    payload["title"] = title;
  }
  if (title && typeof title === "object") {
    payload["title"] = "";
    payload["options"] = title;
  }
  if (options) {
    payload["options"] = options;
  }
  return payload;
}

export function deleteMessageBox(message, title, options) {
  var payload = {};
  payload = paramsToObj(message, title, options);
  payload = Object.assign({}, payload, {
    popupClass: "popup-icon popup-delete-icon",
  });
  return commonMessageBox(payload);
}

export function additionMessageBox(message, title, options) {
  var payload = {};
  payload = paramsToObj(message, title, options);
  payload = Object.assign({}, payload, {
    popupClass: "popup-icon popup-add-icon",
  });
  return commonMessageBox(payload);
}
