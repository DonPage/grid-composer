import { test } from 'ava';

const GridComposer = require('../index');
const defaultConfig = require('../config.template.json');

test('GridComp uses default config if no config is passed into constructor.', (t) => {
  const config = new GridComposer().config;

  t.truthy(JSON.stringify(config) === JSON.stringify(defaultConfig));
});

test('GridComp uses user specified config if it\'s passed into the constructor', (t) => {
  const nodes = Math.floor(Math.random() * 99) + 1;
  const config = {
    port: 1234,
    maxNodes: nodes,
    token: 'stuff'
  };
  const userConfig = new GridComposer(config).config;

  t.falsy(JSON.stringify(userConfig) === JSON.stringify(defaultConfig));
});
