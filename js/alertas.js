
function carregarIp(){
    fetch(LOG_JSON)
        .then(function (res) { return res.json() })
        .then(function (pcs) {
            const ips = document.querySelector('#divAlertar')
            let formName =`<div class="form-group">
            <label for="selectIp" style="margin-top: 20px;">Selecione qual Dispositivo deseja Alertar</label>
            <select class="form-control" id="ipAlertar">`
    
            for (pc of pcs) {
                if (pc.set == '1') {
                    formName += ` <option>PC:${pc.nome}</option>`
                }
            }
            formName += `</select>
            <button type="button" class="btn btn-primary" onclick="alertarIp()" style="margin-top:20px;">Alertar</button>
            </div>`
    
            ips.innerHTML = formName
        })
}


function alertarIp() {
    const ipDisp = document.querySelector('#ipAlertar').value
    fetch(LOG_JSON)
        .then(function (res) { return res.json() })
        .then(function (pcs) {
            var pcsplit = ipDisp.split(':')
            var pcIp = pcsplit[1]
            for (pc of pcs) {
                if ((pc.set=='1') && (pc.nome==pcIp)){
                    fetch(`${ALERT}${pc.ip}`)
                    let aviso = `<p class="titleAterar text - center">O Dispositivo ${pc.nome} foi Alertado</p>`
                    ok(aviso)
                break
                }
            }
        })
}


function alertarTodos(){
    fetch(LOG_JSON)
        .then(function (res) { return res.json() })
        .then(function (pcs) {
            for (pc of pcs){
                fetch(`${ALERT}${pc.ip}`)
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
