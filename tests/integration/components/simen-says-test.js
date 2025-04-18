import { module, test } from 'qunit';
import { setupRenderingTest } from 'practice/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | simen-says', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`<SimenSays />`);

    assert.dom().hasText('');

    // Template block usage:
    await render(hbs`
      <SimenSays>
        template block text
      </SimenSays>
    `);

    assert.dom().hasText('template block text');
  });
});
