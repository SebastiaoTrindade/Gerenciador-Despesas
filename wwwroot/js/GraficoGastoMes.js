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

