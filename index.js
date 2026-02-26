const express = require('express');
const path = require('path');

const { MongoClient } = require('mongodb' );
const client = new
	MongoClient ('mongodb://localhost:27017' );

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
			if (!name) {
				res.status (400).send('Bad Request' );
				return ;
			}
			if (typeof name !== 'string') {
				res.status(400).send('Not String');
				return;
			}
			await db.collection ('user' ).insertOne ({ name : name });
			res.status (200).send('Created' );
		});

	app.listen(3000, () => {
		console.log('start listening' );
	});
}
main();
