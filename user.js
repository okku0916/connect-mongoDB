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
exports.insertUser = insertUser;
