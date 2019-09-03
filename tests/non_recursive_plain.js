'use strict';

QUnit.module('Тестируем функцию nonRecursivePlain', function () {
	QUnit.test('Работает с единственным элементом', function (assert) {
		assert.deepEqual(nonRecursivePlain([]), [], 'Работает с пустым массивом');
		assert.deepEqual(nonRecursivePlain([ 42 ]), [ 42 ], 'Работает с массивом из одного элемента');
		assert.deepEqual(nonRecursivePlain([ 1, 2, 3, 4 ]), [ 1, 2, 3, 4 ], 'Сохраняет порядок элементов');
	});

	QUnit.test('Работает с единственным массивом', function (assert) {
		assert.deepEqual(nonRecursivePlain([ [] ]), []);
		assert.deepEqual(nonRecursivePlain([ [ 42 ] ]), [ 42 ]);
		assert.deepEqual(nonRecursivePlain([ [ 1, 2, 3, 4 ] ]), [ 1, 2, 3, 4 ]);
	});

	QUnit.test('Работает со смешанными значениями', function (assert) {
		assert.deepEqual(nonRecursivePlain([ [], 42 ]), [ 42 ]);
		assert.deepEqual(nonRecursivePlain([ [ 42 ], 0 ]), [ 42, 0 ]);
		assert.deepEqual(nonRecursivePlain([ [ 1, 2, 3, 4 ], 5, 6, 7, 8 ]), [ 1, 2, 3, 4, 5, 6, 7, 8 ]);
	});

	QUnit.test('Работает с несколькими массивами', function (assert) {
		assert.deepEqual(nonRecursivePlain([ [], [] ]), [], 'Работает с пустыми массивами');
		assert.deepEqual(nonRecursivePlain([ [ 42 ], [ 42 ] ]), [ 42, 42 ]);
		assert.deepEqual(nonRecursivePlain([ [ 42, 42 ], [ 42 ] ]), [ 42, 42, 42 ]);
		assert.deepEqual(nonRecursivePlain([ [ 1 ], [ 2 ], [ 3 ], [ 4, 5, 6 ] ]), [ 1, 2, 3, 4, 5, 6 ]);
	});

	QUnit.test('Работает с вложенными массивами', function (assert) {
		assert.deepEqual(nonRecursivePlain([ [], [ [], [], [] ] ]), [], 'Работает с пустыми массивами');
		assert.deepEqual(nonRecursivePlain([ [ 42 ], [ [ 42 ], [], [ 42 ] ], [ 42 ] ]), [ 42, 42, 42, 42 ]);
		assert.deepEqual(nonRecursivePlain([ [ 42, 42 ], [ 42, [ 42, [ 42, 42 ], 42 ] ] ]), [ 42, 42, 42, 42, 42, 42, 42 ]);
		assert.deepEqual(nonRecursivePlain([ [ 1 ], [ 2 ], [ 3 ], [ 4, 5, [ 6, 7, 8, [ 9 ] ], 10 ], 11 ]), [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11 ]);
	});

	QUnit.test('Работает с элементами разных типов', function (assert) {
		assert.deepEqual(nonRecursivePlain([ [ 'abcde' ], [ [ 'f' ], [ null, false ], [ NaN, NaN ], NaN ], -Infinity ]), [ 'abcde', 'f', null, false, NaN, NaN, NaN, -Infinity ]);
	});

	QUnit.test('Работает с массивами объектов', function(assert) {
		assert.deepEqual(nonRecursivePlain([{}, [{}]]), [{},{}], 'Работает с пустыми объектами');
		assert.deepEqual(nonRecursivePlain([{foo: "bar"},[],[[{bar: "foo"}]]]), [{foo: "bar"}, {bar: "foo"}]);
	});

	QUnit.test('Выбрасывает исключение, если передать произвольный объект', function(assert) {
		assert.throws(() => nonRecursivePlain({foo: "bar"}), TypeError);
	});
});
