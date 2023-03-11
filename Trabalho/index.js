// imports
const express = require('express')
const exphbs = require('express-handlebars')
// const mysql = require('mysql')           ANTIGO BANCO DE DADOS LOCAL DESATIVADO
require('dotenv').config()              // NOVO BANCO DE DADOS ONLINE NO PlanetScale
const mysql = require('mysql2')              // NOVO BANCO DE DADOS ONLINE NO PlanetScale


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
    const senhaErrada = "none"
    res.render('loginM', { layout: false, senhaErrada })

})

app.get('/medico/loginM_loginSenhaErrado', (req, res) => {
    const senhaErrada = 'block'
    res.render('loginM', { layout: false, senhaErrada })
})


// page fake login
app.post('/login', (req, res) => {
    const cpf = req.body.cpf
    const senha = req.body.senha


    const sql = `SELECT * FROM medico WHERE cpf = '${cpf}'`

    conn.query(sql, function (err, data) {
        if (err) {
            console.log(err)
            return
        }

        const listarmedico = data[0]

        if (listarmedico == undefined) {
            res.redirect('/medico/loginM_loginSenhaErrado')
            return
        } if (listarmedico.senha == senha) {
            res.redirect(`/medicos/${cpf}`)      //res.render('medicoId', { layout: false, listarmedico }) 
        } else {
            res.redirect(`/medico/loginM_loginSenhaErrado`)
        }
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
app.get('/medicos/:cpf', (req, res) => {
    const cpf = req.params.cpf
    const sql = `SELECT * FROM medico WHERE cpf = '${cpf}'`
    conn.query(sql, function (err, data) {
        if (err) {
            console.log(err)
            return
        }

        const listarmedico = data[0]



        const sqlExame = `SELECT * FROM exames WHERE cpf_medico = '${cpf}'` //slq exames

        conn.query(sqlExame, function (err, data) {
            if (err) {
                console.log(err)
                return
            }
            const listarExames = data

            const sqlConsulta = `SELECT * FROM consulta WHERE id_medico = ${listarmedico.id}`
            conn.query(sqlConsulta, function (err, data) {
                if (err) {
                    console.log(err)
                    return
                }
                const listarConsulta = data;
                console.log(listarmedico.id);
                res.render('medicoId', { layout: false, listarmedico, listarExames, listarConsulta })
            })
        })
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

        res.render('receitaCad', { layout: false, listarMed })
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
    const prescricao = req.body.prescricao

    const sql = `INSERT INTO receita (nome,cpf,telefone,idade,data,medico,remedio,prescricao) VALUES ('${nome}',
    '${cpf}','${telefone}','${idade}','${data}','${medico}','${remedio}','${prescricao}')`

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
        const med = `SELECT * FROM medicamentos`

        conn.query(med, function (err, data) {
            if (err) {
                console.log(err)
            }
            const listarMed = data
            console.log(listarMed);

            res.render('editCad', { layout: false, editarReceita, listarMed })
        })
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
    const prescricao = req.body.prescricao

    const sql = `UPDATE receita SET nome = '${nome}',cpf = '${cpf}', telefone = '${telefone}'
    , idade = '${idade}', data = '${data}', medico = '${medico}', remedio = '${remedio}', prescricao = '${prescricao}' WHERE id = '${id}'`

    conn.query(sql, function (err) {
        if (err) {
            console.log(err)
            return
        }
        res.redirect('/receita')
    })

})

// excluindo a prescrição
app.get('/receita/remove/:id', (req, res) => {
    const id = req.params.id

    const sql = `DELETE FROM receita WHERE id = '${id}'`

    conn.query(sql, function (err) {
        if (err) {
            console.log(err)
            return;
        }

        res.redirect('/receita')
    })

})



//Fim da rota da prescrição (Otavio)








// AKI FICA O ESPACO PARA AS REQUISICOES

// page login
app.get('/loginP', (req, res) => {
    const senhaErrada = 'none'
    res.render('loginP', { layout: false, senhaErrada })
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
    const senhaErrada = 'block'
    res.render('loginP', { layout: false, senhaErrada })
})
// LOGIN OU SENHA ERREDA PACIENTE   -   JOSE

app.get('/cliente/:cpf', (req, res) => {
    const cpf = req.params.cpf

    const diag = `SELECT * FROM receita WHERE cpf = '${cpf}'`
    conn.query(diag, function (err, data) {
        if (err) {
            console.log(err)
            return
        }
        const diag2 = data


        const sql = `SELECT * FROM paciente WHERE cpf = '${cpf}'`
        conn.query(sql, function (err, data) {
            if (err) {
                console.log(err)
                return
            }

            const cliente = data[0]

            const sqlExame = `SELECT * FROM exames WHERE cpf_cliente = '${cpf}'`



            conn.query(sqlExame, function (err, data) {
                if (err) {
                    console.log(err)
                    return
                }
                const listarExames = data



                const sqlConsulta = `SELECT nome, consulta.id, consulta.cliente, consulta.clientesobre,consulta.data, consulta.horario from medico inner join consulta on 
            medico.id = consulta.id_medico where consulta.consultacpf_cliente = '${cpf}'`

                conn.query(sqlConsulta, function (err, data) {
                    if (err) {
                        console.log(err)
                        return
                    }
                    const listarConsulta = data




                    const sql = `SELECT id FROM medico`

                    conn.query(sql, function (err, data) {
                        if (err) {
                            console.log(err)
                            return
                        }



                        const id_medico = data
                        function randomMedico(num) {
                            let sorteio = Math.floor(Math.random() * num.length)
                            return num[sorteio]
                        }
                        const medico = randomMedico(id_medico)
                        res.render('clienteInfo', { layout: false, cliente, listarExames, listarConsulta, medico, diag2 })
                    })
                })
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

    const sql = `UPDATE paciente SET nome = '${nome} ${sobrenome}', nascimento = '${nascimento}', email = '${email}', telefone = '${telefone}' WHERE cpf = '${cpf}'`

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


// BUSCA POR NOME DO MEDICAMENTO  -  JOSE
app.post('/buscarRemedio', (req, res) => {
    const remedio = req.body.remedio
    const sql = `SELECT * FROM medicamentos WHERE nome like '${remedio}%'`

    conn.query(sql, function (err, data) {
        if (err) {
            console.log(err)
            return
        }

        const remedios = data
        res.render('pesquisaRemedio', { layout: false, remedios })
    })
})
// BUSCA POR NOME DO MEDICAMENTO  -  JOSE


// PAGINA DO SQUAD   -   JOSE
app.get('/squad', (req, res) => {
    res.render('squad', { layout: false })
})
// PAGINA DO SQUAD   -   JOSE







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

    conn.query(sql, function (err, data) {
        if (err) {
            console.log(err)
            return
        }

        const listarMed = data[0]
        res.render('getmed(medicamentos)', { layout: false, listarMed })

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

// FIM DAS ROTAS DOS MEDICAMENTOS (RAFAEL)


//Marcar consulta (Manoel)
app.post('/marcarConsulta', (req, res) => {
    const cliente = req.body.cliente
    const clientesobre = req.body.clientesobre
    const email = req.body.email
    const data = req.body.data
    const horario = req.body.horario
    const cpf_cliente = req.body.cpf_cliente
    const sintomas = req.body.sintomas
    const id_medico = req.body.id_medico
    const sql = `INSERT INTO consulta (data, horario, cliente,clientesobre, email, sintomas, consultacpf_cliente,id_medico) VALUES ('${data}','${horario}','${cliente}','${clientesobre}','${email}','${sintomas}','${cpf_cliente}',${id_medico})`
    const sql1 = `SELECT id FROM medico`
    console.log(id_medico)
    conn.query(sql, function (err) {
        if (err) {
            console.log(err)
        }
        conn.query(sql1, function (err, data) {
            if (err) {
                console.log(err)
                return
            }



            console.log("Consulta marcada!")
            res.redirect(`/cliente/${cpf_cliente}`)
        })

    })
})
//inicio da parte dos exames (Maiara)

// inserir dados (marcar exame)
app.post('/marcar_exames/', (req, res) => {
    const id = req.body.id
    const exame = req.body.exame
    const medico = req.body.medico
    const cpf_medico = req.body.cpf_medico
    const paciente = req.body.paciente
    const cpf_cliente = req.body.cpf_cliente
    const data = req.body.data
    const horario = req.body.horario



    const sql = `INSERT INTO exames (id,exame,medico,cpf_medico,paciente,cpf_cliente,data,horario) VALUES ('${id}','${exame}','${medico}','${cpf_medico}','${paciente}','${cpf_cliente}','${data}', '${horario}')`


    conn.query(sql, function (err) {
        if (err) {
            console.log(err)
        }

        res.redirect(`/medicos/${cpf_medico}`)
        console.log("Exame marcado com sucesso!")
    })
})

//rota de busca (buscando) que envia para view exame.handlebars
app.post('/buscando/', (req, res) => {
    const id = req.body.id

    const sql = `SELECT * FROM exames WHERE id = ${id}`

    conn.query(sql, function (err, data) {
        if (err) {
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

    conn.query(sql, function (err, data) {
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

    conn.query(sql, function (err, data) {
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

    conn.query(sql, function (err, data) {
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
    const cpf_medico = req.body.cpf_medico
    const paciente = req.body.paciente
    const cpf_cliente = req.body.cpf_cliente
    const data = req.body.data
    const horario = req.body.horario



    const sql = `UPDATE exames SET exame = '${exame}', medico = '${medico}', cpf_medico ='${cpf_medico}', paciente = '${paciente}', cpf_cliente = '${cpf_cliente}', data = '${data}', horario = '${horario}' WHERE id = '${id}'`

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
        res.redirect('/exames')
    })
    console.log("Deletado com sucesso!")
})
//Fim da parte dos exames (Maiara)

app.get('/remove/:id', (req, res) => {
    const id = req.params.id
    const sql = `DELETE FROM consulta WHERE id = ${id}`
    conn.query(sql, function (err) {
        if (err) {
            console.log(err)
            return
        } res.redirect(req.get('referer'));
    })
})

app.get('/editarC/:id', (req, res) => {
    const id = req.params.id
    const sql = `SELECT * FROM consulta WHERE id = ${id}`

    conn.query(sql, function (err, data) {
        if (err) {
            console.log(err)
            return
        }
        const editarconsulta = data[0]
        res.render('editarConsulta', { layout: false, editarconsulta })
    })
})
app.post('/editarC', (req, res) => {
    const id = req.body.id
    const cliente = req.body.cliente
    const clientesobre = req.body.clientesobre
    const data = req.body.data
    const horario = req.body.horario



    const sql = `UPDATE consulta SET  cliente = '${cliente}', clientesobre ='${clientesobre}', data = '${data}', horario = '${horario}' WHERE id = '${id}'`

    conn.query(sql, function (err) {
        if (err) {
            console.log(err)
            return
        }

        res.redirect('back');
    })
})




// ROTA NAO EXISTENTE - JOSE
app.use(function (req, res, next) {
    res.status(404).render('error 404', { layout: false })
})
// ROTA NAO EXISTENTE - JOSE


// conexão bd
// const conn = mysql.createConnection({            ANTIGO BANCO DE DADOS LOCAL DESATIVADO
//     host: '127.0.0.1',
//     port: '3306',
//     user: 'root',
//     password: '',
//     database: 'clinica_resilia'
// })

// conn.connect(function (err) {                    ANTIGO BANCO DE DADOS LOCAL DESATIVADO
//     if (err) {
//         console.log(err);
//     }
//     console.log('Conectado com sucesso');
// })

const conn = mysql.createConnection(process.env.DATABASE_URL)              // NOVO BANCO DE DADOS ONLINE NO PlanetScale
console.log('Connected to PlanetScale!')              // NOVO BANCO DE DADOS ONLINE NO PlanetScale


app.listen(process.env.port || port, () => {
    console.log(`app rodando na porta ${port}`);
})
