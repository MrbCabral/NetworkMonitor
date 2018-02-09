const SITE = 'http://localhost/json/log.json'
const IMGPC = '/img/pc.jpg'
getDisp()


function getDisp() {
    fetch(SITE)
        .then(function (res) { return res.json() })
        .then(function (logs) {
            loadDisp(logs)
        })
}
// style="margin-top:10px; margin-bottom:10px;"
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
                        <div class="modal fade" id="${log.nome}" tabindex="-1" role="dialog" aria-labelledby="modal-${log.nome}" aria-hidden="true">
                        <div class="modal-dialog modal-dialog-centered" role="document">
                            <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="modal${log.nome}">${log.nome}</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                IP: ${log.ip}<br>
                                MAC: ${log.mac}<br>
                                NOME: ${log.nome}<br>
                                USUARIO: ${log.usuario}<br>
                                SO: ${log.so}<br>
                                VERSÃO: ${log.version}<br>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-primary" href="http://localhost/api/alertar/?host=${log.ip}">Alertar</button>
                                <button type="button" class="btn btn-primary" href="http://localhost/api/tela/?host=${log.ip}">Capturar Tela</button>
                                <button type="button" class="btn btn-primary" href="http://localhost/api/desligar/?host=${log.ip}">Desligar</button>
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
