let mensagem = "";
const express = require("express");
const port = process.env.PORT || 3000;
const app = express();
const path = require("path");

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")))
app.use(express.urlencoded());

const listaFilmes = [{
    id: 1,
    nome: "Harry Potter e A Pedra Filosofal",
    ano: "2001",
    imagem: "https://ingresso-a.akamaihd.net/img/cinema/cartaz/7766-cartaz.jpg",
},
{
  id: 2,
  nome: "Harry Potter e A Câmara Secreta",
  ano: "2001",
  imagem: "https://img.elo7.com.br/product/zoom/2657601/big-poster-filme-harry-potter-e-a-camara-secreta-lo02-90x60-geek.jpg",
},

  {
    id: 3,
    nome: "Harry Potter e O Prisioneiro de Azkabam",
    ano: "2001",
    imagem: "https://img.elo7.com.br/product/zoom/2657A18/big-poster-harry-potter-e-o-prisioneiro-de-azkaban-lo3-90x60-poster.jpg",
},

];

let filmes = undefined;



app.get("/", (req, res) => {
  res.render("index", { listaFilmes, filmes, mensagem });
});

app.post("/create", (req,res) => {
  const filmes = req.body;
  filmes.id = listaFilmes.length + 1;
  listaFilmes.push(filmes);
  mensagem = 'filmes criado com sucesso!';
  res.redirect("/#cards");
})

app.get("/detalhes/:id", (req, res) =>{
  const id = req.params.id;
  filmes = listaFilmes.find((filmes) => filmes.id ==id);
  res.redirect("/#cadastro");
})

app.post("/update/:id", (req, res) =>{
  mensagem = " ";
  const id = +req.params.id -1;
  const novofilmes = req.body;
  novofilmes.id = id + 1;
  listaFilmes[id] = novofilmes;
  filmes = undefined;
  res.redirect("/#cards");

});

app.get("/delete/:id", (req, res) => {
  const id = req.params.id - 1;
  delete listaFilmes[id];
  res.redirect("/#cards");
})

app.listen(3000, () => {
    console.log("Servidor rodando em http://localhost:3000")
    });