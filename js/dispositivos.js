
getDisp()


function getDisp() {
    fetch(LOG_JSON)
        .then(function (res) { return res.json() })
        .then(function (logs) {
            loadDisp(logs)
        })
}


function loadDisp(logs) {
    const infoDisp = document.querySelector('#disp')
    let infotabela = ` `
    for (log of logs) {
        if (log.set=='1'){
            infotabela +=`
            <div class="col-3" id="pcs">
                <div class="card" style="width: 10rem;  border: 5px; border-radius: 20px;">
                    <div class="align-middle text-center">
                        <i class="fas fa-desktop fa-7x text-center text-dark m-3"></i>
                        <h4 class="text-center" style=" color: #252830; ">${log.nome}</h4>
                    </div>
                    <div class="text-dark m-2">
                        IP: ${log.ip}
                        <button type="button" class="btn btn-info bnt-sm float-right" data-toggle="modal" data-target="#${log.nome}">
                            <i class="fas fa-ellipsis-v"></i>
                        </button>

                        <!-- Modal -->
                        <div class="modal fade" id="${log.nome}" tabindex="-1" role="dialog" aria-labelledby="modal${log.nome}" aria-hidden="true">
                        <div class="modal-dialog modal-dialog-centered" role="document">
                            <div class="modal-content">
                            <div class="modal-header bg-primary text-center">
                                <h5 class="col font-weight-bold" id="modal${log.nome}">${log.nome}</h5>
                                <button type="button" class="close float-right" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                            
                            <table class="table table-striped">
                            <tbody>
                                <tr>
                                <th scope="row">IP</th>
                                <td>${log.ip}</td>
                                </tr>
                                <tr>
                                <th scope="row">MAC</th>
                                <td>${log.mac}</td>
                                </tr>
                                <tr>
                                <th scope="row">NOME</th>
                                <td>${log.nome}</td>
                                </tr>
                                <tr>
                                <th scope="row">USUARIO</th>
                                <td>${log.usuario}</td>
                                </tr>
                                <tr>
                                <th scope="row">Sist. Operacional</th>
                                <td>${log.so}</td>
                                </tr>
                                <tr>
                                <th scope="row">VERSÃO</th>
                                <td>${log.version}</td>
                                </tr>
                            </tbody>
                            </table>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-primary" onclick=alertar('${log.ip}')">Alertar</button>
                                <button type="button" class="btn btn-primary" onclick=tela('${log.ip}')">Capturar Tela</button>
                                <button type="button" class="btn btn-primary" onclick=desligar('${log.ip}')">Desligar</button>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
            </div>`
        }
    }
    infoDisp.innerHTML=infotabela
}


function alertar($ip) {
    fetch(`${ALERT}${ip}`)
    alert('O dispositivo ${pc.nome} foi alertado')
}


function desligar($ip) {
    fetch(`${SHUTDOWN}${ip}`)
    alert('Sinal de desligamento enviado para o dispositivo ${pc.nome}')
}


function tela($ip) {
    fetch(`${SCREEN}${ip}`)
    alert('Capturada a tela do dispositivo ${pc.nome}')
    // modal para mostrar a tela
}