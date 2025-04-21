import { helper } from '@ember/component/helper';

export default helper(function includes([str, array]) {
  if (!Array.isArray(array)) {
    return [];
  }
  return array.includes(str);
});
