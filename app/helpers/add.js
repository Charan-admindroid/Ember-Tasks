/* eslint-disable prettier/prettier */
import { helper } from '@ember/component/helper';

export default helper(function add([value,increment]) {
  return value+increment;
});
