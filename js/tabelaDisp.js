'use strict;'
const SITE = 'http://localhost/json/log.json'

window.chartColors = {
    windows: 'rgb(0, 38, 255)',
    linux: 'rgb(255,165,0)',
    outros: 'rgb(255,255,0)',
    autenticados: 'rgb(100, 200, 25)',
    intrusos: 'rgb(255, 0, 0)'
};

const WINDOWS = "rgb(0, 38, 255)"
const LINUX = "rgb(255,165,0)"
const OUTROS = "rgb(255,255,0)"
const AUTENTICADOS = "rgb(100, 200, 25)"
const INTRUSOS = "rgb(255, 0, 0)"

get()


function get(){
    fetch(SITE)
        .then(function (res) { return res.json() })
        .then(function (logs) {
            load(logs)
        })
}

function load(logs){
    const tabelaDisp = document.querySelector('#tabelaInfo')
    const tabelaIntruso = document.querySelector('#tabelaIntruso')
    const cardDisp = document.querySelector('#dispCard')
    let intruso =`  <thead>
                        <tr class="bg-primary">
                            <th>Intrusos</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>`

    let infotabela =`<thead>
                            <tr class="bg-primary">
                                <th>Ip</th>
                                <th>Mac</th>
                                <th>Nome</th>
                                <th>Usuario</th>
                                <th>SO</th>
                                <th>Versão</th>
                            </tr>
                        </thead>
                        <tbody>`
    let qtdIntruso =0
    let qtdAutentico=0
    let linux=0
    let win=0
    let outros=0

    for (log of logs){
        if (log.set=='1'){
            infotabela += `
            <tr>
                <td>${log.ip}</td>
                <td>${log.mac}</td>
                <td>${log.nome}</td>
                <td>${log.usuario}</td>
                <td>${log.so}</td>
                <td>${log.version}</td>
            </tr>` 
            qtdAutentico++
            if(log.so=='Linux'){linux++}
            else { win++}
            
        } else{
            intruso += `<tr>
                            <td>IP</td>
                            <td>${log.ip}</td>
                        </tr>`
            qtdIntruso++
            outros++
        }
    }
    infotabela += `</tbody>`
    intruso += `</tbody>`
    tabelaDisp.innerHTML = infotabela
    tabelaIntruso.innerHTML = intruso

    varDisp=`<tbody>
                <tr>
                   <td>Dispositivos Autenticados</td>
                   <td><span class="badge badge-primary badge-pill " style="background-color:${AUTENTICADOS};">${qtdAutentico}</span></td>
                </tr>
                <tr>
                   <td>Dispositivos Intrusos</td>
                   <td><span class="badge badge-primary badge-pill" style="background-color:${INTRUSOS}; ">${qtdIntruso}</span></td>
                </tr>
                <tr>
                   <td>Windows Conectados</td>
                   <td><span class="badge badge-primary badge-pill" style="background-color:${WINDOWS};">${win}</span></td>
                </tr> 
                <tr>
                   <td>Linux Conectados</td>
                   <td><span class="badge badge-primary badge-pill" style="background-color:${LINUX};">${linux}</span></td>
                </tr> 
                <tr>
                   <td>Sistemas desconhecidos</td>
                   <td><span class="badge badge-primary badge-pill text-dark" style="background-color:${OUTROS};">${outros}</span></td>
                </tr>
                 <tr>
                   <td>Total Conectados</td>
                   <td><span class="badge badge-primary badge-pill">${qtdAutentico + qtdIntruso}</span></td>
                </tr> 
            </tbody>`
    cardDisp.innerHTML=varDisp


   
    var ctx = document.getElementById('dispositivosG').getContext('2d');
    var chart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ["Autenticados", "intrusos"],
            datasets: [{
                data: [qtdAutentico,qtdIntruso],
                backgroundColor: [window.chartColors.autenticados,
                                  window.chartColors.intrusos],
                borderColor: 'rgb(37,40,50)',
            }],
        },
        options: {
            cutoutPercentage: '80',
            legend: {
                display: false
            },
        }
    });

    var ctx = document.getElementById('sistemasO').getContext('2d');
    var chart = new Chart(ctx, {
        type: 'doughnut',
        borderColor:'rgb(170, 50, 255)',
        data: {
            labels: ["Linux", "windows", "outros"],
            datasets: [{
                data: [linux, win, outros],
                backgroundColor: [window.chartColors.linux,
                                  window.chartColors.windows,
                                  window.chartColors.outros],
                borderColor: 'rgb(37,40,50)',
                borderWidth:'2',
            }],
        },
        options: {
            cutoutPercentage: '80',
            legend: {
                display: false
            },
        }
    });
}
