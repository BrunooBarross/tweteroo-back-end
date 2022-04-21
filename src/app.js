import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

const dadosUsuario = [];

app.post("/sign-up", (req, res) => {
    dadosUsuario.push({nome: req.body.username, foto: req.body.avatar} )
    res.send(console.log(dadosUsuario));
});

app.listen(5000, console.log("Server rodando na port 5000"));