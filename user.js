async function insertUser(name, db) {
	if (!name) {
		return { status: 400, body: 'Bad Request' };
	}
	if (typeof name !== 'string') {
		return { status: 400, body: 'Not String' };
	}
	if (name.length >= 5) {
		return { status: 400, body: 'Over Length'};
	}

	await db.collection('user').insertOne({ name: name });
	return { status: 200, body: 'Created' };
}

async function getUsers(db) {
	// dbから取ってくるとオブジェクトで返ってくるからnamesという配列にする
	try {
		const users = await db.collection('user').find().toArray();
		const names = users.map((user) => { return user.name });
		return { names };
	} catch (err) {
		return { names: [] };
	}
}
exports.insertUser = insertUser;
exports.getUsers = getUsers;
