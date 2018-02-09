const SITE = 'http://localhost/json/log.json'
const IMAGENS = '/img/'

function carregarIp() {
    const names = document.querySelector('#printsImagens')
    fetch(SITE)
        .then(function (res) { return res.json() })
        .then(function (pcs) {
            let formName =`<div class="form-group">
            <label for="selectIp" style="margin-top: 20px;">Selecione qual Dispositivo deseja Capturar</label>
            <select class="form-control" id="ipCapturar">`
            
            for (pc of pcs){
                if (pc.set=='1'){
                    formName += ` <option>PC:${pc.nome}</option>` 
                }
            }
            formName += `</select>
            <button type="button" class="btn btn-primary" onclick="prints(1)" style="margin-top:20px;">CAPTURAR</button>
            </div>`
            
            names.innerHTML=formName
        })
}

function prints(controle){
    const painelImagem = document.querySelector("#printsImagens")
    let imgPrints=`` 
    if (controle==1){
        const ipDisp = document.querySelector('#ipCapturar').value
        fetch(SITE)
            .then(function (res) { return res.json() })
            .then(function (pcs) {
                var pcsplit = ipDisp.split(':')
                var pcIp = pcsplit[1]
                for (pc of pcs) {
                    if ((pc.set == '1') && (pc.nome == pcIp)) {
                        console.log(pcIp)
                        imgPrints += ` <h4>${pc.nome}</h4>
                                       <img src="${IMAGENS}${pc.ip}.png" class="img-fluid" alt="Responsive image">`
                        painelImagem.innerHTML=imgPrints
                        break
                    }
                }
            })
    } else if (controle==2){
        fetch(SITE)
        .then(function (res) { return res.json() })
        .then(function (pcs) {
            let i=0
            imgPrints +=`<div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
                            <div class="carousel-inner">`

            for (pc of pcs) {
                if ((pc.set=='1')&&(i==0)) {
                    imgPrints += `  
                    <div class="carousel-item active">
                        <h4>${pc.nome}</h4>
                        <img class="d-block w-100" src="${IMAGENS}${pc.ip}.png">
                    </div>`
                } else {
                    imgPrints += `  
                    <div class="carousel-item">
                        <h4>${pc.nome}</h4>
                        <img class="d-block w-100" src="${IMAGENS}${pc.ip}.png">
                    </div>`
                }
                i++
            } 
            imgPrints +=`</div>
                          <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                            <span class="carousel-control-prev-icon seta" aria-hidden="true"></span>
                            <span class="sr-only ">Previous</span>
                          </a>
                          <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                            <span class="carousel-control-next-icon seta" aria-hidden="true"></span>
                            <span class="sr-only">Next</span>
                          </a>
                        </div>`
            painelImagem.innerHTML = imgPrints
            console.log(10)     
        })
    }
}
