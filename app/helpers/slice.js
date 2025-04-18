import { helper } from '@ember/component/helper';

export default helper(function slice([array, value1, value2]) {
  if (!Array.isArray(array)) {
    return [];
  }
  return array.slice(value1, value2);
});
