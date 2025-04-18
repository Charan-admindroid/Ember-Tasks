import { module, test } from 'qunit';
import { setupRenderingTest } from 'practice/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | liquid-fire', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`<LiquidFire />`);

    assert.dom().hasText('');

    // Template block usage:
    await render(hbs`
      <LiquidFire>
        template block text
      </LiquidFire>
    `);

    assert.dom().hasText('template block text');
  });
});
