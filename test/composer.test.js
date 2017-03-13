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

test('GridComp uses user specified config if it\'s passed into the constructor', (t) => {
  const nodes = ~~(Math.random() * 99) + 1;
  const config = {
    getsPublic: true,
    maxNodes: nodes,
    directory: '../'
  };
  const defaultConfig = new GridComposer().config;
  const userConfig = new GridComposer(config).config;

  t.falsy(JSON.stringify(userConfig) === JSON.stringify(defaultConfig));

});
