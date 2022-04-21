import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

const dadosUsuario = [];
const tweets = [
	{
		username: "bobesponja",
		avatar: "https://super.abril.com.br/wp-content/uploads/2020/09/04-09_gato_SITE.jpg?quality=70&strip=info",
	    tweet: "eu amo o hub"
	}
]

app.post("/sign-up", (req, res) => {
    dadosUsuario.push({nome: req.body.username, avatar: req.body.avatar} )
    res.send(console.log(dadosUsuario));
});

app.get("/tweets", (req, res) => {
    res.send(tweets);
});

app.post("/tweets", (req, res) => {
    tweets.push({nome: req.body.username, avatar: dadosUsuario[0].avatar, tweet: req.body.tweet} )
    res.send(console.log(dadosUsuario[0].avatar));
});

app.listen(5000, console.log("Server rodando na port 5000"));