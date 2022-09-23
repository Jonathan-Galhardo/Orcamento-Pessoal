class Despesa {
    constructor(ano, mes, dia, tipo, descricao, valor) {
        this.ano = ano
        this.mes = mes
        this.dia = dia
        this.tipo = tipo
        this.descricao = descricao
        this.valor = valor
    }
    validarDados() {
        for (let i in this) {
            //console.log(i, this)
            if (this[i] == undefined || this[i] == '' || this[i] == null) {
                return false
            }
        } return true

    }
}

class Bd {

    constructor() {
        let id = localStorage.getItem('id')

        if (id === null) {
            localStorage.setItem('id', 0)
        }
    }

    getProximoId() {
        let proximoId = localStorage.getItem('id')
        return parseInt(proximoId) + 1
    }

    salvar(d) {
        let id = this.getProximoId()

        localStorage.setItem(id, JSON.stringify(d))

        localStorage.setItem('id', id)
    }

    recuperarTodosRegistros() {
        //array de despesas
        let despesas = Array()

        let id = localStorage.getItem('id')

        //recuperar todas as despesas cadastradas em localStorage
        for (let i = 1; i <= id; i++) {

            //recuperar a despesa
            let despesa = JSON.parse(localStorage.getItem(i))
            //console.log(despesa)

            //existe a possibilidade de haver índices que foram pulados/removidos
            //nestes casos nós vamos pular esses índices
            if (despesa === null) {
                continue
            }

            despesa.id = i

            despesas.push(despesa)
        }

        return despesas
    }

    pesquisar(despesa) {
        //console.log(despesa)

        let despesasFiltradas = Array()

        despesasFiltradas = this.recuperarTodosRegistros()
        //console.log(despesasFiltradas)

        //aplicando os filtros de despesa
        if (despesa.ano != '') {
            despesasFiltradas = despesasFiltradas.filter(d => d.ano == despesa.ano)
        }

        if (despesa.mes != '') {
            despesasFiltradas = despesasFiltradas.filter(d => d.mes == despesa.mes)
        }

        if (despesa.dia != '') {
            despesasFiltradas = despesasFiltradas.filter(d => d.dia == despesa.dia)
        }

        if (despesa.tipo != '') {
            despesasFiltradas = despesasFiltradas.filter(d => d.tipo == despesa.tipo)
        }

        if (despesa.descricao != '') {
            despesasFiltradas = despesasFiltradas.filter(d => d.descricao == despesa.descricao)
        }

        if (despesa.valor != '') {
            despesasFiltradas = despesasFiltradas.filter(d => d.valor == despesa.valor)
        }

        console.log(despesasFiltradas)
        return despesasFiltradas


        ano.value = ''
        mes.value = ''
        dia.value = ''
        tipo.value = ''
        descricao.value = ''
        valor.value = ''
    }
    removerDespesas(id) {
        localStorage.removeItem(id)
    }
}

let bd = new Bd()

function cadastrarDespesa() {

    let ano = document.getElementById('ano')
    let mes = document.getElementById('mes')
    let dia = document.getElementById('dia')
    let tipo = document.getElementById('tipo')
    let descricao = document.getElementById('descricao')
    let valor = document.getElementById('valor')


    //console.log(ano.value, mes.value, dia.value, tipo.value, descricao.value, valor.value)

    let despesa = new Despesa(ano.value, mes.value, dia.value, tipo.value, descricao.value, valor.value)

    if (despesa.validarDados()) {
        bd.salvar(despesa)

        $('#registraDespesa').modal('show')
        document.getElementById('TituloModalCentralizado').innerHTML = 'Despesa cadastrada com sucesso!';
        document.getElementById('modalbody').innerHTML = 'Todos os campos preenchidos!'
        document.getElementById('button').innerHTML = 'OK'
        document.getElementById('classe-titulo').className = 'modal-header text-success'
        document.getElementById('button').className = 'btn btn-success'

        ano.value = ''
        mes.value = ''
        dia.value = ''
        tipo.value = ''
        descricao.value = ''
        valor.value = ''

    } else {
        $('#registraDespesa').modal('show')
        document.getElementById('TituloModalCentralizado').innerHTML = 'ERRO';
        document.getElementById('modalbody').innerHTML = 'Certifique-se de preencher todos os campos antes de incluir uma despesa!'
        document.getElementById('button').innerHTML = 'Voltar e Corrigir'
        document.getElementById('classe-titulo').className = 'modal-header text-danger'
        document.getElementById('button').className = 'btn btn-danger'
    }
}


function carregaListaDespesas() {
    let despesas = Array()

    despesas = bd.recuperarTodosRegistros()

    let listaDespesas = document.getElementById('listadespesas')

    //percorrer array despesas
    despesas.forEach(function (d) {
        //console.log(d)

        //inserir linhas
        let linha = listaDespesas.insertRow()

        //inserir valores / colunas 

        linha.insertCell(0).innerHTML = `${d.dia}/${d.mes}/${d.ano}`

        switch (d.tipo) {
            case '1': d.tipo = "Alimentação"
                break;
            case '2': d.tipo = "Educação"
                break;
            case '3': d.tipo = "Lazer"
                break;
            case '4': d.tipo = 'Saúde'
                break;
            case '5': d.tipo = 'Transporte'
                break;

            default:
                break;
        }
        linha.insertCell(1).innerHTML = `${d.tipo}`
        linha.insertCell(2).innerHTML = `${d.descricao}`
        linha.insertCell(3).innerHTML = `${d.valor}`

        let btn = document.createElement("button")
        btn.className = "btn btn-danger"
        btn.innerHTML = '<i class="fas fa-times"></i>'
        btn.id = `id_despesa${d.id}`
        btn.onclick = function () {
            //remover despesa
            let id = this.id.replace("id_despesa", "")
            bd.removerDespesas
            console.log(id)

        }
        linha.insertCell(4).append(btn)
        console.log(d)
    })
}

function pesquisarDespesa() {
    let ano = document.getElementById('ano').value
    let mes = document.getElementById('mes').value
    let dia = document.getElementById('dia').value
    let tipo = document.getElementById('tipo').value
    let descricao = document.getElementById('descricao').value
    let valor = document.getElementById('valor').value

    let despesa = new Despesa(ano, mes, dia, tipo, descricao, valor)
    //console.log(despesa)

    let despesas = bd.pesquisar(despesa)

    let listaDespesas = document.getElementById('listadespesas')
    listaDespesas.innerHTML = ''
    //percorrer array despesas
    despesas.forEach(function (d) {
        //console.log(d)

        //inserir linhas
        let linha = listaDespesas.insertRow()

        //inserir valores / colunas 

        linha.insertCell(0).innerHTML = `${d.dia}/${d.mes}/${d.ano}`

        switch (d.tipo) {
            case '1': d.tipo = "Alimentação"
                break;
            case '2': d.tipo = "Educação"
                break;
            case '3': d.tipo = "Lazer"
                break;
            case '4': d.tipo = 'Saúde'
                break;
            case '5': d.tipo = 'Transporte'
                break;

            default:
                break;
        }
        linha.insertCell(1).innerHTML = `${d.tipo}`
        linha.insertCell(2).innerHTML = `${d.descricao}`
        linha.insertCell(3).innerHTML = `${d.valor}`
    })

}



