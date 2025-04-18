import { module, test } from 'qunit';
import { setupTest } from 'practice/tests/helpers';

module('Unit | Route | student/index', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    let route = this.owner.lookup('route:student/index');
    assert.ok(route);
  });
});
