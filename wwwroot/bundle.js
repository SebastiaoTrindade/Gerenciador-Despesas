/*Função para adicionar valor no gráfico*/
$(".escolhaMes").on('change', function () {
    var mesId = $(".escolhaMes").val();

    $.ajax({
        url: "Despesas/GastoMes",
        method: "POST",
        data: { mesId, mesId },
        success: function (dados) {
            $("canvas#GraficoGastosMes").remove();
            $("div.GraficoGastosMes").append('<canvas id="GraficoGastosMes" style="height: 400px; width: 400px;"></canvas>')

            var ctx = document.getElementById('GraficoGastosMes').getContext('2d');

            var grafico = new Chart(ctx, {
                type: 'doughnut',

                data: {
                    labels: PegarTiposDespesas(dados),
                    datasets: [{
                        label: "Gastos por Despesa",
                        backgroundColor: PegarCores(dados.length),
                        hoverBackgroundColor: PegarCores(dados.length),
                        data: PegarValores(dados)

                    }]

                },
                options: {
                    plugins: {
                        responsive: false,
                        title: {
                            display: true,
                            text: 'Gastos por Despesa'
                        }
                    }
                }
            });
        }
    });
});

/*Construção do gráfico*/
function CarregarDadosGastosMes() {

    $.ajax({
        url: "Despesas/GastoMes",
        method: "POST",
        data: { mesId: 1 },
        success: function (dados) {
            $("canvas#GraficoGastosMes").remove();
            $("div.GraficoGastosMes").append("<canvas id='GraficoGastosMes' style='height:400px;width:400px;'></canvas>")

            var ctx = document.getElementById('GraficoGastosMes').getContext('2d');
            debugger;
            var grafico = new Chart(ctx, {
                type: 'doughnut',

                data: {
                    labels: PegarTiposDespesas(dados),
                    datasets: [{
                        label: "Gastos por Despesa",
                        backgroundColor: PegarCores(dados.length),
                        hoverBackgroundColor: PegarCores(dados.length),
                        data: PegarValores(dados)

                    }]

                },
                options: {
                    plugins: {
                        responsive:false,
                        title: {
                            display: true,
                            text: 'Gastos por Despesa'
                        }
                    }
                }                
            });
        }
    });
}


/*Função Gastos Totais*/
function CarregarDadosGastosTotais() {
    $.ajax({
        url: 'Despesas/GastosTotais',
        method: 'POST',
        success: function (dados) {
            new Chart(document.getElementById("GraficoGastosTotais"), {
                type: 'line',

                data: {
                    labels: PegarMeses(dados),
                    datasets: [{
                        label: "Total Gasto",
                        data: PegarValores(dados),
                        backgroundColor: "#ecf0f1",
                        borderColor: "#2980b9",
                        fill: false,
                        spanGaps: false
                    }]
                },
                options: {
                    plugins: {
                        title: {
                            display: true,
                            text: "Total Gasto"
                        }
                    }
                }
            });
        }
    });
}
/*Função para adicionar valor no gráfico*/
$(".escolhaMes").on('change', function () {
    var mesId = $(".escolhaMes").val();

    $.ajax({
        url: "Despesas/GastosTotaisMes",
        method: "POST",
        data: { mesId, mesId },
        success: function (dados) {
            $("canvas#GraficoGastoTotalMes").remove();
            $("div.GraficoGastoTotalMes").append("<canvas id='GraficoGastoTotalMes'style='width: 400px; height: 400px;'></canvas>")

            var ctx = document.getElementById('GraficoGastoTotalMes').getContext('2d');

            var grafico = new Chart(ctx, {
                type: 'doughnut',

                data: {
                    labels: ['Restante', 'Total Gasto'],
                    datasets: [{
                        label: "Total Gasto",
                        backgroundColor: ["#27ae60", "#c0392b"],
                        data: [(dados.salario - dados.valorTotalGasto), dados.valorTotalGasto]

                    }]

                },
                options: {
                    plugins: {
                        responsive: false,
                        title: {
                            display: true,
                            text: 'Total Gasto no Mês'
                        }
                    }
                }                
            });
        }
    })
})

/*Construção do gráfico*/
function CarregarDadosGastosTotaisMes () {    

    $.ajax({
        url: "Despesas/GastosTotaisMes",
        method: "POST",
        data: { mesId: 1 },
        success: function (dados) {
            $("canvas#GraficoGastoTotalMes").remove();
            $("div.GraficoGastoTotalMes").append("<canvas id='GraficoGastoTotalMes' style='height:400px;width:400px;'></canvas>")

            var ctx = document.getElementById('GraficoGastoTotalMes').getContext('2d');
            debugger;
            var grafico = new Chart(ctx, {
                type: 'doughnut',

                data: {
                    labels: ['Restante', 'Total Gasto'],
                    datasets: [{
                        label: "Total Gasto",
                        backgroundColor: ["#27ae60", "#c0392b"],
                        data: [(dados.salario - dados.valorTotalGasto), dados.valorTotalGasto]

                    }]

                },
                options: {
                    plugins: {
                        responsive: false,
                        title: {
                            display: true,
                            text: 'Total Gasto no Mês'
                        }
                    }
                }
            });
        }
    })
}


/*Funções Gerais*/

/*Função Pegar Valores*/
function PegarValores(dados) {
    var valores = [];
    var tamanho = dados.length;
    var indice = 0;

    while (indice < tamanho) {
        valores.push(dados[indice].valores)
        indice++;
    }

    return valores;
}

/*Função Pegar Tipos de Despesas*/
function PegarTiposDespesas(dados) {    
    var labels = [];
    var tamanho = dados.length;
    var indice = 0;

    while (indice < tamanho) {
        labels.push(dados[indice].tiposDespesas)
        indice++;
    }

    return labels;
}

/*Função Pegar Cores*/
function PegarCores(quantidade) {
    var cores = [];

    while (quantidade > 0) {
        var r = Math.floor(Math.random() * 255);
        var g = Math.floor(Math.random() * 255);
        var b = Math.floor(Math.random() * 255);

        cores.push("rgb(" + r + ", " + g + ", " + b + ")");

        quantidade--;
    }

    return cores;
}

/*Função PegarMeses*/
function PegarMeses(dados) {
    var labels = [];
    var tamanho = dados.length;
    var indice = 0;

    while (indice < tamanho) {
        labels.push(dados[indice].nomeMeses[0]);
        indice++;
    }

    return labels;
}