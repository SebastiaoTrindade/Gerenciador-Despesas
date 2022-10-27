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

