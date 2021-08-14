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

export const convertToSlug = (title: string) => {
  title = title.toLowerCase(); //Đổi ký tự có dấu thành không dấu
  title = title.replace(/á|à|ả|ạ|ã|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/gi, 'a');
  title = title.replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/gi, 'e');
  title = title.replace(/i|í|ì|ỉ|ĩ|ị/gi, 'i');
  title = title.replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/gi, 'o');
  title = title.replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/gi, 'u');
  title = title.replace(/ý|ỳ|ỷ|ỹ|ỵ/gi, 'y');
  title = title.replace(/đ/gi, 'd'); //Xóa các ký tự đặt biệt
  title = title.replace(/\`|\~|\!|\@|\#|\||\$|\%|\^|\&|\*|\(|\)|\+|\=|\,|\.|\/|\?|\>|\<|\'|\"|\:|\;|_/gi, ''); //Đổi khoảng trắng thành ký tự gạch ngang
  title = title.replace(/ /gi, '-'); //Đổi nhiều ký tự gạch ngang liên tiếp thành 1 ký tự gạch ngang //Phòng trường hợp người nhập vào quá nhiều ký tự trắng
  title = title.replace(/\-\-\-\-\-/gi, '-');
  title = title.replace(/\-\-\-\-/gi, '-');
  title = title.replace(/\-\-\-/gi, '-');
  title = title.replace(/\-\-/gi, '-'); //Xóa các ký tự gạch ngang ở đầu và cuối
  title = '@' + title + '@';
  return title.replace(/\@\-|\-\@|\@/gi, '');
};
