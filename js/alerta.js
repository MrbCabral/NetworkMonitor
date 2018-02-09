const SITE = 'http://localhost/json/log.json'


function carregarIp(){
    fetch(SITE)
        .then(function (res) { return res.json() })
        .then(function (pcs) {
            const ips = document.querySelector('#divAlertar')
            let formName =`<div class="form-group">
            <label for="selectIp" style="margin-top: 20px;">Selecione qual Dispositivo deseja Alertar</label>
            <select class="form-control" id="ipAlertar">`
    
            for (pc of pcs) {
                if (pc.set == '1') {
                    formName += ` <option>PC:${pc.nome}</option>`
                    console.log(pc.ip)
                }
            }
            formName += `</select>
            <button type="button" class="btn btn-primary" onclick="alertarIp()" style="margin-top:20px;">Alertar</button>
            </div>`
    
            ips.innerHTML = formName
        })
}


function alertarIp(){
    const ipDisp = document.querySelector('#ipAlertar').value
    fetch(SITE)
        .then(function (res) { return res.json() })
        .then(function (pcs) {
            var pcsplit = ipDisp.split(':')
            var pcIp = pcsplit[1]
            for (pc of pcs) {
                if ((pc.set=='1') && (pc.nome==pcIp)){
                    console.log(pc.ip)
                    // aqui ficara o codigo para alertar o dispositivo por IP
                    let aviso = `<p class="titleAterar text - center">O Dispositivo ${pc.nome} foi Alertado</p>`
                    ok(aviso)
                    break
                }
            }
        })
}


function alertarTodos(){
    fetch(SITE)
        .then(function (res) { return res.json() })
        .then(function (pcs) {
            for (pc of pcs){
                // aqui ficara o codigo para alertar todos
            }
            let aviso =`<p class="titleAterar text - center">Todos os Dispositivos foram Alertados</p>`
            ok(aviso)
        })
}


function ok(aviso) {
    //função que é chamada quando for necessario a exibição do icone ok
    const val = document.querySelector('#divAlertar')
    let lix = ` ${aviso}
                <div class="text-center" style="margin:50px;">
                <img src="/img/ok.png" class="img-fluid" alt="Responsive image">
              </div>`
    val.innerHTML = lix
}
