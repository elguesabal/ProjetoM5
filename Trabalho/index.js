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


// rotas dos exames (Maiara)
//rota index_exames
app.get('/index_exames', function (req, res) {
    res.render('index_exames', { layout: false })
})
// rota de cadastro
app.get('/marcar_exames/', function (req, res) {
    res.render('marcar_exames', { layout: false })
})
// rota de busca
app.get('/busca_exames/', (req, res) => {
    res.render('busca_exames', { layout: false })
})
//fim das rotas dos exames (Maiara)


// rotas para o medico (Bruno)

app.get('/home', (req, res) => {
    res.render('home', { layout: false })

})

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
    const nascimento = req.body.nascimento
    const email = req.body.email
    const telefone = req.body.telefone
    const cpf = req.body.cpf
    const senha = req.body.senha

    const sql = `INSERT INTO medico (nome, nascimento, email, telefone, cpf, senha) VALUES ('${nome}', '${nascimento}', '${email}', '${telefone}', '${cpf}', '${senha}')`

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



//Inicio da rota da prescrição (Otavio)

app.get('/receitaCad', (req, res) => {
    // id = req.body.id;
     const sql = `SELECT * FROM medicamentos` 

    conn.query(sql, function (err, data) {
       if (err) {
            console.log(err)
        }
         const listarMed = data
     console.log(listarMed);
     
     res.render('receitaCad', { layout: false , listarMed })
    })
})
//receitaCad <-
app.post('/receita/insertreceita', (req, res) => {
    const nome = req.body.nome
    const cpf = req.body.cpf
    const telefone = req.body.telefone
    const idade = req.body.idade
    const data = req.body.data
    const medico = req.body.medico
    const remedio = req.body.remedio

    const sql = `INSERT INTO receita (nome,cpf,telefone,idade,data,medico,remedio) VALUES ('${nome}','${cpf}','${telefone}','${idade}','${data}','${medico}','${remedio}')`

    conn.query(sql, function (err) {
        if (err) {
            console.log(err)
        }

        console.log("Cadastro com sucesso!")

        res.redirect('/receita')

    })
})

//receita <-
app.get('/receita', (req, res) => {
    const sql = 'SELECT * FROM receita'

    conn.query(sql, function (err, data) {
        if (err) {
            console.log(err);
            return
        }

        const listar = data

        console.log(listar);

        res.render('receita', { layout: false, listar })
    })
})

// consulta a prescrição pelo id
app.get('/receita/:id', (req, res) => {
    const id = req.params.id

    const sql = `SELECT * FROM receita WHERE id = ${id}`

    conn.query(sql, function (err, data) {
        if (err) {
            console.log(err)
            return
        }

        const listarclientes = data[0]
        res.render('receitaId', { layout: false, listarclientes })
    })
})

// editando  a prescrição
app.get('/receita/editCad/:id', (req, res) => {
    const id = req.params.id

    const sql = `SELECT * FROM receita where id = ${id}`

    conn.query(sql, function (err, data) {
        if (err) {
            console.log(err)
            return
        }

        const editarReceita = data[0]
        res.render('editCad', { layout: false, editarReceita })
    })
})

app.post('/receita/updateReceita', (req, res) => {

    const id = req.body.id
    const nome = req.body.nome
    const cpf = req.body.cpf
    const telefone = req.body.telefone
    const idade = req.body.idade
    const data = req.body.data
    const medico = req.body.medico
    const remedio = req.body.remedio

    const sql = `UPDATE receita SET nome = '${nome}', cpf = '${cpf}', telefone = '${telefone}'
    , idade = '${idade}', data = '${data}', medico = '${medico}', remedio = '${remedio}' WHERE id = '${id}'`

    conn.query(sql, function (err) {
        if (err) {
            console.log(err)
            return
        }
        res.redirect('/receita')
    })

})

// excluindo a prescrição
app.get('/receita/remove/:id', (req, res) =>{
    const id = req.params.id

    const sql = `DELETE FROM receita WHERE id = '${id}'`

    conn.query(sql, function(err){
        if(err){
            console.log(err)
            return;
        }

        res.redirect('/receita')
    })

})


//Inicio da rota da prescrição (Otavio)











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
    const sobrenome = req.body.sobrenome
    const nascimento = req.body.nascimento
    const email = req.body.email
    const telefone = req.body.telefone
    const cpf = req.body.cpf
    const senha = req.body.senha

    const sql = `INSERT INTO paciente (nome, nascimento, email, telefone, cpf, senha) VALUES ('${nome} ${sobrenome}', '${nascimento}', '${email}', '${telefone}', '${cpf}', '${senha}')`

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
            res.redirect('/cliente/loginP_loginSenhaErrado')
            return
        } if (cliente.senha == senha) {
            res.redirect(`/cliente/${cpf}`)
        } else {
            res.redirect(`/cliente/loginP_loginSenhaErrado`)
        }
    })
})


// LOGIN OU SENHA ERREDA PACIENTE   -   JOSE
app.get('/cliente/loginP_loginSenhaErrado', (req, res) => {
    res.render('loginP_loginSenhaErrado', { layout: false })
})
// LOGIN OU SENHA ERREDA PACIENTE   -   JOSE

