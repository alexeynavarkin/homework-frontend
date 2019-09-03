'use strict';

QUnit.module('Тестируем функцию non_recursive_plain', function () {
	QUnit.test('Работает с единственным элементом', function (assert) {
		assert.deepEqual(non_recursive_plain([]), [], 'Работает с пустым массивом');
		assert.deepEqual(non_recursive_plain([ 42 ]), [ 42 ], 'Работает с массивом из одного элемента');
		assert.deepEqual(non_recursive_plain([ 1, 2, 3, 4 ]), [ 1, 2, 3, 4 ], 'Сохраняет порядок элементов');
	});

	QUnit.test('Работает с единственным массивом', function (assert) {
		assert.deepEqual(non_recursive_plain([ [] ]), []);
		assert.deepEqual(non_recursive_plain([ [ 42 ] ]), [ 42 ]);
		assert.deepEqual(non_recursive_plain([ [ 1, 2, 3, 4 ] ]), [ 1, 2, 3, 4 ]);
	});

	QUnit.test('Работает со смешанными значениями', function (assert) {
		assert.deepEqual(non_recursive_plain([ [], 42 ]), [ 42 ]);
		assert.deepEqual(non_recursive_plain([ [ 42 ], 0 ]), [ 42, 0 ]);
		assert.deepEqual(non_recursive_plain([ [ 1, 2, 3, 4 ], 5, 6, 7, 8 ]), [ 1, 2, 3, 4, 5, 6, 7, 8 ]);
	});

	QUnit.test('Работает с несколькими массивами', function (assert) {
		assert.deepEqual(non_recursive_plain([ [], [] ]), [], 'Работает с пустыми массивами');
		assert.deepEqual(non_recursive_plain([ [ 42 ], [ 42 ] ]), [ 42, 42 ]);
		assert.deepEqual(non_recursive_plain([ [ 42, 42 ], [ 42 ] ]), [ 42, 42, 42 ]);
		assert.deepEqual(non_recursive_plain([ [ 1 ], [ 2 ], [ 3 ], [ 4, 5, 6 ] ]), [ 1, 2, 3, 4, 5, 6 ]);
	});

	QUnit.test('Работает с вложенными массивами', function (assert) {
		assert.deepEqual(non_recursive_plain([ [], [ [], [], [] ] ]), [], 'Работает с пустыми массивами');
		assert.deepEqual(non_recursive_plain([ [ 42 ], [ [ 42 ], [], [ 42 ] ], [ 42 ] ]), [ 42, 42, 42, 42 ]);
		assert.deepEqual(non_recursive_plain([ [ 42, 42 ], [ 42, [ 42, [ 42, 42 ], 42 ] ] ]), [ 42, 42, 42, 42, 42, 42, 42 ]);
		assert.deepEqual(non_recursive_plain([ [ 1 ], [ 2 ], [ 3 ], [ 4, 5, [ 6, 7, 8, [ 9 ] ], 10 ], 11 ]), [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11 ]);
	});

	QUnit.test('Работает с элементами разных типов', function (assert) {
		assert.deepEqual(non_recursive_plain([ [ 'abcde' ], [ [ 'f' ], [ null, false ], [ NaN, NaN ], NaN ], -Infinity ]), [ 'abcde', 'f', null, false, NaN, NaN, NaN, -Infinity ]);
	});

	QUnit.test('Работает с массивами объектов', function(assert) {
		assert.deepEqual(non_recursive_plain([{}, [{}]]), [{},{}], 'Работает с пустыми объектами');
		assert.deepEqual(non_recursive_plain([{foo: "bar"},[],[[{bar: "foo"}]]]), [{foo: "bar"}, {bar: "foo"}]);
	});

	QUnit.test('Выбрасывает исключение, если передать произвольный объект', function(assert) {
		assert.throws(()=>non_recursive_plain({foo: "bar"}), TypeError);
	});
});
