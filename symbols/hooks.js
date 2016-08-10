import test from 'ava';

test('Iterator', t => {
  const iterator = Symbol.iterator;

  class SymbolCollection {
    *[iterator]() {
      let symbolKeys = Object.getOwnPropertySymbols(this);
      let i = 0;

      while (this[symbolKeys[i]] !== undefined) {
        yield this[symbolKeys[i]];
        ++i;
      }
    }
  }

  let symbols = new SymbolCollection();

  symbols[Symbol('foo')] = 'bar';
  symbols[Symbol('baz')] = 'boo';

  let getsRun = false;

  for (let symbolItem of symbols) {
    getsRun = true;
  }

  t.true(getsRun);
});