app.get('/cliente/:cpf', (req, res) => {
    const cpf = req.params.cpf
    const sql = `SELECT * FROM paciente WHERE cpf = '${cpf}'`

    conn.query(sql, function (err, data) {
        if (err) {
            console.log(err)
            return
        }

        const cpf_cliente = data[0]
    
        const sqlExame = `SELECT * FROM exames WHERE cpf_cliente = '${cpf_cliente}'`



        conn.query(sqlExame, function (err, data){
            if (err) {
            console.log(err)
            return
            }
            const listarExames = data



            const sqlConsulta = `SELECT * FROM consulta WHERE id = '4'`

            conn.query(sqlConsulta, function (err, data){
                if (err) {
                console.log(err)
                return
                }
                const listarConsulta = data
    
                
                res.render('clienteInfo', { layout: false, cliente, listarExames, listarConsulta })
            })
        })
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
    const sobrenome = req.body.sobrenome
    const nascimento = req.body.nascimento
    const email = req.body.email
    const telefone = req.body.telefone
    const cpf = req.body.cpf
    const senha = req.body.senha

    const sql = `UPDATE paciente SET nome = '${nome} ${sobrenome}', nascimento = '${nascimento}', email = '${email}', telefone = '${telefone}', WHERE cpf = '${cpf}'`

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










// DAQUI PARA BAIXO É O CAMPO DE MEDICAMENTOS (RAFAEL)

//PAGE DE MEDICAMENTOS COM FORMULÁRIO


app.get('/medicamentospage', (req, res) => {
    res.render('medicamentospage', { layout: false })

})

app.use(
    express.urlencoded({ extended: true })
)

//INSERIR INFORMAÇÕES
app.post('/medicamentos/receber', (req, res) => {
    const nome = req.body.nome
    const dosagem = req.body.dosagem
    const composicao = req.body.composicao
    const comprimidos = req.body.comprimidos
    const preco = req.body.preco
    
    const urlmed = req.body.urlmed
    const sql = `INSERT INTO medicamentos (nome, dosagem, composicao, comprimidos, preco, urlmed) VALUES ('${nome}', '${dosagem}', '${composicao}', '${comprimidos}', '${preco}', '${urlmed}')`

    conn.query(sql, function (err) {
        if (err) {
            console.log(err)
        }

        res.redirect('/')
        console.log('Dados cadastrado com sucesso')
    })
})


//GET PARA LISTAGEM DOS MEDICAMENTOS
app.get('/medicamentos', (req, res) => {
    const sql = 'SELECT * FROM medicamentos'

    conn.query(sql, function (err, data) {
        if (err) {
            console.log(err)
            return
        }

        const listar = data

        console.log(listar)
        //res render... é para renderizar o handlebars
        res.render('exibir(medicamentos)', { layout: false, listar })
    })
})



//CONSULTA DOS MEDICAMENTOS POR ID
app.get('/medicamentos/edit/:id', (req, res) => {
    const id = req.params.id

    const sql = `SELECT * FROM medicamentos WHERE id = ${id}`

    conn.query(sql, function (err, data) {
        if (err) {
            console.log(err)
            return
        }

        const listarMed = data[0]
        res.render('getmed(medicamentos)', { layout: false, listarMed })

    })
})


//PUXANDO OS REGISTROS PARA EDIÇÃO
app.get('/med/edit/:id', (req, res) => {
    const id = req.params.id

    const sql = `SELECT * FROM medicamentos where id = ${id}`


    conn.query(sql, function (err, data) {
        if (err) {
            console.log(err)
            return
        }

        const medicamentos = data[0]
        res.render('edit(medicamentos)', { layout: false, medicamentos })
    })

})




//EDIÇÃO DE REGISTROS COM POST
app.post('/updatemed', (req, res) => {

    const id = req.body.id
    const nome = req.body.nome
    const dosagem = req.body.dosagem
    const composicao = req.body.composicao
    const comprimidos = req.body.comprimidos
    const preco = req.body.preco
    const urlmed = req.body.urlmed
    const sql = `UPDATE medicamentos SET nome = '${nome}', dosagem = '${dosagem}', composicao =  '${composicao}', comprimidos = '${comprimidos}', preco = '${preco}',  urlmed = '${urlmed}'  WHERE id = '${id}' `

    conn.query(sql, function (err) {
        if (err) {
            console.log(err)
        }

        res.redirect('/medicamentos')
        console.log("alterado com sucesso")


    })
})



 //ROTA DE BUSCA
 app.get('/busca', (req, res) => {
    res.render('busca(medicamentos)', { layout: false })

})

//ROTA DO BUSC

app.post('/busc/', (req, res) => {
    const id = req.body.id

    const sql = `SELECT * FROM medicamentos where id = ${id}`

    conn.query(sql, function(err, data){
        if(err){
            console.log(err)
            return
        }

        const listarMed = data [0]
        res.render('getmed(medicamentos)', {  layout: false, listarMed } )

    })
})

//REQUISIÇÃO PARA REMOÇÃO DE MEDICAMENTOS
app.get('/med/remove/:id', (req, res) => {
    const id = req.params.id

    const sql = `DELETE FROM medicamentos WHERE id = ${id}`

    conn.query(sql, function (err) {
        if (err) {
            console.log(err)
            return
        }

        res.redirect('/medicamentos')
        console.log("Delete com sucesso")
    })
})




//Marcar consulta (Manoel)
app.post('/marcarConsulta', (req, res) => {
    const cliente = req.body.cliente
    const clientesobre = req.body.clientesobre
    const email = req.body.email
    const data = req.body.data
    const horario = req.body.horario
    const sintomas = req.body.sintomas
    const sql = `INSERT INTO consulta (cliente, clientesobre, email,data, horario, sintomas) VALUES ('${cliente}','${clientesobre}','${email}','${data}','${horario}','${sintomas}')`
    conn.query(sql, function (err) {
        if (err) {
            console.log(err)
        }

        console.log("Consulta marcada!")
        res.redirect('/cliente/:cpf')
    })

})

//inicio da parte dos exames (Maiara)

// inserir dados (marcar exame)
app.post('/marcar_exames/', (req, res) => {
    const id = req.body.id
    const exame = req.body.exame
    const medico = req.body.medico
    const paciente = req.body.paciente
    const data = req.body.data
    const horario = req.body.horario
    const cpf_cliente = req.body.cpf_cliente

    const sql = `INSERT INTO exames (id,exame,medico,paciente,data,horario,cpf_cliente) VALUES ('${id}','${exame}','${medico}','${paciente}','${data}', '${horario}', '${cpf_cliente}')`


    conn.query(sql, function (err) {
        if (err) {
            console.log(err)
        }

        res.redirect('/')
        console.log("Exame marcado com sucesso!")
    })
})

//rota de busca (buscando) que envia para view exame.handlebars
app.post('/buscando/', (req, res) => {
    const id = req.body.id
    
    const sql = `SELECT * FROM exames WHERE id = ${id}`

    conn.query(sql, function(err, data){
        if(err){
            console.log(err)
            return
        }

        res.redirect(`/exames/${id}`)
        console.log("Exame encontrado com sucesso!")
    })
})

//consultar dados (busca todos os exames)
app.get('/exames/', (req, res) => {
    const sql = 'SELECT * FROM exames'
    
    conn.query(sql, function (err, data){
        if (err) {
            console.log(err)
            return
        }
        const listar = data

        console.log(listar)

        res.render('exames', { layout: false, listar })
    })
})

//consultar pelo id um exame marcado (exame.handlebars)
app.get('/exames/:id', (req, res) => {
    const id = req.params.id
    
    const sql = `SELECT * FROM exames WHERE id = ${id}`
    // const sql2 = `SELECT * FROM paciente WHERE nome = ${nome}`

    conn.query(sql, function (err, data){
        if (err) {
        console.log(err)
        return
        }
        const listarexames = data[0]
        res.render('exame', { layout: false, listarexames })
    })
})

//editar exame marcado
app.get('/exames/edit_exames/:id', (req, res) => {
    const id = req.params.id
    const sql = `SELECT * FROM exames WHERE id = ${id}`

    conn.query(sql, function (err, data){
        if (err) {
        console.log(err)
        return
        }
        const editarexame = data[0]
        res.render('edit_exames', { layout: false, editarexame })
    })
})

//editar exame com Post
app.post('/upexame', (req, res) => {
    const id = req.body.id
    const exame = req.body.exame
    const medico = req.body.medico
    const paciente = req.body.paciente
    const data = req.body.data
    const horario = req.body.horario
    const cpf_cliente = req.body.cpf_cliente
    
    
    const sql = `UPDATE exames SET exame = '${exame}', medico = '${medico}', paciente = '${paciente}', data = '${data}', horario = '${horario}', cpf_cliente = '${cpf_cliente} WHERE id = '${id}'`
    
    conn.query(sql, function (err) {
        if (err) {
            console.log(err)
            return
        }

        res.redirect('/exames')
        console.log("Editado com sucesso!")
    })
})

//deletar exame marcado
app.get('/exames/remove/:id', (req, res) => {
    const id = req.params.id
    const sql = `DELETE FROM exames WHERE id = ${id}`

    conn.query(sql, function (err) {
        if (err) {
            console.log(err)
            return
        }
    res.redirect('/exames')})
    console.log("Deletado com sucesso!")
})
//Fim da parte dos exames (Maiara)



// ROTA NAO EXISTENTE - JOSE
app.use(function (req, res, next) {
    res.status(404).render('error 404', { layout: false })
})
// ROTA NAO EXISTENTE - JOSE


// conexão bd
const conn = mysql.createConnection({
    host: '127.0.0.1',
    port: '3307',
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






    //lembrar que toda vez que algum registro por deletado, o auto incremento vai continuar seguindo com a numeração, por conta de "registro vazio"
    //Para retornar a ordem correta da numeração do id, basta excluir e criar novamente, ele ira "resetar a contagem"
    // FIM DAS ROTAS DOS MEDICAMENTOS (RAFAEL)
})

