import { HistoryField } from './../dto/seoHome/SeoHomeDTO';
import { QUERY_LIST } from './contant';
import { SortPaginate } from './type';
export class HelperService {
  removeBreakLine = (string: String): String => {
    return string.replace(/(\r\n|\n|\r)/gm, '').trim();
  };
  isEmpty = obj => {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) return false;
    }
    return true;
  };
  convertMongoObject = (mongoObj: any) => {
    return JSON.parse(JSON.stringify(mongoObj));
  };

  getDiffObject = (objectRoot: any, objectCompare: any) => {
    let result: HistoryField[] = [];
    const ignoreKey = ['_id', 'createBy', 'createdAt', 'updatedAt', 'history', 'reason'];
    // check object root = invalid
    if (!!!objectRoot) {
      return [];
    }
    for (const [key, value] of Object.entries(objectRoot)) {
      // ignore key
      if (ignoreKey.includes(key)) {
        continue;
      }
      // handle string field
      if (typeof value === 'string' || value === null) {
        // console.log(key, objectCompare[key]);
        value?.toString() !== objectCompare[key]?.toString() &&
          result.push({
            key,
            newValue: objectCompare[key],
            oldValue: value,
          });
      } else if (typeof value === 'object') {
        result = result.concat(this.getDiffObject(value, objectCompare[key]));
      }
    }

    return result;
  };
  removeEmpty = (obj: Object) => {
    // ES6 Syntax
    let newObj = {};
    Object.keys(obj).forEach(prop => {
      if (obj[prop] && !this.isEmpty(obj[prop])) {
        newObj[prop] = obj[prop];
      }
    });
    return newObj;
  };
  getParamsList = (params: any): SortPaginate => {
    const limit = params?.limit || QUERY_LIST.LIMIT;
    return {
      limit,
      offset: !!params?.offset ? params.offset * limit : QUERY_LIST.OFFSET,
      orderBy: params?.orderBy && params?.sortBy ? params?.orderBy : QUERY_LIST.ORDER_BY,
      sortBy: params?.sortBy || QUERY_LIST.DESC,
    };
  };
  convertToSlug = (title: string) => {
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

  mapFromArray<T>(array: T[], keyStrategy: (v: T) => string | number) {
    const map: Record<string | number, T | undefined> = {};

    for (const item of array) {
      map[keyStrategy(item)] = item;
    }

    return map;
  }
  removeDuplicateArr = (arr: any[]) => {
    return arr.reduce((unique, item) => {
      // console.log(
      //   typeof item,
      //   // a. Item
      //   item,
      //   // b. Final Array (Accumulator)
      //   unique,
      //   // c. Condition (Remember it only get pushed if this returns `false`)
      //   unique.indexOf(item),
      //   // d. Reducer Function Result
      //   unique.includes(item) ? unique : [...unique, item],
      // );

      return unique.includes(item) ? unique : [...unique, item];
    }, []); // 👈 The initial value of our Accumulator is an empty array
  };
  getDiffArrayWithObjArray = (conditionArray: any[], rootArray: any[], key: string = '') => {
    return conditionArray.filter(itemRoot =>
      rootArray.every(item => {
        return item[key]?.toString() !== itemRoot?.toString();
      })
    );
  };
}

export const helperService = new HelperService();
