import { module, test } from 'qunit';
import { setupTest } from 'practice/tests/helpers';

module('Unit | Route | game/typing', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    let route = this.owner.lookup('route:game/typing');
    assert.ok(route);
  });
});
