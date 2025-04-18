import { module, test } from 'qunit';
import { setupRenderingTest } from 'practice/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | random-game', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`<RandomGame />`);

    assert.dom().hasText('');

    // Template block usage:
    await render(hbs`
      <RandomGame>
        template block text
      </RandomGame>
    `);

    assert.dom().hasText('template block text');
  });
});
