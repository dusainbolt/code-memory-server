export const removeBreakLine = (string: String): String => {
  return string.replace(/(\r\n|\n|\r)/gm, '').trim();
};

function isEmpty(obj) {
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) return false;
  }
  return true;
}

export const removeEmpty = (obj: Object) => {
  // ES6 Syntax
  let newObj = {};
  Object.keys(obj).forEach(prop => {
    if (obj[prop] && !isEmpty(obj[prop])) {
      newObj[prop] = obj[prop];
    }
  });
  return newObj;
};
