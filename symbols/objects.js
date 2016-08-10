import test from 'ava';

test('Symbol objects', t => {
  let testObj = {};
  let propSymbol = Symbol('prop');
  let clashingSymbol = Symbol('prop');

  testObj[propSymbol] = 'prop symbol';
  testObj[clashingSymbol] = 'clashing symbol';

  t.not(propSymbol, clashingSymbol);
  t.not(testObj[propSymbol], testObj[clashingSymbol]);

  t.is(propSymbol.toString(), clashingSymbol.toString());

  t.is(testObj[propSymbol], 'prop symbol');
  t.is(testObj[clashingSymbol], 'clashing symbol');

  testObj[propSymbol] = 'clashing symbol';

  t.is(testObj[propSymbol], testObj[clashingSymbol]);
});

test('Symbol lookup in objects', t => {
  let testSymbol = Symbol('test');
  var testObj = {};

  testObj['foo'] = 'foo oo';
  testObj[testSymbol] = 'not foo';

  t.is(Object.keys(testObj).indexOf('foo'), 0);
  t.is(Object.keys(testObj).indexOf(testSymbol), -1);
  t.is(Object.getOwnPropertyNames(testObj).indexOf('foo'), 0);
  t.is(Object.getOwnPropertyNames(testObj).indexOf(testSymbol), -1);
  t.is(Object.getOwnPropertySymbols(testObj).indexOf(testSymbol), 0);
});

test('Symbol copy', t => {
  let testObj = {};
  let testSymbol = Symbol('test');

  testObj[testSymbol] = 'foo';

  let copyObj = Object.assign({}, testObj);

  t.is(Object.getOwnPropertySymbols(testObj).indexOf(testSymbol), 0);
  t.is(Object.getOwnPropertySymbols(copyObj).indexOf(testSymbol), 0);
});
