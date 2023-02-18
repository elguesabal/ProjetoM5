// imports
const express = require('express')
const exphbs = require('express-handlebars')
const mysql = require('mysql')

const port = 4000

// express
const app = express();

// configurar o handlebars
app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')


app.use('/public', express.static(__dirname + '/public'))


// rotas
app.get('/', function (req, res) {
    res.render('home', { layout: false })
})

app.use(
    express.urlencoded({
        extended: true
    })
)


// rotas para o medico (Bruno)


// page login
app.get('/loginM', (req, res) => {
    res.render('loginM', { layout: false })

})


// page fake login
app.post('/login', (req, res) => {
    const cpf = req.body.cpf

    const sql = `SELECT * FROM medico WHERE cpf = ${cpf}`

    conn.query(sql, function (err, data) {
        if (err) {
            console.log(err)
            return
        }

        const listarmedico = data[0]
        res.render('medicoId', { layout: false, listarmedico })

    })
})


app.get('/cadastrarM', (req, res) => {
    res.render('cadastrarM', { layout: false })
})



//Cadastrar medico
app.post('/cadastrarM', (req, res) => {

    const nome = req.body.nome
    const cpf = req.body.cpf
    const email = req.body.email
    const telefone = req.body.telefone

    const sql = `INSERT INTO medico (nome, email, telefone, cpf) VALUES ('${nome}','${email}','${telefone}','${cpf}')`
    conn.query(sql, function (err) {
        if (err) {
            console.log(err)
        }

        console.log("Cadastro com sucesso!")
        res.redirect('/loginM')
    })
})






//Consultar medicos
app.get('/medicos', (req, res) => {
    const sql = 'SELECT * FROM medico'

    conn.query(sql, function (err, data) {
        if (err) {
            console.log(err);
            return
        }

        const listar = data

        console.log(listar);

        res.render('medicos', { layout: false, listar })
    })
})


// consulta um registro pelo id
app.get('/medicos/:id', (req, res) => {
    const id = req.params.id

    const sql = `SELECT * FROM medico WHERE id = ${id}`

    conn.query(sql, function (err, data) {
        if (err) {
            console.log(err)
            return
        }

        const listarmedico = data[0]
        res.render('medicoId', { layout: false, listarmedico })
    })
})


// Editando informaçoes do medico

// pegando o registro
app.get('/medico/editar/:id', (req, res) => {
    const id = req.params.id

    const sql = `SELECT * FROM medico where id = ${id}`

    conn.query(sql, function (err, data) {
        if (err) {
            console.log(err)
            return
        }

        const editarmedico = data[0]
        res.render('editarM', { layout: false, editarmedico })
    })
})


// editando o registro 
app.post('/medico/update', (req, res) => {

    const id = req.body.id
    const nome = req.body.nome
    const cpf = req.body.cpf
    const email = req.body.email
    const telefone = req.body.telefone

    const sql = `UPDATE medico SET nome = '${nome}', email = '${email}', telefone = '${telefone}', cpf = '${cpf}' WHERE id = '${id}'`

    conn.query(sql, function (err) {
        if (err) {
            console.log(err)
            return
        }
        res.redirect('/loginM')
    })

})


// excluindo o medico
app.get('/medico/excluir/:id', (req, res) => {

    const id = req.params.id

    const sql = `DELETE FROM medico WHERE id = '${id}'`

    conn.query(sql, function (err) {
        if (err) {
            console.log(err)
            return;
        }

        res.redirect('/loginM')
    })

})

// fim das rotas dos medicos(Bruno)















// AKI FICA O ESPACO PARA AS REQUISICOES

// page login
app.get('/loginP', (req, res) => {
    res.render('loginP', { layout: false })
})

// CADASTRAR PACIENTE   -   JOSE
app.get('/cadastrarP', (req, res) => {
    res.render('cadastrarP', { layout: false })
})

app.post('/novoCliente', (req, res) => {
    const nome = req.body.nome
    const nascimento = req.body.nascimento
    const email = req.body.email
    const telefone = req.body.telefone
    const cpf = req.body.cpf
    const senha = req.body.senha

    const sql = `INSERT INTO paciente (nome, nascimento, email, telefone, cpf, senha) VALUES ('${nome}', '${nascimento}', '${email}', '${telefone}', '${cpf}', '${senha}')`

    conn.query(sql, function (err) {
        if (err) {
            console.log(err)
        }

        res.redirect('/loginP')
    })
})
// CADASTRAR PACIENTE   -   JOSE


// VER INFORMACOES PACIENTE   -   JOSE
app.post('/cliente', (req, res) => {
    const cpf = req.body.cpf
    const senha = req.body.senha

    const sql = `SELECT * FROM paciente WHERE cpf = '${cpf}'`

    conn.query(sql, function (err, data) {
        if (err) {
            console.log(err)
            return
        }


        const cliente = data[0]

        if (cliente == undefined) {
            res.redirect('/loginP')
        } if (cliente.senha == senha) {
            res.redirect(`/cliente/${cpf}`)
        } else {
            res.redirect(`/loginP`)
        }
    })
})

app.get('/cliente/:cpf', (req, res) => {
    const cpf = req.params.cpf
    const sql = `SELECT * FROM paciente WHERE cpf = '${cpf}'`

    conn.query(sql, function (err, data) {
        if (err) {
            console.log(err)
            return
        }

        const cliente = data[0]
        res.render('clienteInfo', { layout: false, cliente })
    })
})
// VER INFORMACOES PACIENTE   -   JOSE


// EDITAR INFORMACOES PACIENTE   -   JOSE
app.get('/cliente/editar/:cpf', (req, res) => {
    const cpf = req.params.cpf
    const sql = `SELECT * FROM paciente WHERE cpf = '${cpf}'`

    conn.query(sql, function (err, data) {
        if (err) {
            console.log(err)
            return
        }

        const cliente = data[0]
        res.render('clienteEditar', { layout: false, cliente })
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

    conn.query(sql, function (err) {
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

    conn.query(sql, function (err) {
        if (err) {
            console.log(err)
            return
        }

        res.redirect('/')
    })
})
// EXCLUIR PACIENTE  -   JOSE










// conexão bd
const conn = mysql.createConnection({
    host: '127.0.0.1',
    port: '3306',
    user: 'root',
    password: '',
    database: 'clinica_resilia'
})

conn.connect(function (err) {
    if (err) {
        console.log(err);
    }

    console.log('Conectado com sucesso');
})

app.listen(port, () => {
    console.log(`app rodando na porta ${port}`);
})