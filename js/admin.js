
const SITE = 'http://localhost/json/admin.json'


function carregarUser() {
    const listaUsers = document.querySelector('#alterarUser')
    fetch(SITE)
        .then(function (res) { return res.json() })
        .then(function (users) {
            let names = `<div class="form-group">
                            <label for="selectIp" style="margin-top: 20px;">Administradores Cadastrados</label>
                            <select class="form-control" id="usersCadastrados">`

            for (user of users) {
                names += `<option>Login: ${user.login}, Matricula: ${user.matricula}</option>`
            }
            names +=`</select>
                    </div>`
            listaUsers.innerHTML = names
        })

}


function alterar(controle){
    const userAlterar = document.querySelector('#alterarUser')
    let exibir=``
    if (controle==1){
        // Formulario para editar administrador, este form ira chamar a função addEdit() passando o valor 0, que siginifica qu o usuario já existe 
        // e sera apenas editado
        exibir+=`
            <p class="titleAterar text-center">Editar Administrador</p>
            <form>
                 <div class="form-group">
                   <label>Login</label>
                   <input type="text" class="form-control" id="login"  placeholder="login">
                 </div>
                 <div class="form-group">
                   <label>Senha</label>
                   <input type="password" class="form-control" id="senha" placeholder="senha">
                 </div>
                 <button type="button" class="btn btn-primary" onclick="addEdit(0)">Validar</button>
             </form>
             <div id="painelValidar"></div>`
    }else if (controle==2){
        // Formulario para remover administrador, este form ira chamar a função remover() 
        exibir += `
            <p class="titleAterar text-center">Remover Administrador</p>
            <form>
                 <div class="form-group">
                   <label>Login  ou Matricula</label>
                   <input type="text" class="form-control" id="loginRemover" placeholder="login  ou Matricula">
                 </div>
                 <div class="form-group">
                   <label>Senha</label>
                   <input type="password" class="form-control" id="senhaRemover" placeholder="senha">
                 </div>
                 <button type="button" class="btn btn-primary" onclick="remover()">Remover</button>
             </form>
             <div id="painelValidar"></div>`
    } else {
        // formulario para alterar senha 
         exibir += `
            <p class="titleAterar text-center">Alterar Senha</p>
            <form>
                 <div class="form-group">
                   <label>Login  ou Matricula</label>
                   <input type="text" class="form-control" id="loginRemover" placeholder="login  ou Matricula">
                 </div>
                 <div class="form-group">
                   <label>Senha Atual</label>
                   <input type="password" class="form-control" id="senhaRemover" placeholder="senha Atual">
                 </div>
                 <button type="button" class="btn btn-primary" onclick="validar(0)">Remover</button>
             </form>
             <div id="painelValidar"></div>`
        


    }
    userAlterar.innerHTML = exibir
}


function addEdit(indicador){
        // Função para addEdit ou adicionar administradores, caso ela receba o valor "0" significa que o admin já esta cadastrado 
        // e que esta função foi chamada para editar um Admin, caso receba o valor "1" esta função foi chamada para adicionar um novo admin
    const val = document.querySelector('#alterarUser')
    fetch(SITE)
        .then(function (res) { return res.json() })
        .then(function (users) {
            let lix=``
            if (indicador==0){
                var passValidar = document.querySelector('#senha').value
                var userValidar = document.querySelector('#login').value
                for (user of users){
                    if ((passValidar == user.senha) && (userValidar == user.login)){
                        lix += `<form>
                        <div class="form-group">
                        <label>Novo Login</label>
                        <input type="text" class="form-control" id="nwlogin" placeholder="login">
                        </div>
                        <div class="form-group">
                        <label>Nova Matricula</label>
                        <input type="number" class="form-control" id="nwmatricula" placeholder="login">
                        </div>
                        <div class="form-group">
                        <label>Nova Senha</label>
                        <input type="password" class="form-control" id="nwsenha" placeholder="senha">
                        </div>
                        <button type="button" class="btn btn-primary" onclick="salvarEditar()">Salvar</button>
                        </form>`
                        
                        break
                    }else{
                        lix = `<div class="text-center" style="margin:50px;">
                        <img src="/img/negado.png" class="img-fluid" alt="Responsive image">
                        </div>`
                    }
                }
            }
            else if (indicador==1){
                lix += `
                        <p class="titleAterar text-center">Adicionar Administrador</p>
                        <form>
                            <div class="form-group">
                                <label>Novo Login</label>
                              <input type="text" class="form-control" id="nwlogin" aria-describedby="emailHelp" placeholder="login">
                            </div>
                            <div class="form-group">
                                <label>Nova Matricula</label>
                                <input type="number" class="form-control" id="nwmatricula" aria-describedby="emailHelp" placeholder="login">
                            </div>
                            <div class="form-group">
                                <label>Nova Senha</label>
                               <input type="password" class="form-control" id="nwsenha" placeholder="senha">
                            </div>
                            <button type="button" class="btn btn-primary" onclick="gravar()">Salvar</button>
                        </form>`

            }
            val.innerHTML = lix
        })
}


function remover(){
    var passRemover = document.querySelector('#senhaRemover').value
    var userRemover = document.querySelector('#loginRemover').value
    let cont=0
    fetch(SITE)
        .then(function (res) { return res.json() })
        .then(function (users) {
            for (user of users){
                if ( (passRemover == user.senha) && ( (userRemover==user.login)||(userRemover==user.matricula) ) ){
                    // aqui ira remover com php
                    cont++
                    ok()
                    break
                }
            }            
            if (cont==0){
                negar()
            }
        })

}


function gravar(){
    // aqui o php salvara o novo usuario
    ok()
}


function salvarEditar(){
    // aqui ficara o php para salvar a edição
    ok()
}


function validar(vControle){
    const val = document.querySelector('#alterarUser')
    let cont =0
    let newSenha=``
    console.log(vControle)
    if (vControle==0){
        var passRemover = document.querySelector('#senhaRemover').value
        var userRemover = document.querySelector('#loginRemover').value
        fetch(SITE)
            .then(function (res) { return res.json() })
            .then(function (users) {
                for (user of users) {
                    if ((passRemover == user.senha) && ((userRemover == user.login) || (userRemover == user.matricula))) {
                        cont++
                        newSenha +=` <form>
                                        <div class="form-group">
                                            <label>Nova Senha</label>
                                            <input type="password" class="form-control" id="nwsenha" placeholder="senha">
                                        </div>
                                        <button type="button" class="btn btn-primary" onclick="validar(1)">Salvar</button>
                                    </form>`
                                    // deve-se ter cuidado pois este button ira chamar esta mesma função so que passando outro valor como parametro
                        val.innerHTML = newSenha            
                        break
                    }
                }
                if (cont == 0) {
                    negar()
                }
            })
    }else{
        // aqui o php ira salvar a nova senha 
        ok()

    }

}


function ok(){
    //função que é chamada quando for necessario a exibição do icone ok
    const val = document.querySelector('#alterarUser')
    let lix = `<div class="text-center" style="margin:50px;">
                <img src="/img/ok.png" class="img-fluid" alt="Responsive image">
              </div>`
    val.innerHTML = lix
}


function negar() {
    //função que é chamada quando for necessario a exibição do icone negado
    const val = document.querySelector('#alterarUser')
    let lix = `<div class="text-center" style="margin:50px;">
                    <img src="/img/negado.png" class="img-fluid" alt="Responsive image">
                </div>`
    val.innerHTML = lix
}