import test from 'ava';

test('Symbol for / global symbols', t => {
  let globalSymbol = Symbol.for('global');
  let redefinedSymbol = Symbol.for('global');
  let localSymbol = Symbol('global');

  t.is(globalSymbol.toString(), 'Symbol(global)');
  t.is(globalSymbol, redefinedSymbol);
  t.not(globalSymbol, localSymbol);
});

test('Symbol check scope', t => {
  let globalSymbol = Symbol.for('global');
  let localSymbol = Symbol('global');

  t.is(Symbol.keyFor(globalSymbol), 'global');
  t.is(Symbol.keyFor(localSymbol), undefined);
});
