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
