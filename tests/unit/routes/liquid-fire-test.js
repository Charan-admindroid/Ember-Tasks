import { module, test } from 'qunit';
import { setupTest } from 'practice/tests/helpers';

module('Unit | Route | liquid-fire', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    let route = this.owner.lookup('route:liquid-fire');
    assert.ok(route);
  });
});
