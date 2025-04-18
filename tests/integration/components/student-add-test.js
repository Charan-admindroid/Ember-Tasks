import { module, test } from 'qunit';
import { setupRenderingTest } from 'practice/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | student-add', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`<StudentAdd />`);

    assert.dom().hasText('');

    // Template block usage:
    await render(hbs`
      <StudentAdd>
        template block text
      </StudentAdd>
    `);

    assert.dom().hasText('template block text');
  });
});
