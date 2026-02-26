const express = require('express');
const path = require('path');

const { MongoClient } = require('mongodb' );
const client = new
	MongoClient ('mongodb://localhost:27017' );
const { insertUser } = require('./user.js');

const app = express();

app.set('view engine', 'ejs');

// publicディレクトリ以下のファイルを静的ファイルとして配信
app.use('/static', express.static(path.join(__dirname, 'public')));

async function main() {
	// サーバーのlisten前に接続する
	await client.connect();
	const db = client.db('my-app' );

	app.get('/', async (req, res) => {
		// dbから取ってくるとオブジェクトで返ってくるからnamesという配列にする
		const users = await db.collection('user').find().toArray();
		const names = users.map((user) => { return user.name });
		res.render(path.join(__dirname, 'views','index.ejs'), { users: names });
	});

	app.post('/api/user' , express .json(), async (req, res) =>
		{
			const name = req.body.name;
			const { status, body } = await insertUser(name, db);
			res.status(status).send(body);
		});

	app.listen(3000, () => {
		console.log('start listening' );
	});
}
main();
