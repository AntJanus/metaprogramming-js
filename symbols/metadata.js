import test from 'ava';

test('Unreachable class data', t => {
  let size = Symbol('size');

  class Collection {
    constructor() {
      this[size] = 0;
    }

    add(item) {
      this[this[size]] = item;
      this[size]++;
    }

    static sizeOf(instance) {
      return instance[size];
    }
  }

  let x = new Collection();

  t.is(Collection.sizeOf(x), 0);

  x.add('test');

  t.is(Collection.sizeOf(x), 1);
  t.deepEqual(Object.keys(x), ['0']);
  t.is(Object.getOwnPropertySymbols(x).indexOf(size), 0);
});

test('Dependency injection data Angular-style with global hook', t => {
  let injection = Symbol.for('inject');
  let getInject = Symbol('getInject');

  class Component {
    constructor() {

    }

    //private symbol to extract injection
    static [getInject](component) {
      return component[Symbol.for('inject')];
    }
  }

  class TestComponent extends Component {

    constructor(dependency1, dependency2) {
      super();

      this.dependency1 = dependency1;
      this.dependency2 = dependency2;
    }
  }

  //globally accessible injection key
  TestComponent[injection] = ['dependency1', 'dependency2'];

  t.deepEqual(Component[getInject](TestComponent), ['dependency1', 'dependency2']);
});

test('Symbols as a hook API', t => {
  let inspectSymbol = Symbol('inspect');

  class logger {
    static log(item) {
      if (typeof item[inspectSymbol] === 'function') {
        return `LOG: ${item[inspectSymbol]()}`;
      }

      return `LOG: ${item}`;
    }
  }

  logger.INSPECT = inspectSymbol;

  let inspect = logger.INSPECT;

  let testObj = {};

  testObj[inspect] = function() {
    return 'testing object';
  };

  t.is(logger.log(testObj), 'LOG: testing object');
});
