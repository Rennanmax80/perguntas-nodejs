const express = require("express");
const dotenv = require("dotenv/config")
const bodyParser = require("body-parser")
const conection = require('./database/database')
const Pergunta = require('./database/Pergunta.model')

//database
conection.authenticate().then(() => {
    console.log('conexão feita com o banco de dados')
}).catch((msgErro) => {
    console.log(msgErro)
})

const app = express();

// Usando o EJS
app.set('view engine', 'ejs');
app.use(express.static('public'))

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.get("/", (req, res) => {
    Pergunta.findAll({ raw: true, order: [
        ['id','desc']
    ]}).then(perguntas => {
        console.log(perguntas)
        res.render("index", {
            perguntas: perguntas
        })
    })

})
app.get("/perguntar", (req, res) => {
    res.render("perguntar")
})

app.get("/pergunta/:id", (req, res) => {
    var id = req.params.id;
    Pergunta.findOne({ 
        where: {id: id}
    }).then(pergunta => {
        if(pergunta != undefined){ //pergunta encontrada
            res.render("pergunta")
        }else{ // N encontrada
            res.redirect("/")
        }
    })

})


app.post("/salvarpergunta", (req, res) => {
    var titulo = req.body.titulo; //pegar info do formulario
    var descricao = req.body.descricao;


    Pergunta.create({
        titulo: titulo,
        descricao: descricao,
    }).then(() => {
        res.redirect("/")
    })
})

app.listen(process.env.PORT, () => console.log("Servidor iniciado")) 