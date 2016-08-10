import test from 'ava';

test('Symbols basics', t => {
  t.true(!!Symbol(), 'Symbols exist');
  t.is(typeof Symbol(), 'symbol');
  t.is(Symbol('my symbol').toString(), 'Symbol(my symbol)');
});

test('Symbol comparison', t => {
  let testString = 'test';
  let mySymbol = Symbol(testString);

  t.is(mySymbol, mySymbol, 'Symbol equals to itself');
  t.not(mySymbol, Symbol(testString));
  t.is(mySymbol.toString(), `Symbol(${testString})`);
});

