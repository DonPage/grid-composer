import { test } from 'ava';
const GridComposer = require('../index');

test('GridComp uses default config if no config is passed into constructor.', (t) => {
  const config = new GridComposer().config;
  const defaultConfig = {
    getsPublic: false,
    directory: './',
    maxNodes: 20
  };

  t.truthy(JSON.stringify(config) === JSON.stringify(defaultConfig));

});
