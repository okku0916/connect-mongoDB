const { test } = require ('node:test' );
const assert = require ('node:assert' );
const { insertUser, getUsers } = require ('./user' );
test('insertUser' , async (t) => {
	const insertOne = t.mock.fn();
	const db = {
		collection : () => {
			return { insertOne };
		},
	};
	const { status, body } = await insertUser ('test', db)
	assert.strictEqual (status, 200, '正しくデータが挿入された場合、ステータスコード200を返す');
	assert.strictEqual (insertOne.mock.callCount (), 1, '1度だけinsertOne が呼ばれる');
	assert.strictEqual (body, 'Created');
});

test('getUsers', async (t) => {
	// mockを作成する
	const insertOne = t.mock.fn();
	const db = {
		collection: () => {
			return {
				find: () => {
					return { toArray: () => {
						return [{ name: 'AAAA' },
							{ name: 'BBBB' },
							{ name: 'CCCC' }
						]
					}
					}
				}
			}
		}
	}
	const { names } = await getUsers(db);
	assert.deepEqual(names.length, 3, '件数をテスト');
	assert.deepEqual(names[0], 'AAAA', '配列の0番目が名前の文字列になっていること');
	assert.deepEqual(names[1], 'BBBB', '配列の1番目が名前の文字列になっていること');
	assert.deepEqual(names[2], 'CCCC', '配列の2番目が名前の文字列になっていること');
});

test('getUsers: db error', async (t) => {
	const db = {
		collection: () => {
			return {
				find: () => {
					return { toArray: () => {
						throw new Error('DB error');	
					}
					}
				}
			}
		}
	}


	t.plan(1); // assertが呼ばれた回数がこの回数であるか確認

	const { names } = await getUsers(db);
	t.assert.deepEqual(names.length, 0, "DBエラーが生じた時からの配列を返す");
});

