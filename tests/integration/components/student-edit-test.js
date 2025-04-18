import { module, test } from 'qunit';
import { setupRenderingTest } from 'practice/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | student-edit', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`<StudentEdit />`);

    assert.dom().hasText('');

    // Template block usage:
    await render(hbs`
      <StudentEdit>
        template block text
      </StudentEdit>
    `);

    assert.dom().hasText('template block text');
  });
});
