import { module, test } from 'qunit';
import { setupTest } from 'practice/tests/helpers';

module('Unit | Service | student-data', function (hooks) {
  setupTest(hooks);

  // TODO: Replace this with your real tests.
  test('it exists', function (assert) {
    let service = this.owner.lookup('service:student-data');
    assert.ok(service);
  });
});
