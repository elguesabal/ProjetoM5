const express = require('express')                          /*npm i express*/
const mysql = require('mysql')                              /*npm */
const exphbs = require('express-handlebars')                /*npm */
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

        // VER INFORMACOES CLIENTES   -   JOSE
app.get('/cliente/:id', (req, res) => {
    const id = req.params.id
    const sql = `SELECT * FROM cliente WHERE id = ${id}`

    conn.query(sql, function(err, data) {
        if(err) {
            console.log(err)
            return
        }

        const cliente = data[0]
        res.render('dadosCliente', {layout: false, cliente})
    })
})
        // VER INFORMACOES CLIENTES   -   JOSE


        // EDITAR INFORMACOES CLIENTES   -   JOSE
app.get('/cliente/editarDados/:id', (req, res) => {
    const id = req.params.id
    const sql = `UPDATE cliente SET nome = '${nome}', nascimento = '${nascimento}', email = '${email}', telefone = '${telefone}', cpf = '${cpf}', senha = '${senha}' WHERE id = ${id}`

    conn.query(sql, function(err, data) {
        if(err) {
            console.log(err)
            return
        }

        const cliente = data[0]
        res.render('editarDados', {layout: false, cliente})
    })
})
        // EDITAR INFORMACOES CLIENTES   -   JOSE











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