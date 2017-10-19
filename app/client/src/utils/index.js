/**
 * 得到Object的value
 * @param {Object} obj
 * @returns {Array} 
 */
export const objectValues = function (obj) {
  let values = [];
  Object.keys(obj).forEach((item, index) => {
    values.push(obj[item]);
  })
  return values;
}
