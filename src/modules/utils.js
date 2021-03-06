function isFunction(func) {
  return (
    typeof func === "function" ||
    Object.prototype.toString.call(func) === "[object Function]"
  );
}

// export function matchesSelectorToParentElements(el, selector, baseNode) {
//   let node = el;

//   const matchesSelectorFunc = [
//     "matches",
//     "webkitMatchesSelector",
//     "mozMatchesSelector",
//     "msMatchesSelector",
//     "oMatchesSelector"
//   ].find(func => isFunction(node[func]));

//   if (!isFunction(node[matchesSelectorFunc])) return false;

//   do {
//     if (node[matchesSelectorFunc](selector)) return true;
//     if (node === baseNode) return false;
//     node = node.parentNode;
//   } while (node);

//   return false;
// }
// Api地址
export function getAPIBaseURL() {
  return process.env.BASE_URL;
}
// 上传接口的地址
export function getUploadURL() {
  // 根据实际填写上传文件地址
  return `${process.env.BASE_URL}/upload`;
}
// 登录页面的地址
export function getLoginURL() {
  return "/login";
}
