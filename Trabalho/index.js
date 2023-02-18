/*  DEPENDENCIAR PARA INSTALAR ANTES DE RODAR O SERVIDOR
npm init
npm i express
npm i mysql
npm install --save-dev
npm i handlebars
*/



const express = require('express')
const mysql = require('mysql')
const exphbs = require('express-handlebars')
const { irregular } = require('i/lib/inflections')

const port = 3000

const app = express()

app.engine('handlebars', exphbs.engine())

app.set('view engine', 'handlebars')

app.use(express.static('public'))

app.use(
    express.urlencoded({extended: true})
)

                // ROTA DA PAGINA INICIAL
app.get('/', (req, res) => {
    res.render('home', {layout: false})
})
                // ROTA DA PAGINA INICIAL








                    // AKI FICA O ESPACO PARA AS REQUISICOES

        // CADASTRAR PACIENTE   -   JOSE
app.get('/cadastrar', (req, res) => {
    res.render('cadastrar', {layout: false})
})

app.post('/novoCliente',(req, res) => {
    const nome = req.body.nome
    const nascimento = req.body.nascimento
    const email = req.body.email
    const telefone = req.body.telefone
    const cpf = req.body.cpf
    const senha = req.body.senha

    const sql = `INSERT INTO paciente (nome, nascimento, email, telefone, cpf, senha) VALUES ('${nome}', '${nascimento}', '${email}', '${telefone}', '${cpf}', '${senha}')`

    conn.query(sql, function(err) {
        if (err) {
            console.log(err)
        }

        res.redirect('/')
    })
})
        // CADASTRAR PACIENTE   -   JOSE


        // VER INFORMACOES PACIENTE   -   JOSE
app.post('/cliente', (req, res) => {
    const cpf = req.body.cpf
    
    const sql = `SELECT * FROM paciente WHERE cpf = '${cpf}'`

    conn.query(sql, function(err, data){
        if(err){
            console.log(err)
            return
        }

        res.redirect(`/cliente/${cpf}`)
    })
})

app.get('/cliente/:cpf', (req, res) => {
    const cpf = req.params.cpf
    const sql = `SELECT * FROM paciente WHERE cpf = '${cpf}'`

    conn.query(sql, function(err, data) {
        if (err) {
            console.log(err)
            return
        }

        const cliente = data[0]
        res.render('clienteInfo', {layout: false, cliente})
    })
})
        // VER INFORMACOES PACIENTE   -   JOSE


        // EDITAR INFORMACOES PACIENTE   -   JOSE
app.get('/cliente/editar/:cpf', (req, res) => {
    const cpf = req.params.cpf
    const sql = `SELECT * FROM paciente WHERE cpf = '${cpf}'`

    conn.query(sql, function(err, data) {
        if(err) {
            console.log(err)
            return
        }

        const cliente = data[0]
        res.render('clienteEditar', {layout: false, cliente})
    })
})

app.post('/cliente/edit', (req, res) => {
    const nome = req.body.nome
    const nascimento = req.body.nascimento
    const email = req.body.email
    const telefone = req.body.telefone
    const cpf = req.body.cpf
    const senha = req.body.senha

    const sql = `UPDATE paciente SET nome = '${nome}', nascimento = '${nascimento}', email = '${email}', telefone = '${telefone}', senha = '${senha}' WHERE cpf = '111111'`

    conn.query(sql, function(err) {
        if (err) {
            console.log(err)
            return
        }

        res.redirect(`/cliente/${cpf}`)
    })
})
        // EDITAR INFORMACOES PACIENTE   -   JOSE


        // EXCLUIR PACIENTE  -   JOSE
app.get('/cliente/excluir/:cpf', (req, res) => {
    const cpf = req.params.cpf

    const sql = `DELETE FROM paciente WHERE cpf = '${cpf}'`

    conn.query(sql, function(err) {
        if (err) {
            console.log(err)
            return
        }

        res.redirect('/')
    })
})
        // EXCLUIR PACIENTE  -   JOSE



                    // AKI FICA O ESPACO PARA AS REQUISICOES










const conn = mysql.createConnection({
    host: '127.0.0.1',
    port: '3307',
    user: 'root',
    password: '',
    database: 'clinica_resilia'
})

conn.connect(function(err) {
    if(err) {
        console.log(err)
    }

    console.log('Conectado com sucesso')
})

app.listen(port, () => {
    console.log(`App rodando na porta ${port}`)
})
