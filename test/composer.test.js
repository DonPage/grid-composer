/* eslint max-len: 0 */  // --> OFF
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
    token: 'stuff',
  };
  const userConfig = new GridComposer(config).config;

  t.falsy(JSON.stringify(userConfig) === JSON.stringify(defaultConfig));
});

test('confirmToken returns false if it doesn\'t match config token', async (t) => {
  const grid = new GridComposer({ token: 'avajs' });
  const confirmed = await grid.confirmToken('notTheRightToken');
  t.falsy(confirmed);
});

test('confirmToken returns true if it matches config token', async (t) => {
  const token = 'correctToken';
  const grid = new GridComposer({ token });
  const confirmed = await grid.confirmToken(token);
  t.truthy(confirmed);
});

test('confirmToken returns true if user doesn\'t pass token in config', async (t) => {
  const grid = new GridComposer();
  const confirmed = await grid.confirmToken('this should pass anyway');
  t.truthy(confirmed);
});

test('if getTokenFromReq returns false but user HAS config token; ' +
  'confirmToken should return false', async (t) => {
  const grid = new GridComposer({ token: 'configToken' });
  const getTokenFromReq = false;
  const confirmed = await grid.confirmToken(getTokenFromReq);
  t.falsy(confirmed);
});

test('confirmScaleParams returns TRUE if VALID params are passed in', (t) => {
  const grid = new GridComposer();
  t.true(grid.confirmScaleParams('chrome', 5));
  t.true(grid.confirmScaleParams('chrome', '5'));
});

test('confirmScaleParams returns FALSE if INVALID params are passed in', (t) => {
  const grid = new GridComposer();
  t.false(grid.confirmScaleParams(5));
  t.false(grid.confirmScaleParams('5'));
  t.false(grid.confirmScaleParams('chrome'));
  // TIL not to use typeof Number('5A') === 'number'
  t.false(grid.confirmScaleParams('chrome', '5a'));
  t.false(grid.confirmScaleParams('chrome', 'hey'));
});

test('confirmScaleParams returns FALSE number of nodes is over maxNode amount', (t) => {
  const grid = new GridComposer({ maxNodes: 5 });
  t.false(grid.confirmScaleParams('chrome', 6));
});
