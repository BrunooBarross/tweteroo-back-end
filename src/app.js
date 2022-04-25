import express from 'express';
import cors from 'cors';

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
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
    if (!req.body.username || !req.body.avatar){
        res.status(400).send("Todos os campos são obrigatórios");
        return;
    }
    dadosUsuario.push({ nome: req.body.username, avatar: req.body.avatar })
    res.status(200).send("OK");
});

app.get("/tweets", (req, res) => {
    res.send(tweets.slice(0, 10));
});

app.post("/tweets", (req, res) => {
    let avatarUsuario = dadosUsuario.find(element => element.nome === req.body.username);
    if(!req.body.username || !req.body.tweet){
        res.status(400).send("Todos os campos são obrigatórios");
        return;
    }
    tweets.unshift({ username: req.body.username, avatar: avatarUsuario.avatar, tweet: req.body.tweet })
    res.status(201).send("OK");
});

app.listen(5000, console.log("Server rodando na port 5000"));