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
        console.log('blablabla')
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
    bd.recuperarTodosRegistros()
}
