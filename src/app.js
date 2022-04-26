import express, {json} from "express";
import cors from "cors";
import chalk from "chalk";

const app = express();
app.use(cors());
app.use(json());

// banco de dados em memória
let tweets = [];
let usuarios = [];

app.post("/sign-up", (req, res) => {
  const {username, avatar} = req.body;
  if(!username || !avatar) {
    res.status(400).send("Todos os campos são obrigatórios!");
    return;
  }

  usuarios.push({username, avatar});
  res.status(200).send("OK");
});

app.post("/tweets", (req, res) => {
  const {user: username} = req.headers;
  const {tweet} = req.body;

  if(!username || !tweet) {
    res.status(400).send("Todos os campos são obrigatórios!");
    return;
  }

  const avatar = usuarios.find(usuario => usuario.username === username).avatar;
  tweets.push({ tweet, username, avatar });
  res.sendStatus(201).send("OK");
});

app.get("/tweets", (req, res) => {
  const pagina = req.query.page;
  if(!pagina || parseInt(pagina) < 1) {
    res.status(400).send("Informe uma página válida!");
  }

  const limite = 10;
  const inicio = (pagina - 1) * limite;
  const final = pagina * limite;

  const tweetsFiltrados = [...tweets].reverse().slice(inicio, final); //ou splice (modifica o array)
  res.status(200).send(tweetsFiltrados);
});

app.get("/tweets/:username", (req, res) => {
  const {username} =  req.params;
  const tweetsFiltrados = tweets.filter(tweet => tweet.username === username);
  res.send(tweetsFiltrados);
})

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(chalk.bold.green(`Servidor em pé na porta ${port}!`));
})
